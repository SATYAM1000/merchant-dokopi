import React from "react";
import StoreDetailsForm from "./StoreDetailsForm";

const StoreDetails = ({ googleMapApiKey }) => {
  return (
    <section className="w-full bg-white h-fit px-6 py-6  ">
      <div>
        <h3 className="text-[#1A181E] font-medium">Store Details</h3>
        <p className="text-[#808080] text-sm">
          Update and customize your store’s information.
        </p>
      </div>
      <div className="w-full">
        <StoreDetailsForm googleMapApiKey={googleMapApiKey} />
      </div>
    </section>
  );
};

export default StoreDetails;
