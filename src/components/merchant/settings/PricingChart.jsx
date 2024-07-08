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
import { toast } from "sonner";
import { fetchAccessToken } from "@/actions/access-token";
import { useCurrentUser } from "@/hooks/use-current-user";
import { API_DOMAIN } from "@/lib/constants";
import axios from "axios";

const PricingChart = ({
  priceList,
  setpriceList,
  isStorePricingListExist,
  setIsStorePricingListExist,
}) => {
  const currentUser = useCurrentUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paperSize, setPaperSize] = useState("");
  const [printType, setPrintType] = useState("");
  const [printSides, setPrintSides] = useState("");
  const [basePrice, setBasePrice] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!paperSize) newErrors.paperSize = "Paper size is required.";
    if (!printType) newErrors.printType = "Print type is required.";
    if (!printSides) newErrors.printSides = "Print sides are required.";
    if (!basePrice) newErrors.basePrice = "Base price is required.";
    else if (isNaN(basePrice) || basePrice < 0)
      newErrors.basePrice = "Base price must be a non-negative number.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSave = async ({
    conditionType,
    conditionOperator,
    conditionValue,
    conditionPrice,
  }) => {
    if (!validateForm()) {
      return;
    }

    try {
      const token = await fetchAccessToken();
      const formData = {
        printType,
        paperSize,
        printingSides: printSides,
        basePrice: Number(basePrice),
        newPricingRule: {
          conditionName: conditionType,
          comparisonOperator: conditionOperator,
          conditionValue: Number(conditionValue),
          conditionPrice: Number(conditionPrice),
        },
      };

      const response = await axios.post(
        `${API_DOMAIN}/api/v1/store/pricing/set/${currentUser.storeId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success(response.data.msg);
        setIsModalOpen(false);
        setpriceList([...priceList, response.data.data]);
        setIsStorePricingListExist(true);
      } else {
        toast.error(response.data.msg);
      }
    } catch (error) {
      console.log("Error in saving condition", error);
      toast.error(error.response?.data?.msg || "Something went wrong");
    }
  };

  return (
    <section className="w-full h-fit">
      <div className="w-full grid grid-cols-2 lg:grid-cols-5 gap-6">
        <div className="">
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
            <SelectTrigger className="font-medium text-[13px] appearance-none text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
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
          {errors.paperSize && (
            <p className="text-red-500 text-xs italic">{errors.paperSize}</p>
          )}
        </div>

        <div>
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="print-type"
          >
            Print type
          </label>
          <Select
            onValueChange={(value) => setPrintType(value)}
            defaultValue={printType}
          >
            <SelectTrigger className="font-medium text-[13px] appearance-none text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
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
          {errors.printType && (
            <p className="text-red-500 text-xs italic">{errors.printType}</p>
          )}
        </div>

        <div>
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="print-sides"
          >
            Print sides
          </label>
          <Select
            onValueChange={(value) => setPrintSides(value)}
            defaultValue={printSides}
          >
            <SelectTrigger className="font-medium text-[13px] appearance-none text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
              <SelectValue placeholder="Select print sides" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="single_sided">Single sided</SelectItem>
                <SelectItem value="double_sided">Double sided</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {errors.printSides && (
            <p className="text-red-500 text-xs italic">{errors.printSides}</p>
          )}
        </div>

        <div className="">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1"
            htmlFor="base-price"
          >
            Base Price
          </label>
          <input
            type="number"
            id="base-price"
            value={basePrice}
            onChange={(e) => setBasePrice(e.target.value)}
            placeholder="0"
            min="0"
            className="mt-1 md:w-[150px] lg:w-full appearance-none font-medium text-[13px] text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          />
          {errors.basePrice && (
            <p className="text-red-500 text-xs italic">{errors.basePrice}</p>
          )}
        </div>
        <div className="flex items-center justify-end mt-6">
          <Button onClick={() => setIsModalOpen(true)}>Add Conditions</Button>
        </div>
      </div>

      <AddConditionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={onSave}
      />
    </section>
  );
};

export default PricingChart;
