import { Button } from "@/components/ui/button";
import React from "react";
import StoreBankDetailsForm from "./StoreBankDetailsForm";

const StoreBankDetails = () => {
  return (
    <section className="w-full  ">
      <div>
        <h3 className="text-[#1A181E] font-medium">Bank details</h3>
        <p className="text-[#808080] text-sm">
          Add your bank details so that we can process payments.
        </p>
      </div>
      <div className="w-full">
        <StoreBankDetailsForm />
      </div>
    </section>
  );
};

export default StoreBankDetails;
