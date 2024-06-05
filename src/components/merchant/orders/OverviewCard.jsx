import { CircleHelp } from "lucide-react";
import React from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const OverviewCard = ({ title, type = "default", value, tooltipValue }) => {
  if (!title || !value) return null;;
  return (
    <>
      <div className="bg-white p-4 w-full h-full flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <p>{title}</p>

          <Tooltip>
            <TooltipTrigger asChild>
              <CircleHelp
                className={`h-3 w-3 cursor-pointer ${
                  type === "default" ? "text-blue-600" : "text-red-600"
                }`}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">{tooltipValue}</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <div className="flex items-center gap-1 text-2xl">
          <span>{value}</span>
        </div>
      </div>
    </>
  );
};

export default OverviewCard;
