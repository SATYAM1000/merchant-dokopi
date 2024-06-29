import ConditionsList from "@/components/merchant/settings/ConditionsList";
import StorePricing from "@/components/merchant/settings/StorePricing";
import React from "react";

const PricingPage = () => {
  return (
    <div className="flex flex-col gap-8">
      <StorePricing />
      <ConditionsList />
    </div>
  );
};

export default PricingPage;
