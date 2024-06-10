"use client";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";

const OrderCardSkelton = () => {
  return (
    <ScrollArea className="h-[calc(100vh-120px)] w-full mt-2">
      <div className="flex flex-col gap-1">
        {Array.from({ length: 17 }).map((_, i) => (
          <Skeleton key={i} className="w-full h-16 rounded-md" />
        ))}
      </div>
    </ScrollArea>
  );
};

export default OrderCardSkelton;
