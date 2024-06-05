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
        if (existingUser?.role !== "MERCHANT") return false;
        if (existingUser) {
          user.id = existingUser._id;
          user.role = existingUser.role;

          return true;
        }

        return false;
      }

      return false;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture || token.image;
        session.user.role = token.role;
        session.user.storeId = token.storeId;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      if (mongoose.isValidObjectId(token.sub)) {
        await connectToDB();
        const user = await User.findOne({
          _id: token.sub,
        });
        const storeInfo = await XeroxStore.findOne({
          storeOwner: token.sub,
        });
        if (!user) return token;
        token.role = user.role;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
        token.storeId = storeInfo._id;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  ...authConfig,
});
