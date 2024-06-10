"use client";
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import OrderCard from "./OrderCard";

const OrdersContainer = ({ activeOrders, onOrderClick, selectedOrderId }) => {
  if (!activeOrders || activeOrders.length === 0)
    return (
      <div>
        <p>No orders found on the selected date.</p>
      </div>
    );

  return (
    <ScrollArea className="h-[calc(100vh-120px)] w-full mt-0">
      <div className="flex flex-col gap-1">
        {activeOrders.map((order) => (
          <OrderCard
            key={order.orderNumber}
            onOrderClick={onOrderClick}
            isSelected={selectedOrderId === order._id}
            order={order}
          />
        ))}
      </div>
    </ScrollArea>
  );
};

export default OrdersContainer;
