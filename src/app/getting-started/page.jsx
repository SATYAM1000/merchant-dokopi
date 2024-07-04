import GettingStartedComponent from "@/components/merchant/getting-started/GettingStartedComponent";
import React from "react";

import { auth } from "@/auth";
import { redirect } from "next/navigation";
export default async function GettingStartedPage() {
  const session = await auth();
  if (!session) {
    redirect("/auth/sign-in");
  }
  if (session && session.user?.storeId !== null) {
    redirect("/");
  }
  return (
    <>
      <GettingStartedComponent />
    </>
  );
}
