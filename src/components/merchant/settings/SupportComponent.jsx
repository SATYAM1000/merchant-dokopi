import React from "react";
import SupportForm from "./SupportForm";

const SupportComponent = () => {
  return (
    <section className="w-full bg-white h-fit px-6 py-6  ">
      <div>
        <h3 className="text-[#1A181E] font-medium">Support center</h3>
        <p className="text-[#808080] text-sm">
          Fill out the form below for assistance. Our support team will respond
          promptly.
        </p>
      </div>
      <div className="w-full">
        <SupportForm />
      </div>
    </section>
  );
};

export default SupportComponent;
