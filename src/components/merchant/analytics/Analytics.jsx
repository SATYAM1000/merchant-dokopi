"use client";
import React, { useState } from "react";
import { RotateCcw } from "lucide-react";

import OverviewCard from "../orders/OverviewCard";
import { analyticsOverviewData } from "@/lib/constants";
import SelectFilter from "./SelectFilter";
import EarningChart from "./EarningChart";
import OrderChart from "./OrderChart";

const Analytics = () => {
  const onRefresh = () => {
    window.location.reload();
  };

  return (
    <section className="h-[calc(100vh-64px)] w-full">
      <div className="w-full h-auto flex flex-col gap-0 ">
        <div
          className={`w-full flex items-center mb-0 justify-between bg-gray-100 px-6 py-4 border-b`}
        >
          <div className="flex flex-col gap-2 w-full">
            {/* --------heading------------ */}
            <div className="flex items-center border-b w-[100%] gap-4">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-3">
                  <p className="font-medium">Payment Overview</p>
                  <div
                    onRefresh={onRefresh}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <RotateCcw className="h-3 w-3 text-blue-600" />
                    <span className="text-xs text-blue-600">Refresh</span>
                  </div>
                </div>

                <SelectFilter
                  title="Filter by"
                  values={["Today", "Last Week", "Last Month", "Custom"]}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 mt-2 md:mt-0 md:grid-cols-4 md:gap-3">
              {/* -----------------total earnings-------------- */}
              {analyticsOverviewData.map((item, index) => {
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
        </div>

        {/* --------------bottom----------- */}
        <div
          className={`w-[100%] grid grid-cols-1 gap-6 md:grid-cols-2 bg-gray-100 p-6 border-b`}
        >
          {/* --------chart------------ */}
          <div className=" bg-white overflow-hidden">
            <div className="w-full flex items-end justify-end">
              <SelectFilter
                title="Filter by"
                className={"bg-gray-100 mr-6 mt-4 text-primary"}
                values={["Daily", "Weekly", "Monthly", "Custom"]}
              />
            </div>
            <EarningChart />
          </div>
          <div>
            <div className="flex  bg-white  flex-col">
              <div className="w-full flex items-end justify-end">
                <SelectFilter
                  title="Filter by"
                  className={"bg-gray-100 mr-6 mt-4 text-primary"}
                  values={["Daily", "Weekly", "Monthly", "Custom"]}
                />
              </div>
              <OrderChart />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Analytics;
