"use client";
import React from "react";
import PropTypes from "prop-types";
import { ScrollArea } from "@/components/ui/scroll-area";
import OrderCard from "./OrderCard";

const OrdersContainer = ({ activeOrders, onOrderClick, selectedOrderId }) => {
  if (!activeOrders || activeOrders.length === 0) return null;

  return (
    <ScrollArea className="h-[calc(100vh-120px)] w-full mt-2">
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

OrdersContainer.propTypes = {
  activeOrders: PropTypes.array.isRequired,
  onOrderClick: PropTypes.func.isRequired,
  selectedOrderId: PropTypes.string,
};

OrdersContainer.defaultProps = {
  selectedOrderId: null,
};

export default OrdersContainer;
