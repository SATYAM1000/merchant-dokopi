"use client";
import React from "react";
import PropTypes from "prop-types";
import { getTimeFromISO } from "@/lib/get-time";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { LiaCheckDoubleSolid } from "react-icons/lia";

const OrderCard = ({ order, onOrderClick, isSelected }) => {
  const [checkboxCSS, setCheckboxCSS] = React.useState("hidden");
  const handleClick = () => {
    onOrderClick(order);
  };

  const handleChevronClick = (e) => {
    e.stopPropagation();
    console.log("Chevron clicked");
  };

  return (
    <div
      onClick={handleClick}
      className={`text-sm h-18 hover:border-none transition-all duration-500 cursor-pointer ${
        isSelected ? "border-white" : "border-b"
      } `}
    >
      <div
        className={`w-full h-full rounded-md flex items-center gap-4 p-2 hover:bg-gray-100  ${
          isSelected ? "bg-gray-100 border-l-4 border-green-500" : "bg-white"
        } `}
      >
        {/* User Image */}
        <div className="flex items-center justify-center transition-all">
          <Avatar className="h-11 w-11 relative">
            <AvatarImage src={order.userId?.image} />
            <AvatarFallback>
              {order?.userId?.name[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
        {/* Order Details */}
        <div className="h-12 w-[calc(100%-40px)] flex flex-col justify-end">
          <div className="flex items-center justify-between">
            {/* Order Number */}
            <h4 className="text-[16px] font-medium text-black leading-none">
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
            <div className="text-sm text-gray-700 leading-none flex items-center gap-1">
              {/* Order Information */}
              <div className="flex items-center text-blue-500">
                <LiaCheckDoubleSolid size={18} />
              </div>
              <span className="text-gray-600">
                {order?.userId && order?.totalPrice
                  ? `${order.userId.name} paid ₹ ${order.totalPrice - order.platformFee}`
                  : "Invalid Order"}
              </span>
            </div>
            {/* Cart Item Count */}
            <div className="flex items-center gap-4">
              <div
                className={`text-xs h-5 w-5 font-medium flex items-center justify-center rounded-full ${
                  order?.isViewed
                    ? "bg-gray-100 text-gray-600"
                    : "bg-green-600 text-white"
                }`}
              >
                <span>{order?.cartItems?.length || 0}</span>
              </div>
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
