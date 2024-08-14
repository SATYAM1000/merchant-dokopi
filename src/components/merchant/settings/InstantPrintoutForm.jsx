"use client";
import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EXPECTED_TIME_DURATION_LIST_FOR_INSTANR_ORDER } from "@/lib/constants";
import axios from "axios";
import { API_DOMAIN } from "@/lib/constants";
import { fetchAccessToken } from "@/actions/access-token";
import { useCurrentUser } from "@/hooks/use-current-user";
import { toast } from "sonner";

export default function InstantPrintoutForm({
  instantDeliveryConfiguration,
  setInstantDeliveryConfiguration,
}) {
  const currentUser = useCurrentUser();
  const [isSaving, setIsSaving] = useState(false);
  const [initialConfiguration, setInitialConfiguration] = useState(null);

  useEffect(() => {
    setInitialConfiguration(instantDeliveryConfiguration);
  }, [instantDeliveryConfiguration]);

  const handleSaveButtonClick = async () => {
    if (
      !instantDeliveryConfiguration.duration ||
      !instantDeliveryConfiguration.price
    ) {
      toast.error("Please fill in all fields before saving.");
      return;
    }

    const priceValue = parseFloat(instantDeliveryConfiguration.price);
    if (isNaN(priceValue) || priceValue < 0) {
      toast.error("Please enter a valid positive number for the price.");
      return;
    }

    setIsSaving(true);

    try {
      const response = await axios.put(
        `${API_DOMAIN}/api/v1/merchant/store/instant-delivery-configurations/${currentUser.storeId}`,
        {
          ...instantDeliveryConfiguration,
          price: priceValue,
        },
        {
          headers: {
            Authorization: `Bearer ${await fetchAccessToken()}`,
          },
        }
      );
      toast.success(
        response.data.message || "Configuration saved successfully."
      );
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "An error occurred while saving the configuration."
      );
    } finally {
      setIsSaving(false);
    }
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
            <Select
              onValueChange={(value) =>
                setInstantDeliveryConfiguration((prev) => ({
                  ...prev,
                  duration: value,
                }))
              }
              defaultValue={instantDeliveryConfiguration.duration}
            >
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
              htmlFor="price"
            >
              Extra Price (₹)
            </label>
            <input
              name="price"
              className="appearance-none block w-full text-gray-700 border border-[#D9D9D9] rounded py-2.5 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mb-3"
              type="number"
              step="0.01"
              autoComplete="off"
              value={instantDeliveryConfiguration.price || ""}
              onChange={(e) =>
                setInstantDeliveryConfiguration((prev) => ({
                  ...prev,
                  price: e.target.value,
                }))
              }
            />
          </div>
        </div>
        <Button
          onClick={handleSaveButtonClick}
          size="sm"
          disabled={
            isSaving ||
            !instantDeliveryConfiguration.price ||
            !instantDeliveryConfiguration.duration
          }
        >
          {isSaving ? "Saving..." : "Save"}
        </Button>
      </div>
    </section>
  );
}
