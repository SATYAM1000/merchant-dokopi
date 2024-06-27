"use client";
import { CircleHelp, IndianRupee } from "lucide-react";
import React from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const AnalyticsCard = ({ item }) => {
  if (!item) {
    return null;
  }

  return (
    <div className={`w-full h-24 border rounded-lg p-4 ${item?.change > 0 ? "bg-white" : "bg-white"}`}>
      <div className="flex items-center justify-items-start gap-4">
        <div className={`w-9 h-9 p-1  text-white rounded-md flex items-center justify-center ${item?.change > 0 ? "bg-indigo-500" : "bg-indigo-500"}`}>
          {item?.icon}
        </div>
        <div>
          <div className="flex items-center gap-2 ">
            <p className=" font-medium text-black text-[15px] ">
              {item?.title}
            </p>
            <Tooltip>
              <TooltipTrigger asChild>
                <CircleHelp
                  className={`h-3 w-3 cursor-pointer text-black/[0.6] `}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">{item?.toolTipData}</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <div className="w-full flex items-center gap-5 justify-between text-2xl font-medium">
            <span className="shrink-0">
              <p className="font-semibold mt-2 text-black">{item?.value}</p>
            </span>

            <div
              className={` flex items-center justify-center gap-2 ${
                item?.change < 0 ? "text-red-600" : "text-green-600"
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
                  Number(item?.change) < 0 ? "text-red-600" : "text-green-600"
                }`}
              >
                {item?.change} % &nbsp;
                <span>change</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsCard;
