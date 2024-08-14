
import React from "react";
import StoreControllerOptions from "./StoreControllerOptions";

export default function StoreControlsComponent() {
  return (
    <section className="w-full bg-white h-fit px-6 py-6  ">
      <div>
        <h3 className="text-[#1A181E] font-medium">Store Controls</h3>
        <p className="text-[#808080] text-sm">
          Manage your store settings and settings.
        </p>
      </div>
      <StoreControllerOptions />
    </section>
  );
}
