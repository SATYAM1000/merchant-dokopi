"use client";
import { RotateCcwIcon } from "lucide-react";
import React from "react";
import OverviewCard from "./OverviewCard";
import { overviewCardData } from "@/lib/constants";

const OverviewComponentContainer = () => {
  const onRefresh = () => {
    window.location.reload();
  };
  return (
    <>
      <div className="flex flex-col gap-2 w-full">
        {/* --------heading------------ */}
        <div className="flex items-center border-b w-[100%] gap-4">
          <p className="font-medium">Overview</p>
          <div
            onClick={onRefresh}
            className="flex items-center gap-2 cursor-pointer"
          >
            <RotateCcwIcon className="h-3 w-3 text-blue-600" />
            <span className="text-xs text-blue-600">Refresh</span>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 mt-2 md:mt-0 md:grid-cols-4 md:gap-3">
          {overviewCardData.map((item, index) => {
            return (
              <OverviewCard
                key={index}
                title={item.title}
                type={item.type}
                value={item.value}
                tooltipValue={item.tooltipValue}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default OverviewComponentContainer;
