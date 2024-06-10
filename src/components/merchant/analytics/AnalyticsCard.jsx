"use client";
import { CircleHelp } from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const AnalyticsCard = ({ item }) => {
  if (!item) {
    return null;
  }

  return (
    <div className="w-full bg-white h-24 border  rounded-lg p-4">
      <div className="flex items-center gap-2">
        <p className=" font-medium text-black">{item?.title}</p>
        <Tooltip>
          <TooltipTrigger asChild>
            <CircleHelp className={`h-3 w-3 cursor-pointer text-blue-600 `} />
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-xs">{item?.toolTipData}</p>
          </TooltipContent>
        </Tooltip>
      </div>
      <div className="flex items-center gap-1 justify-between text-2xl font-medium">
        <span>
          <p className="font-medium mt-2 text-black">{item?.value}</p>
        </span>

        <div
          className={` flex items-center gap-2 ${
            item?.change > 0 ? "text-green-500" : "text-red-500"
          }`}
        >
          <div className="flex items-center justify-center  rounded-md">
            {item?.change > 0 ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-trending-up"
              >
                <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                <polyline points="16 7 22 7 22 13" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-trending-down"
              >
                <polyline points="22 17 13.5 8.5 8.5 13.5 2 7" />
                <polyline points="16 17 22 17 22 11" />
              </svg>
            )}
          </div>
          <p
            className={`text-sm font-medium ${
              Number(item?.change) < 0 ? "text-red-500" : "text-green-500"
            }`}
          >
            {item?.change} % &nbsp;from last period
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsCard;
