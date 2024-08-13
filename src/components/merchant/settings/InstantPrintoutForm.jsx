"use client";
import { Button } from "@/components/ui/button";
import React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EXPECTED_TIME_DURATION_LIST_FOR_INSTANR_ORDER } from "@/lib/constants";
import { duration } from "moment";

export default function InstantPrintoutForm({ isInstantDeliveryEnabled }) {
  if (!isInstantDeliveryEnabled) {
    return null;
  }

  const instantDeliveryConfiguration = {
    isEnabled: isInstantDeliveryEnabled,
    duration: null,
    price: null,
  };

  return (
    <section className="mt-6 pb-4 text-[15px] w-full border-b border-gray-200">
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-12">
          <div className="w-full mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="duration"
            >
              Estimated Duration
            </label>
            <Select>
              <SelectTrigger className="appearance-none text-gray-700 border border-[#D9D9D9] rounded py-3.5 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mb-3 w-[180px]">
                <SelectValue placeholder="Select Duration" />
              </SelectTrigger>
              <SelectContent>
                {EXPECTED_TIME_DURATION_LIST_FOR_INSTANR_ORDER.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="w-full mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="accountHolderName"
            >
              Extra Price (₹)
            </label>
            <input
              name="price"
              className="appearance-none block w-full text-gray-700 border border-[#D9D9D9] rounded py-2.5 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mb-3"
              type="text"
              autoComplete="off"
              value={instantDeliveryConfiguration.price}
              onChange={(e) => {
                instantDeliveryConfiguration.price = e.target.value;
              }}
            />
          </div>
        </div>
        <Button size="sm">Save</Button>
      </div>
    </section>
  );
}
