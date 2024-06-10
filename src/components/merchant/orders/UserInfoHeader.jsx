"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Download } from "lucide-react";

const UserInfoHeader = ({ order }) => {
  if (!order) {
    return null;
  }
  return (
    <section className="w-full min-h-20 bg-[#fff] p-4 flex items-center gap-6 border-b border-black/[0.15]">
      <Avatar>
        <AvatarImage src={order?.userId?.image} />
        <AvatarFallback>{order?.userId?.name[0].toUpperCase()}</AvatarFallback>
      </Avatar>
      <div className="flex w-full justify-between">
        <div className=" font-medium flex flex-col ">
          <p>{order?.orderNumber}</p>
          <span className="text-gray-700 text-sm font-normal">
            {order?.userId?.name} Paid ₹ {order?.totalPrice}
          </span>
        </div>
        <div className=" cursor-pointer bg-green-600 text-sm text-white font-medium border rounded-md flex items-center justify-center px-4 py-1">
          <div className="flex items-center gap-2">
            <span>Download All</span>
            <Download className="h-4 w-4" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserInfoHeader;
