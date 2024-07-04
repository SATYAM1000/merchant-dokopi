import React from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import DoKopiSignUp from "@/components/merchant/auth/DoKopiSignUp";

export default async function SignUpPage() {
  const session = await auth();
  if (session && session.user.storeId === null) {
    redirect("/getting-started");
  }
  if (session && session.user.storeId !== null) {
    redirect("/");
  }
  return <DoKopiSignUp />;
}
