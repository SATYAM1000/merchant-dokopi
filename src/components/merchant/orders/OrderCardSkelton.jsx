"use client";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";

const OrderCardSkelton = () => {
  return (
    <ScrollArea className="h-[calc(100vh-120px)] w-full mt-2">
      <div className="flex flex-col gap-1">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            className={`text-sm h-18 cursor-default transition-all duration-500`}
          >
            <div
              className={`w-full h-full rounded-md flex items-center gap-4 p-2 bg-white`}
            >
              {/* User Image */}
              <div className="flex items-center justify-center transition-all">
                <div className="flex items-center justify-center relative cursor-pointer">
                  <Skeleton className={`w-10 h-10 rounded-full`} />
                </div>
              </div>
              {/* Order Details */}
              <div className="h-12 w-[calc(100%-40px)] flex flex-col justify-end">
                <div className="flex items-center justify-between">
                  {/* Order Number */}
                  <Skeleton className="h-4 w-32" />

                  {/* Order Time */}
                  <Skeleton className={`text-xs h-4 w-12 text-gray-500`} />
                </div>
                <div className="flex items-center justify-between mt-1">
                  <div className="text-sm text-gray-700 leading-none flex items-center gap-1">
                    {/* Order Information */}
                    <div className="flex items-center text-blue-500"></div>
                    <Skeleton className="h-4 w-40"></Skeleton>
                  </div>
                  {/* Cart Item Count */}
                  <div className="flex items-center gap-4">
                    <Skeleton className={`text-xs h-5 w-5  rounded-full`} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default OrderCardSkelton;
