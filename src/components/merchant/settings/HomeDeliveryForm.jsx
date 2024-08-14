"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EXPECTED_TIME_DURATION_LIST_FOR_HOME_DELIVERY } from "@/lib/constants";
import { toast } from "sonner";
import axios from "axios";
import { API_DOMAIN } from "@/lib/constants";
import { fetchAccessToken } from "@/actions/access-token";
import { useCurrentUser } from "@/hooks/use-current-user";

export default function HomeDeliveryForm({
  homeDeliveryConfigurations,
  setHomeDeliveryConfigurations,
}) {
  const currentUser = useCurrentUser();
  const [isSaving, setIsSaving] = useState(false);
  const [isModified, setIsModified] = useState(false);
  const [initialConfig, setInitialConfig] = useState(null);

  useEffect(() => {
    setInitialConfig(homeDeliveryConfigurations);
  }, [homeDeliveryConfigurations]);

  useEffect(() => {
    if (initialConfig) {
      const hasChanges =
        JSON.stringify(homeDeliveryConfigurations) !==
        JSON.stringify(initialConfig);
      setIsModified(hasChanges);
    }
  }, [homeDeliveryConfigurations, initialConfig]);

  const handleSaveButtonClick = async () => {
    const deliveryChargeValue = parseFloat(
      homeDeliveryConfigurations.price
    );

    if (
      !homeDeliveryConfigurations.duration ||
      !homeDeliveryConfigurations.price
    ) {
      toast.error("Please fill in all fields before saving.");
      return;
    }

    if (isNaN(deliveryChargeValue) || deliveryChargeValue < 0) {
      toast.error(
        "Please enter a valid positive number for the delivery charge."
      );
      return;
    }

    setIsSaving(true);

    try {
      const data = await axios.put(
        `${API_DOMAIN}/api/v1/merchant/store/home-delivery-configurations/${currentUser.storeId}`,
        {
          ...homeDeliveryConfigurations,
          price: deliveryChargeValue,
        },
        {
          headers: {
            Authorization: `Bearer ${await fetchAccessToken()}`,
          },
        }
      );
      toast.success("Configuration saved successfully.");
      console.log("Configuration saved successfully:", data);
    } catch (error) {
      toast.error("An error occurred while saving the configuration.");
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
                setHomeDeliveryConfigurations((prev) => ({
                  ...prev,
                  duration: value,
                }))
              }
              value={homeDeliveryConfigurations.duration}
            >
              <SelectTrigger className="appearance-none text-gray-700 border border-[#D9D9D9] rounded py-3.5 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mb-3 w-[180px]">
                <SelectValue placeholder="Select Duration" />
              </SelectTrigger>
              <SelectContent>
                {EXPECTED_TIME_DURATION_LIST_FOR_HOME_DELIVERY.map((item) => (
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
              htmlFor="deliveryChargePerKM"
            >
              Delivery Charge per KM (₹)
            </label>
            <input
              name="price"
              className="appearance-none block w-full text-gray-700 border border-[#D9D9D9] rounded py-2.5 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mb-3"
              type="number"
              step="0.01"
              autoComplete="off"
              value={homeDeliveryConfigurations.price || ""}
              onChange={(e) =>
                setHomeDeliveryConfigurations((prev) => ({
                  ...prev,
                  price: e.target.value,
                }))
              }
            />
          </div>
        </div>
        <Button onClick={handleSaveButtonClick} size="sm" disabled={isSaving}>
          {isSaving ? "Saving..." : "Save"}
        </Button>
      </div>
    </section>
  );
}
