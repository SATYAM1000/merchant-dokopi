"use client";
import React, { useState } from "react";
import Image from "next/image";
import axios from "axios";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { toast } from "sonner";

const DocumentInfo = ({ cartItems }) => {
  console.log("cart items are ", cartItems);
  const [loadingStates, setLoadingStates] = useState({});
  const [progressStates, setProgressStates] = useState({});

  const handleDownload = async (item, index) => {
    try {
      setLoadingStates((prevState) => ({ ...prevState, [index]: true }));
      setProgressStates((prevState) => ({ ...prevState, [index]: 0 }));

      if (!item?.fileKey) return;

      const response = await axios.get(
        `https://d28fpa5kkce5uk.cloudfront.net/${item.fileKey}`,
        {
          responseType: "blob",
          onDownloadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgressStates((prevState) => ({
              ...prevState,
              [index]: progress,
            }));
          },
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", item.fileName + `.${item.fileExtension}`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading file:", error);
      if (error?.response?.status === 403) {
        setLoadingStates((prevState) => ({ ...prevState, [index]: false }));
        setProgressStates((prevState) => ({ ...prevState, [index]: 0 }));
        toast.error("File can not be downloaded");
        return;
      }
      if (error?.response?.status === 404) {
        setLoadingStates((prevState) => ({ ...prevState, [index]: false }));
        setProgressStates((prevState) => ({ ...prevState, [index]: 0 }));
        toast.error("File not found");
        return;
      }
    } finally {
      setLoadingStates((prevState) => ({ ...prevState, [index]: false }));
      setProgressStates((prevState) => ({ ...prevState, [index]: 0 }));
    }
  };

  return (
    <>
      {cartItems.map((item, index) => (
        <div
          key={index}
          className="bg-[#fff] relative rounded-lg border-b border-gray-800/[0.25] px-1 pb-1 pt-1 shadow "
        >
          <div className="bg-[#f3f3f3] w-full rounded-sm p-2 flex flex-col">
            <div className="w-full flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Image
                  src={`${item?.iconPath}`}
                  alt="file icon"
                  width={32}
                  height={32}
                />
                <div className="mt-1">
                  <p className="text-sm font-medium">
                    {item?.fileName?.length > 20
                      ? `${item?.fileName?.slice(0, 20)}... ${
                          item?.fileExtension
                        }`
                      : item?.fileName + `.${item?.fileExtension}`}
                  </p>
                  <div className="flex items-center gap-2">
                    <p className="text-xs text-gray-500">
                      {item?.pageCount}&nbsp;pages
                    </p>
                    <p className="text-xs text-gray-500">
                      {item?.fileExtension.toUpperCase()}
                    </p>
                    <p className="text-xs text-gray-500">
                      {convertBytes(item?.fileSize)}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div
                  onClick={() => handleDownload(item, index)}
                  className="text-white font-medium flex items-center justify-center cursor-pointer h-8 w-8 bg-green-600  p-1 rounded-full"
                >
                  {loadingStates[index] ? (
                    <div className="w-6 h-6">
                      <CircularProgressbar
                        value={progressStates[index]}
                        styles={buildStyles({
                          pathColor: "#fff",
                          trailColor: "rgba(255, 255, 255, 0.2)",
                        })}
                      />
                    </div>
                  ) : (
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
                      className="lucide lucide-arrow-down-to-line"
                    >
                      <path d="M12 17V3" />
                      <path d="m6 11 6 6 6-6" />
                      <path d="M19 21H5" />
                    </svg>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div
            className={`px-3 py-2 text-[13px] ${
              item?.xeroxStoreMessage?.length > 0
                ? "border-b border-gray-200"
                : ""
            }`}
          >
            <div className="flex items-center justify-between">
              <p className=" font-medium">No. of Copies</p>
              <p className=" text-gray-500">{item?.copiesCount}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className=" font-medium">Paper Size</p>
              <p className=" text-gray-500">{item?.paperSize}</p>
            </div>

            <div className="flex items-center justify-between">
              <p className=" font-medium">Print Type</p>
              <p className=" text-gray-500 capitalize">
                {item?.printType.split("_")?.join(" ")}
              </p>
            </div>

            <div className="flex items-center justify-between">
              <p className=" font-medium">Printing Sides</p>
              <p className=" text-gray-500 capitalize">
                {item?.printSides.split("_")?.join(" ")}
              </p>
            </div>

            {item?.printType === "mixed" && (
              <div className="flex items-center justify-between">
                <p className=" font-medium">Color Type</p>
                <p className=" text-gray-500 capitalize">
                  {item?.mixedPrintType.split("_")?.join(" ")}
                </p>
              </div>
            )}

            {item?.printType === "mixed" && (
              <div className="flex items-center justify-between">
                <p className=" font-medium">Color Pages</p>
                <p className=" text-gray-500 capitalize">
                  {item?.colorPages.join(", ")}
                </p>
              </div>
            )}
          </div>
          <div>
            {item?.xeroxStoreMessage?.length > 0 && (
              <div className="py-1 px-3 rounded-md  text-[13px] ">
                <p className=" font-medium">Message</p>
                <p className=" text-gray-500">{item?.xeroxStoreMessage}</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default DocumentInfo;

function convertBytes(sizeInBytes) {
  const KB = sizeInBytes / 1024;
  const MB = sizeInBytes / (1024 * 1024);
  if (MB > 1) {
    return `${MB.toFixed(2)} MB`;
  } else if (KB > 1) {
    return `${KB.toFixed(2)} KB`;
  }
  return `${sizeInBytes} B`;
}
