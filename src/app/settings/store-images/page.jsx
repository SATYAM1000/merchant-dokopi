import StoreImageComponent from "@/components/merchant/settings/StoreImageComponent";
import React from "react";

export default async function () {
  const cloudFrontURL = process.env.CLOUDFRONT_URL;
  return (
    <>
      <StoreImageComponent cloudFrontURL={cloudFrontURL} />
    </>
  );
}
