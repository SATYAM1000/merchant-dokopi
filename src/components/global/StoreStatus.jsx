"use client"
import React from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
const StoreStatus = () => {
    
    const [active, setActive] = React.useState(false);
    const handleStoreStatus = () => {
        setActive(!active);
    }
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="flex items-center space-x-2">
          <Switch
            id="active"
            checked={active}
            onCheckedChange={handleStoreStatus}
          />

          <Label htmlFor="airplane-mode">
            {
                active ? "Open" : "Close"
            }
          </Label>
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>Mark your store as active</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default StoreStatus;
