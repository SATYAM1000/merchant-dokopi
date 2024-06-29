"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPricing, addPricingEntry } from "@/redux/store/pricingSlice";
import axios from "axios";
import AddConditionModal from "./AddConditionaModal";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PricingChart = ({ storeId }) => {
  const dispatch = useDispatch();
  const { pricing } = useSelector((state) => state.pricing);

  const [serviceType, setServiceType] = useState("");
  const [paperSize, setPaperSize] = useState("");
  const [basePrice, setBasePrice] = useState("");
  const [conditions, setConditions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchPricing(storeId));
  }, [dispatch, storeId]);

  const handleAddCondition = (condition) => {
    setConditions([...conditions, condition]);
  };

  const handleSavePricing = async () => {
    const newPricingEntry = {
      serviceType,
      paperSize,
      basePrice,
      conditions,
    };

    try {
      // await axios.post("/api/pricing", {
      //   storeId,
      //   ...newPricingEntry,
      // });
      dispatch(addPricingEntry(newPricingEntry));
      resetForm();
    } catch (error) {
      console.error("Error saving pricing", error);
    }
  };

  const resetForm = () => {
    setServiceType("");
    setPaperSize("");
    setBasePrice("");
    setConditions([]);
  };

  return (
    <div className="">
      <div className="mb-4 flex items-center gap-12 pb-6">
        <div className="mb-4">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="service-type"
          >
            Service Type
          </label>
          <Select
            onValueChange={(value) => setServiceType(value)}
            defaultValue={serviceType}
          >
            <SelectTrigger className="w-[200px] font-medium text-[13px] appearance-none bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
              <SelectValue placeholder="Select service type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="bw_copy">B/W Copy</SelectItem>
                <SelectItem value="simple_color_copy">
                  Simple Color Copy
                </SelectItem>
                <SelectItem value="digital_color_copy">
                  Digital Color Copy
                </SelectItem>
                <SelectItem value="glossy_paper">Glossy Paper</SelectItem>
                <SelectItem value="scan">Scan</SelectItem>
                <SelectItem value="cartridge_paper">Cartridge Paper</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="mb-4">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="paper-size"
          >
            Paper Size
          </label>

          <Select
            onValueChange={(value) => setPaperSize(value)}
            defaultValue={paperSize}
          >
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
        <div className="mb-4">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="base-price"
          >
            Base Price
          </label>
          <div className="flex">
            <input
              type="number"
              value={basePrice}
              min="0"
              onChange={(e) => setBasePrice(e.target.value)}
              className="mt-1 appearance-none w-[200px] font-medium text-[13px] bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
            <div className="mt-1">
              <Button onClick={() => setIsModalOpen(true)} className="ml-12">
                Add Condition
              </Button>
            </div>
          </div>
        </div>
      </div>
      <AddConditionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddCondition}
      />
      <div className="flex justify-end">
        <Button onClick={handleSavePricing} className="py-2 px-4 rounded">
          Save Pricing
        </Button>
      </div>
    </div>
  );
};

export default PricingChart;
