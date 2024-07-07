
import React from "react";
import PricingChart from "./PricingChart";


const StorePricing = () => {
  return (
    <section className="w-full bg-white h-fit px-6 py-6  ">
      <div>
        <h3 className="text-[#1A181E] font-medium">Store Pricing</h3>
        <p className="text-[#808080] text-sm">
          Set the pricing for different items in your store.
        </p>
      </div>
      <div className="mt-8">
        <PricingChart />
      </div>
    </section>
  );
};
export default StorePricing;
