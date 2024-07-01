import StoreDetails from "@/components/merchant/settings/StoreDetails";
import React from "react";

const googleMapApiKey = process.env.GOOGLE_MAP_API_KEY;

export default async function StoreDetailsPage() {
  return <StoreDetails googleMapApiKey={googleMapApiKey} />;
}
