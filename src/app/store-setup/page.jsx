import StoreSetUpComponent from "@/components/merchant/orders/StoreSetUpComponent";
import React from "react";
import { auth } from "@/auth";


export default async function StoreSetup() {
  const session = await auth();

  return (
    <StoreSetUpComponent storeSetUpActiveStep={session.user?.inCompleteStep} />
  );
}
