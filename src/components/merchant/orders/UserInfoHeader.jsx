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
        <div className="flex items-center justify-center gap-6">
          <div className="flex items-center justify-center  border rounded p-1.5 gap-1.5">
            <div className="flex items-center justify-center cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-square-check-big"
              >
                <path d="m9 11 3 3L22 4" />
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
              </svg>
            </div>

            <div className="h-6 w-0.5 bg-gray-200"></div>

            <div className="flex items-center justify-center cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-ban"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="m4.9 4.9 14.2 14.2" />
              </svg>
            </div>
          </div>

          <div
            onClick={onDownloadAllClick}
            className="cursor-pointer p-2 border rounded"
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
