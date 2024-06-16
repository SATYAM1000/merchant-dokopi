import { Landmark } from "lucide-react";
import React from "react";
import { CircleHelp } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const BalanceCard = () => {
  return (
    <div className={`w-full h-24 border rounded-lg p-4 bg-blue-600 shadow-sm `}>
      <div className="flex items-center justify-items-start gap-4">
        <div
          className={`w-9 h-9 p-1 bg-white  text-blue-600 rounded-md flex items-center justify-center `}
        >
          <Landmark className="h-5 w-5" />
        </div>
        <div>
          <div className="flex items-center gap-2 ">
            <p className=" font-medium text-white text-[15px] ">Balance</p>
            <Tooltip>
              <TooltipTrigger asChild>
                <CircleHelp className={`h-3 w-3 cursor-pointer text-white `} />
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs ">Your current balance</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <div className="flex items-center gap-5 justify-between text-2xl font-medium">
            <span className="shrink-0">
              <p className="font-semibold mt-2 text-white">₹ 200</p>
            </span>

            <div className={` flex items-center justify-center gap-2 }`}>
              <div className="flex items-center justify-center  rounded-md"></div>
              <p className={`text-sm  text-white `}>
                Last settled on 01/01/2022
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalanceCard;
