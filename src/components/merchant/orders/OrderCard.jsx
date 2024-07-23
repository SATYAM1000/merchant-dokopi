"use client";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { getTimeFromISO } from "@/lib/get-time";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import axios from "axios";
import { API_DOMAIN } from "@/lib/constants";
import { fetchAccessToken } from "@/actions/access-token";
import { toast } from "sonner";
import { LuCheckCheck } from "react-icons/lu";
import { PiSealCheckFill } from "react-icons/pi";

const OrderCard = ({ order, onOrderClick, isSelected }) => {
  if (!order || !order?.userId?.name) return null;

  const [orderStatus, setOrderStatus] = useState(order.orderStatus);

  const handleCustomCheckBoxClick = async (e) => {
    e.stopPropagation();

    try {
      const newStatus =
      orderStatus === "delivered" ? "processing" : "delivered";
      const { data } = await axios.put(
        `${API_DOMAIN}/api/v1/merchant/orders/change-status/${order._id}/${newStatus}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${await fetchAccessToken()}`,
          },
        }
      );
      toast.success(data?.msg || "Status changed successfully");
    
      setOrderStatus(newStatus);
    } catch (error) {
      console.log("error is",error);
      toast.error(error.response?.data?.msg || "Something went wrong");
    }
  };

  const handleClick = () => {
    onOrderClick(order);
  };

  useEffect(() => {
    setOrderStatus(order.orderStatus);
  }, [order.orderStatus]);

  return (
    <div
      onClick={handleClick}
      className={`text-sm h-18 cursor-default border-b transition-all duration-500 ${
        isSelected ? "" : ""
      } `}
    >
      <div
        className={`w-full h-full flex items-center gap-4 p-2    ${
          isSelected ? "bg-[#f5f5f5] " : "bg-white hover:bg-[#f5f5f5]"
        }`}
      >
        {/* User Image */}
        <div className="flex items-center justify-center transition-all">
          <div
            onClick={handleCustomCheckBoxClick}
            className="flex items-center justify-center relative cursor-pointer"
          >
            <Avatar className="h-11 w-11 relative">
              <AvatarImage
                src={order.userId?.image || "https://github.com/shadcn.png"}
              />
              <AvatarFallback>
                {order?.userId?.name[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>

            {/* ----checkbox-------- */}
            <div
              className={`w-5 h-5 absolute -bottom-1 -right-4  rounded-full cursor-pointer mr-3 flex items-center justify-center ${
                orderStatus === "delivered" ? "bg-white" : "bg-white"
              }`}
            >
              <PiSealCheckFill
                size={20}
                className={`${
                  orderStatus === "delivered"
                    ? "block text-green-600"
                    :"block text-gray-300"
                }`}
              />
            </div>
          </div>
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
              className={`text-xs font-medium  ${
                order?.isOrderViewedByMerchant ? "text-[#6B7280]" : "text-green-600"
              }`}
            >
              {getTimeFromISO(order?.createdAt)}
            </p>
          </div>
          <div className="flex items-center justify-between mt-1">
            <div className="text-sm text-gray-700 leading-none flex items-center gap-1">
              {/* Order Information */}
              <div className="flex items-center text-blue-600">
                <LuCheckCheck size={18} />
              </div>
              <span className=" text-[13px] text-[#6B7280]">
                {order?.userId && order?.totalPrice
                  ? `${order.userId.name} paid ₹ ${
                      order.totalPrice - order.platformFee
                    }`
                  : "Invalid Order"}
              </span>
            </div>
            {/* Cart Item Count */}
            <div className="flex items-center gap-4">
              <div
                className={`text-xs h-5 w-5 font-medium flex items-center justify-center rounded-full ${
                  order?.isOrderViewedByMerchant
                    ? "bg-transparent text-[#6B7280]"
                    : "bg-green-600 text-white"
                }`}
              >
                <span className="text-xs">{order?.cartItems?.length || 0}</span>
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
