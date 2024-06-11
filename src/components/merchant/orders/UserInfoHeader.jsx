"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Download, X } from "lucide-react";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { toast } from "sonner";

const UserInfoHeader = ({ order }) => {
  const [isDownloading, setIsDownloading] = React.useState(false);
  if (!order) {
    return null;
  }

  const onDownloadAllClick = async () => {
    try {
      let downloaded = 0;
      setIsDownloading(true);
      for (const item of order?.cartItems) {
        const res = await axios.get(item?.fileURL, { responseType: "blob" });
        if (res.status === 200) {
          downloaded++;
        }
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(
          "download",
          item.fileOriginalName + `.${item.fileExtension}`
        );
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }

      if (downloaded === order?.cartItems?.length) {
        toast.success("All files downloaded successfully");
      } else {
        toast.error("Failed to download all files");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to download all files");
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
            paid ₹ {order?.totalPrice}
          </span>
        </div>
        <div className="flex items-center justify-center gap-4">
          <div
            onClick={onDownloadAllClick}
            className=" h-full cursor-pointer bg-green-600 text-sm text-white font-medium border rounded-md flex items-center justify-center px-4 py-1"
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
      </div>
    </section>
  );
};

export default UserInfoHeader;
