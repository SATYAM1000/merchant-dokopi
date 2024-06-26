"use client";
import React from "react";
import PropTypes from "prop-types";
import { getTimeFromISO } from "@/lib/get-time";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LiaCheckDoubleSolid } from "react-icons/lia";
import axios from "axios";
import { API_DOMAIN } from "@/lib/constants";
import { fetchAccessToken } from "@/actions/access-token";
import { toast } from "sonner";

const OrderCard = ({ order, onOrderClick, isSelected }) => {
  const [isCheckboxChecked, setIsCheckboxChecked] = React.useState(
    order?.orderStatus === "delivered" ? true : false
  );

  const handleCustomCheckBoxClick = async (e) => {
    e.stopPropagation();
    setIsCheckboxChecked(!isCheckboxChecked);
    try {
      const { data } = await axios.put(
        `${API_DOMAIN}/api/v1/merchant/orders/change-status/${order._id}/${
          isCheckboxChecked ? "processing" : "delivered"
        }`,
        {},
        {
          headers: {
            Authorization: `Bearer ${await fetchAccessToken()}`,
          },
        }
      );

      toast.success(data?.msg || "Status changed successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.msg || "Something went wrong");
    }
  };

  const handleClick = () => {
    onOrderClick(order);
  };

  return (
    <div
      onClick={handleClick}
      className={`text-sm h-18 cursor-default hover:border-none transition-all duration-500 ${
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
          <div
            onClick={handleCustomCheckBoxClick}
            className="w-6 h-6 rounded cursor-pointer bg-gray-100 border border-black/[0.20] mr-3 flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`${isCheckboxChecked ? "block" : "hidden"}`}
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </div>
          <Avatar className="h-11 w-11 relative">
            <AvatarImage
              src={order.userId?.image || "https://github.com/shadcn.png"}
            />
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
                  ? `${order.userId.name.split(" ")[0]} paid ₹ ${
                      order.totalPrice - order.platformFee
                    }`
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
