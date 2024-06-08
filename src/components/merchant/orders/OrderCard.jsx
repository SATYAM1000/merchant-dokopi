"use client";
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { getTimeFromISO } from "@/lib/get-time";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const OrderCard = ({ order, onOrderClick, isSelected }) => {
  const handleClick = () => {
    onOrderClick(order);
  };

  return (
    <div
      onClick={handleClick}
      className={`text-sm p-2 h-18 hover:bg-gray-100 cursor-pointer rounded-md ${
        isSelected ? "bg-gray-200" : "bg-white"
      }`}
    >
      <div className="w-full h-full flex items-center gap-4">
        {/* User Image */}
        <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
          <Avatar>
            <AvatarImage src={order.userId.image} />
            <AvatarFallback>
              {order.userId.name[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
        {/* Order Details */}
        <div className="h-12 w-[calc(100%-40px)] flex flex-col justify-end">
          <div className="flex items-center justify-between">
            {/* Order Number */}
            <h4 className="text-[16px] font-medium leading-none">
              {order?.orderNumber ? order.orderNumber : "Invalid Order Number"}
            </h4>
            {/* Order Time */}
            <p
              className={`text-xs font-medium leading-none ${
                order?.isViewed ? "text-gray-600" : "text-green-600"
              }`}
            >
              {getTimeFromISO(order?.createdAt)}
            </p>
          </div>
          <div className="flex items-center justify-between mt-1">
            <div className="text-sm text-gray-500 leading-none flex items-center gap-1">
              {/* Order Information */}
              <div className="flex items-center text-blue-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 7 17l-5-5" />
                  <path d="m22 10-7.5 7.5L13 16" />
                </svg>
              </div>
              <span>
                {order?.userId && order?.totalPrice
                  ? `${order.userId.name} paid ₹ ${order.totalPrice}`
                  : "Invalid Order"}
              </span>
            </div>
            {/* Cart Item Count */}
            <div
              className={`text-xs h-5 w-5 font-medium flex items-center justify-center rounded-full ${
                order?.isViewed
                  ? "bg-gray-200 text-gray-600"
                  : "bg-green-600 text-white"
              }`}
            >
              <span>{order?.cartItems?.length || 0}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

OrderCard.propTypes = {
  order: PropTypes.object.isRequired,
  onOrderClick: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
};

export default OrderCard;
