"use client";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Download } from "lucide-react";
import axios from "axios";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { ClipLoader } from "react-spinners";
import { toast } from "sonner";

const UserInfoHeader = ({ order }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [loader, setLoader] = useState(false);

  if (!order) {
    return null;
  }

  const onDownloadAllClick = async () => {
    try {
      let downloaded = 0;
      setIsDownloading(true);
      setLoader(true);
      setDownloadProgress(0);

      for (const item of order?.cartItems) {
        const res = await axios.get(item?.fileURL, {
          responseType: "blob",
          onDownloadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );

            if (loader) {
              setLoader(false);
            }
            setDownloadProgress(progress);
          },
        });

        if (res.status === 200) {
          downloaded++;
          const url = window.URL.createObjectURL(new Blob([res.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute(
            "download",
            `${item.fileOriginalName}.${item.fileExtension}`
          );
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      }

      if (downloaded === order?.cartItems?.length) {
        toast.success("All files downloaded successfully");
      } else {
        toast.error("Failed to download all files");
      }
    } catch (error) {
      console.error("Failed to download all files:", error);
      toast.error("Failed to download all files");
    } finally {
      setIsDownloading(false);
      setDownloadProgress(0);
    }
  };

  return (
    <section className="w-full min-h-14 bg-[#fff] px-4 py-5  flex items-center gap-6 border-b">
      <Avatar>
        <AvatarImage
          src={order?.userId?.image || "https://github.com/shadcn.png"}
        />
        <AvatarFallback>{order?.userId?.name[0]?.toUpperCase()}</AvatarFallback>
      </Avatar>
      <div className="flex w-full justify-between">
        <div className="font-medium flex flex-col">
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
            className="cursor-pointer p-2 border border-black/[0.15] rounded-md"
          >
            {isDownloading ? (
              <div className="w-6 h-6">
                <CircularProgressbar
                  value={downloadProgress}
                  styles={buildStyles({
                    pathColor: "#000",
                    trailColor: "rgba(0, 0, 0, 0.2)",
                  })}
                />
              </div>
            ) : (
              <Download className="h-5 w-5" />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserInfoHeader;
