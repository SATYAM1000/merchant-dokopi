import NextAuth from "next-auth";
import { connectToDB } from "./lib/db.connect.js";
import { User } from "./lib/user.model.js";
import { XeroxStore } from "./lib/store.model.js";
import mongoose from "mongoose";
import authConfig from "./auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/auth/sign-in",
    error: "/auth/error",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (!user) return false;
      await connectToDB();

      if (account?.provider === "google") {
        const existingUser = await User.findOne({ email: user.email });
        if (existingUser?.isBlocked) return false;

        if (existingUser) {
          user.id = existingUser._id;
          user.role = existingUser.role;
          return true;
        }

        const newUser = new User({
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role,
        });
        await newUser.save();
        user.id = newUser._id;
        user.role = newUser.role;
        return true;
      }

      return false;
    },

    async session({ token, session }) {
      if (session.user) {
        await connectToDB();
        const storeInfo = await XeroxStore.findOne({
          storeOwner: token.sub,
        }).select("_id isStoreSetupComplete storeSetUpProgress");

        session.user.id = token.sub;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture || token.image;
        session.user.role = token.role;
        session.user.storeId = storeInfo ? storeInfo._id : null;
        session.user.isStoreSetUpCompleted =
          storeInfo?.isStoreSetupComplete || false;
        if (!storeInfo?.isStoreSetupComplete) {
          const progress = storeInfo?.storeSetUpProgress || {};
          if (!progress.step1) session.user.inCompleteStep = "0";
          else if (!progress.step2) session.user.inCompleteStep = "1";
          else if (!progress.step3) session.user.inCompleteStep = "2";
          else if (!progress.step4) session.user.inCompleteStep = "3";
          else session.inCompleteStep = null;
        } else {
          session.inCompleteStep = null;
        }
      }

      return session;
    },

    async jwt({ token }) {
      if (!token.sub || !mongoose.isValidObjectId(token.sub)) return token;

      await connectToDB();
      const user = await User.findById(token.sub);
      if (!user) return token;

      Object.assign(token, {
        role: user.role,
        name: user.name,
        email: user.email,
        image: user.image,
      });

      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  ...authConfig,
});
