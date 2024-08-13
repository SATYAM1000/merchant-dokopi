import React from "react";
import { Button } from "@/components/ui/button";

export default function HomeDeliveryFormm() {
  return (
    <section className="mt-6 pb-4 text-[15px] w-full border-b border-gray-200">
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-12">
          <div className="w-full mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="accountHolderName"
            >
              Estimated Duration
            </label>
            <input
              name="accountHolderName"
              className="appearance-none block w-full text-gray-700 border border-[#D9D9D9] rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mb-3"
              type="text"
              autoComplete="off"
            />
          </div>
          <div className="w-full mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="accountHolderName"
            >
              Delivery Charge per KM (₹)
            </label>
            <input
              name="accountHolderName"
              className="appearance-none block w-full text-gray-700 border border-[#D9D9D9] rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mb-3"
              type="text"
              autoComplete="off"
            />
          </div>
        </div>
        <Button size="sm">Save</Button>
      </div>
    </section>
  );
}
