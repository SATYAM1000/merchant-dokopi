"use client";
import React from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { ScrollArea } from "@/components/ui/scroll-area";
import OrderCard from "./OrderCard";
import { format } from "date-fns";
import Image from "next/image";

const OrdersContainer = ({
  activeOrders,
  onOrderClick,
  selectedOrderId,
  date,
}) => {
  if (!activeOrders || activeOrders.length === 0)
    return (
      <div className="flex flex-col items-center justify-center w-full h-[calc(100vh-80px)]">
        <Image
          src="https://user-images.githubusercontent.com/507615/54591670-ac0a0180-4a65-11e9-846c-e55ffce0fe7b.png"
          width={200}
          height={200}
          alt="No orders"
        />
        <p className="mt-8 text-[#6B7280]">
          No orders found{" "}
          <span>
            {date ? (
              <>
                <span>on </span>
                {formatDateWithOrdinal(date)}
              </>
            ) : (
              "today"
            )}
          </span>
        </p>
      </div>
    );
  const [animationParent] = useAutoAnimate();

  return (
    <ScrollArea type="scroll" className="h-[calc(100vh-80px)] w-full">
      <div ref={animationParent} className="flex flex-col">
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

const getOrdinalSuffix = (day) => {
  if (day > 3 && day < 21) return "th";
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

const formatDateWithOrdinal = (date) => {
  const day = format(date, "d");
  const month = format(date, "MMMM");
  const year = format(date, "yyyy");
  const ordinalSuffix = getOrdinalSuffix(parseInt(day));
  return `${day}${ordinalSuffix} ${month} ${year}`;
};
