"use client";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import AddConditionModal from "./AddConditionModal";

const PricingChart = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pricing, setPricing] = useState({});

  return (
    <section className="w-full h-fit">
      <div className="w-full flex items-center gap-8">
        <div className="">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="paper-size"
          >
            Paper Size
          </label>

          <Select>
            <SelectTrigger className="w-[200px] font-medium text-[13px] appearance-none bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500  ">
              <SelectValue placeholder="Select paper size" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="A4">A4</SelectItem>
                <SelectItem value="A3">A3</SelectItem>
                <SelectItem value="A2">A2</SelectItem>
                <SelectItem value="A1">A1</SelectItem>
                <SelectItem value="A0">A0</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="print-type"
          >
            Print type
          </label>

          <Select>
            <SelectTrigger className="w-[200px] font-medium text-[13px] appearance-none bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500  ">
              <SelectValue placeholder="Select print type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="black_and_white">
                  Black and white print
                </SelectItem>
                <SelectItem value="simple_color">Simple color print</SelectItem>
                <SelectItem value="digital_color">
                  Digital color print
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="print-sides"
          >
            Print sides
          </label>

          <Select>
            <SelectTrigger className="w-[200px] font-medium text-[13px] appearance-none bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500  ">
              <SelectValue placeholder="Select print sides" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="single_sided">Single sided</SelectItem>
                <SelectItem value="double_sided">Double sided</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="base-price"
          >
            Base Price
          </label>

          <div className="flex items-center gap-12">
            <input
              type="number"
              id="base-price"
              placeholder="0"
              min="0"
              className="mt-1 appearance-none w-[200px] font-medium text-[13px] bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />

            <Button onClick={() => setIsModalOpen(true)}>Add Conditions</Button>
          </div>
        </div>
      </div>
      <AddConditionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};

export default PricingChart;
