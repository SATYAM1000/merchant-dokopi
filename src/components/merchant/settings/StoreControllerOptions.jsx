"use client";
import { Switch } from "@/components/ui/switch";
import React from "react";
import InstantPrintoutForm from "./InstantPrintoutForm";
import HomeDeliveryForm from "./HomeDeliveryForm";

export default function StoreControllerOptions() {
  const [isInstantDeliveryEnabled, setIsInstantDeliveryEnabled] =
    React.useState(false);
  const [isHomeDeliveryEnabled, setIsHomeDeliveryEnabled] =
    React.useState(false);

  return (
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
            checked={isInstantDeliveryEnabled}
            onCheckedChange={(checked) => setIsInstantDeliveryEnabled(checked)}
          />
        </div>
        {isInstantDeliveryEnabled && (
          <InstantPrintoutForm
            isInstantDeliveryEnabled={isInstantDeliveryEnabled}
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
            checked={isHomeDeliveryEnabled}
            onCheckedChange={(checked) => setIsHomeDeliveryEnabled(checked)}
          />
        </div>
        {isHomeDeliveryEnabled && <HomeDeliveryForm />}
      </div>
    </div>
  );
}
