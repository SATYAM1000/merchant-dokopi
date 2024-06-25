"use client";
import { RotateCcwIcon } from "lucide-react";
import React from "react";

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
            <RotateCcwIcon className="h-3 w-3 text-indigo-600" />
            <span className="text-xs text-indigo-600">Refresh</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default OverviewComponentContainer;
