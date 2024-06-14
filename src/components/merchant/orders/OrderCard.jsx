"use client";
import React from "react";
import PropTypes from "prop-types";
import { getTimeFromISO } from "@/lib/get-time";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronDown } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
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
      className={`text-sm h-18 hover:border-none transition-all cursor-pointer ${
        isSelected ? "border-none" : "border-b"
      } `}
    >
      <div
        className={`w-full h-full rounded-md flex items-center gap-4 p-2 hover:bg-gray-100 ${
          isSelected ? "bg-gray-200" : "bg-white"
        } `}
      >
        {/* User Image */}
        <div
          onMouseEnter={() => setCheckboxCSS("block")}
          onMouseLeave={() => setCheckboxCSS("hidden")}
          className="flex items-center justify-center transition-all"
        >
          <Avatar className="h-11 w-11 relative">
            <AvatarImage src={order.userId.image} />
            <AvatarFallback>
              {order.userId.name[0].toUpperCase()}
            </AvatarFallback>
            <div
              className={`absolute transition-all top-0 right-0 z-5 bg-black/[0.5] rounded-full h-full w-full flex items-center justify-center text-white text-xs font-medium leading-none ${checkboxCSS}`}
            >
              <Checkbox checked={order.isViewed} className=" h-5 w-5" />
            </div>
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
                order?.isViewed ? "text-gray-700" : "text-green-600"
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
              <span className="text-gray-700">
                {order?.userId && order?.totalPrice
                  ? `${order.userId.name} paid ₹ ${order.totalPrice}`
                  : "Invalid Order"}
              </span>
            </div>
            {/* Cart Item Count */}
            <div className="flex items-center gap-4">
              <div
                className={`text-xs h-5 w-5 font-medium flex items-center justify-center rounded-full ${
                  order?.isViewed
                    ? "bg-gray-200 text-gray-700"
                    : "bg-green-600 text-white"
                }`}
              >
                <span>{order?.cartItems?.length || 0}</span>
              </div>

              <Popover>
                <PopoverTrigger asChild>
                  <ChevronDown
                    className="h-4 w-4"
                    onClick={handleChevronClick}
                  />
                </PopoverTrigger>
                <PopoverContent className="w-30">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium leading-none">Dimensions</h4>
                      <p className="text-sm text-muted-foreground">
                        Set the dimensions for the layer.
                      </p>
                    </div>
                    <div className="grid gap-2">
                      <div className="grid grid-cols-3 items-center gap-4">
                        <Label htmlFor="width">Width</Label>
                        <Input
                          id="width"
                          defaultValue="100%"
                          className="col-span-2 h-8"
                        />
                      </div>
                      <div className="grid grid-cols-3 items-center gap-4">
                        <Label htmlFor="maxWidth">Max. width</Label>
                        <Input
                          id="maxWidth"
                          defaultValue="300px"
                          className="col-span-2 h-8"
                        />
                      </div>
                      <div className="grid grid-cols-3 items-center gap-4">
                        <Label htmlFor="height">Height</Label>
                        <Input
                          id="height"
                          defaultValue="25px"
                          className="col-span-2 h-8"
                        />
                      </div>
                      <div className="grid grid-cols-3 items-center gap-4">
                        <Label htmlFor="maxHeight">Max. height</Label>
                        <Input
                          id="maxHeight"
                          defaultValue="none"
                          className="col-span-2 h-8"
                        />
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
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
