"use client";
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import OrderCard from "./OrderCard";
const tags = Array.from({ length: 19 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
);
const OrdersContainer = () => {
  return (
    <ScrollArea className="h-[calc(100vh-120px)] w-full mt-2 ">
      <div className="flex flex-col gap-1">
        {tags.map((tag) => (
          <>
            <OrderCard key={tag} />
          </>
        ))}
      </div>
    </ScrollArea>
  );
};

export default OrdersContainer;
