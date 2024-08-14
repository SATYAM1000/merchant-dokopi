"use client";
import { Switch } from "@/components/ui/switch";
import React, { useState, useEffect } from "react";
import InstantPrintoutForm from "./InstantPrintoutForm";
import HomeDeliveryForm from "./HomeDeliveryForm";
import axios from "axios";
import { API_DOMAIN } from "@/lib/constants";
import { fetchAccessToken } from "@/actions/access-token";
import { useCurrentUser } from "@/hooks/use-current-user";
import { ClipLoader } from "react-spinners";

export default function StoreControllerOptions() {
  const currentUser = useCurrentUser();
  const [loading, setLoading] = useState(true);
  const [instantDeliveryConfiguration, setInstantDeliveryConfiguration] =
    useState({
      isEnabled: false,
      duration: null,
      price: null,
    });

  const [homeDeliveryConfigurations, setHomeDeliveryConfigurations] = useState({
    isEnabled: false,
    duration: null,
    price: null,
  });

  const fetchInstantDeliveryStatus = async () => {
    try {
      const { data } = await axios.get(
        `${API_DOMAIN}/api/v1/merchant/store/instant-delivery-status/${currentUser.storeId}`,
        {
          headers: {
            Authorization: `Bearer ${await fetchAccessToken()}`,
          },
        }
      );

      setInstantDeliveryConfiguration(data.instantDeliveryConfigurations);
      setHomeDeliveryConfigurations(data.homeDeliveryConfigurations);
    } catch (error) {
      console.error("Error fetching instant delivery status:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInstantDeliveryStatus();
  }, []);

  return (
    <>
      {loading ? (
        <div className="w-full h-[50vh] flex items-center justify-center">
          <ClipLoader color="black" size={30} />
        </div>
      ) : (
        <div className="w-full h-auto mt-6 flex flex-col gap-4">
          <div className="w-full flex flex-col transition-all duration-300">
            <div className="w-full flex items-center justify-between">
              <div className="flex flex-col">
                <p className="text-[15px]">Enable Instant Printout</p>
                <p className="text-[13px] text-[#6B7280]">
                  {" "}
                  Enable this to allow customers to print their order instantly
                </p>
              </div>
              <Switch
                checked={instantDeliveryConfiguration.isEnabled}
                onCheckedChange={(checked) => {
                  setInstantDeliveryConfiguration((prev) => {
                    return { ...prev, isEnabled: checked };
                  });
                }}
              />
            </div>
            {instantDeliveryConfiguration.isEnabled && (
              <InstantPrintoutForm
                instantDeliveryConfiguration={instantDeliveryConfiguration}
                setInstantDeliveryConfiguration={
                  setInstantDeliveryConfiguration
                }
              />
            )}
          </div>

          <div className="w-full flex flex-col transition-all duration-300">
            <div className="w-full flex items-center justify-between">
              <div className="flex flex-col">
                <p className="text-[15px]">Enable Home Delivery</p>
                <p className="text-[13px] text-[#6B7280]">
                  {" "}
                  Enable this to allow customers to order from your store
                </p>
              </div>
              <Switch
                checked={homeDeliveryConfigurations.isEnabled}
                onCheckedChange={(checked) => {
                  setHomeDeliveryConfigurations((prev) => {
                    return { ...prev, isEnabled: checked };
                  });
                }}
              />
            </div>
            {homeDeliveryConfigurations.isEnabled && (
              <HomeDeliveryForm
                homeDeliveryConfigurations={homeDeliveryConfigurations}
                setHomeDeliveryConfigurations={setHomeDeliveryConfigurations}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}
