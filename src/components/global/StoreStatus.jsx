"use client";
import React from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const StoreStatus = () => {
  const [active, setActive] = React.useState(false);
  const handleStoreStatus = () => {
    setActive(!active);
  };
  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="store-status"
        checked={active}
        onCheckedChange={handleStoreStatus}
        className="bg-blue-600"
      />

      <Label htmlFor="store-status">{active ? "Open" : "Close"}</Label>
    </div>
  );
};

export default StoreStatus;
