"use client";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Download } from "lucide-react";
import axios from "axios";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { toast } from "sonner";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ClipLoader } from "react-spinners";
import { Button } from "@/components/ui/button";
import { API_DOMAIN } from "@/lib/constants";
import { fetchAccessToken } from "@/actions/access-token";
import { Checkbox } from "@/components/ui/checkbox";

const UserInfoHeader = ({ order, updateOrderStatus }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [loader, setLoader] = useState(false);
  const [loadingForCancel, setLoadingForCancel] = useState(false);
  const [open, setOpen] = useState(false);

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
        const res = await axios.get(
          `https://d28fpa5kkce5uk.cloudfront.net/${item.fileKey}`,
          {
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
          }
        );

        if (res.status === 200) {
          downloaded++;
          const url = window.URL.createObjectURL(new Blob([res.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute(
            "download",
            `${item?.fileName}.${item.fileExtension}`
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

  const cancelOrder = async () => {
    try {
      setLoadingForCancel(true);
      const res = await axios.put(
        `${API_DOMAIN}/api/v1/merchant/orders/cancel/${order?._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${await fetchAccessToken()}`,
          },
        }
      );

      if (res.data.success) {
        toast.success("Order cancelled successfully");
        // Update the order status without refreshing the page
        updateOrderStatus(order._id, "rejected");
        setOpen(false);
      } else {
        toast.error("Failed to cancel order");
      }
    } catch (error) {
      console.error("Failed to cancel order:", error);
      toast.error(error.response?.data?.msg || "Failed to cancel order");
    } finally {
      setLoadingForCancel(false);
    }
  };

  const handleCancelButtonClick = () => {
    if (
      order?.orderStatus === "rejected" ||
      order?.orderStatus === "delivered"
    ) {
      toast.error(
        "Cannot cancel an order that is already delivered or cancelled"
      );
    } else {
      setOpen(true);
    }
  };

  const handlePrintedButtonClick = async () => {
    try {
      const res = await axios.put(
        `${API_DOMAIN}/api/v1/merchant/orders/toggle-status/${order?._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${await fetchAccessToken()}`,
          },
        }
      );
      if (res.data.success) {
        toast.success(res.data.msg || "Order marked as printed successfully");
        updateOrderStatus(order._id, "printed");
      } else {
        toast.error("Failed to change order status");
      }
    } catch (error) {
      console.error("Failed to change order status:", error);
      toast.error(error.response?.data?.msg || "Failed to change order status");
    }
  };

  return (
    <section className="w-full min-h-14 bg-[#fff] px-4 py-5 flex items-center gap-6 border-b ">
      <Avatar>
        <AvatarImage
          src={order?.userId?.image || "https://github.com/shadcn.png"}
        />
        <AvatarFallback>{order?.userId?.name[0]?.toUpperCase()}</AvatarFallback>
      </Avatar>
      <div className="flex w-full justify-between">
        <div className="font-medium flex flex-col">
          <p className="font-semibold">{order?.orderNumber} </p>

          <span className="text-gray-700 text-sm font-normal">
            <span className="font-semibold capitalize underline underline-offset-4">
              {`${order?.userId?.name} (+91 ${order?.userId?.phone})`}
            </span>{" "}
            paid ₹ {order?.totalPrice}
          </span>
        </div>
        <div className="flex items-center justify-center gap-6">
          <div className="flex items-center justify-center rounded p-1 gap-1.5">
            <Tooltip>
              <TooltipTrigger>
                <>
                  <Button
                    disabled={
                      order?.orderStatus === "rejected" ||
                      order?.orderStatus === "cancelled"
                    }
                    onClick={handlePrintedButtonClick}
                    className={` cursor-pointer flex items-center justify-center gap-2  ${
                      order?.orderStatus === "printed"
                        ? "bg-green-600 text-white hover:bg-green-600 hover:text-white"
                        : "bg-yellow-600 text-white hover:bg-yellow-600 hover:text-white"
                    }`}
                  >
                    <Checkbox checked={order?.orderStatus === "printed"} />
                    <span>Mark as Printed</span>
                  </Button>
                </>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">Mark as printed</p>
              </TooltipContent>
            </Tooltip>

            <div className="h-6 w-0.5 bg-gray-200"></div>

            <Tooltip>
              <TooltipTrigger>
                <Button
                  disabled={
                    order?.orderStatus === "rejected" ||
                    order?.orderStatus === "cancelled"
                  }
                  onClick={handleCancelButtonClick}
                  className={` bg-red-600 text-white flex items-center justify-center gap-2 hover:bg-red-500 hover:text-white  disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400`}
                >
                  <Checkbox checked={order?.orderStatus === "rejected"} />
                  <span>Cancel this order</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">Cancel this order</p>
              </TooltipContent>
            </Tooltip>

            <AlertDialog open={open} onOpenChange={setOpen}>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. Once you declined the order,
                    it will be permanently canceled and cannot be restored.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <Button
                      onClick={cancelOrder}
                      className="bg-red-500 hover:bg-red-700"
                    >
                      {loadingForCancel ? (
                        <ClipLoader
                          color="#fff"
                          size={16}
                          aria-label="Loading Spinner"
                          data-testid="loader"
                        />
                      ) : (
                        "Confirm"
                      )}
                    </Button>
                  </>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
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
