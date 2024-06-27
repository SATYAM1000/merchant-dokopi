import { Button } from "@/components/ui/button";
import React from "react";
import PricingChart from "./PricingChart";

const StorePricing = () => {
  return (
    <section className="w-full  ">
      <div>
        <h3 className="text-[#1A181E] font-medium">Store Pricing</h3>
        <p className="text-[#808080] text-sm">
          Set the pricing for different items in your store.
        </p>
      </div>
      <div className="mt-6">
        <PricingChart />
      </div>

      <div className="mt-6 w-full flex items-center justify-end">
        <Button type="submit">Save</Button>
      </div>
    </section>
  );
};

export default StorePricing;
