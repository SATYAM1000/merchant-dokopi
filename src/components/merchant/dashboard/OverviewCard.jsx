import { CircleHelp } from "lucide-react";
import React from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";


const OverviewCard = ({
  title,
  type = "default",
  value,
  tooltipValue,
  className,
}) => {
  if (!title || !value) return null;
  return (
    <>
      <div
        className={`p-4 w-full h-full flex flex-col gap-3   ${className} hover:bg-blue-200 transition-all`}
      >
        <div className="flex items-center gap-2">
          <p className="text-gray-700">{title}</p>

          <Tooltip>
            <TooltipTrigger asChild>
              <CircleHelp
                className={`h-3 w-3 cursor-pointer ${
                  type === "default" ? "text-gray-700" : "text-red-600"
                }`}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">{tooltipValue}</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <div className="flex items-center gap-1 justify-between text-2xl font-medium">
          <span>{value}</span>

          <div className="flex items-center gap-2 text-green-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
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
            <p className="text-xs">5% Up</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default OverviewCard;
