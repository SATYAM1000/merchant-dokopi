"use client";
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import OrderCard from "./OrderCard";

const OrdersContainer = ({ activeOrders, onOrderClick }) => {
  if (!activeOrders) return null;

  return (
    <ScrollArea className="h-[calc(100vh-120px)] w-full mt-2 ">
      <div className="flex flex-col gap-1">
        {activeOrders.map((order) => (
          <>
            <OrderCard
              key={order?.orderNumber}
              onOrderClick={onOrderClick}
              order={order}
            />
          </>
        ))}
      </div>
    </ScrollArea>
  );
};

export default OrdersContainer;
