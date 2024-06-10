"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Download } from "lucide-react";
import axios from "axios";
import { ClipLoader } from "react-spinners";

const UserInfoHeader = ({ order }) => {
  const [isDownloading, setIsDownloading] = React.useState(false);
  if (!order) {
    return null;
  }

  const onDownloadAllClick = async () => {
    try {
      setIsDownloading(true);
      for (const item of order?.cartItems) {
        const res = await axios.get(item?.fileURL, { responseType: "blob" });
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", item.fileOriginalName + ".pdf");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsDownloading(false);
    }
  };
  return (
    <section className="w-full min-h-20 bg-[#fff] p-4 flex items-center gap-6 border-b ">
      <Avatar>
        <AvatarImage src={order?.userId?.image} />
        <AvatarFallback>{order?.userId?.name[0].toUpperCase()}</AvatarFallback>
      </Avatar>
      <div className="flex w-full justify-between">
        <div className=" font-medium flex flex-col ">
          <p>{order?.orderNumber}</p>
          <span className="text-gray-700 text-sm font-normal">
            <span className="font-semibold capitalize underline underline-offset-4">
              {order?.userId?.name}
            </span>{" "}
            successfully paid ₹ {order?.totalPrice}
          </span>
        </div>
        <div
          onClick={onDownloadAllClick}
          className=" cursor-pointer bg-green-600 text-sm text-white font-medium border rounded-md flex items-center justify-center px-4 py-1"
        >
          <div className="flex items-center gap-2">
            <span className="sm:hidden lg:flex">Download All</span>
            {isDownloading ? (
              <ClipLoader color="white" size={16} />
            ) : (
              <Download className="h-4 w-4" />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserInfoHeader;
