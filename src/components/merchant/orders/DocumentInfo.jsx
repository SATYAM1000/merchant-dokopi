"use client";
import React, { useState } from "react";
import Image from "next/image";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { LiaCheckDoubleSolid } from "react-icons/lia";

const DocumentInfo = ({ cartItems }) => {
  const [loadingStates, setLoadingStates] = useState({});

  const handleDownload = async (item, index) => {
    try {
      setLoadingStates((prevState) => ({ ...prevState, [index]: true }));
      if (!item?.fileURL) return;
      const response = await axios.get(item.fileURL, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        item.fileOriginalName + `.${item.fileExtension}`
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading file:", error);
    } finally {
      setLoadingStates((prevState) => ({ ...prevState, [index]: false }));
    }
  };

  return (
    <>
      {cartItems.map((item, index) => {
        return (
          <div
            key={index}
            className="bg-[#fff] relative rounded-lg border-b border-gray-800/[0.25] px-1 pb-6 pt-1 "
          >
            <div className="bg-gray-200 w-full rounded-sm p-4 flex flex-col">
              <div className="w-full flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Image
                    src={`${item?.fileIconPath}`}
                    alt="curved dotted line"
                    width={32}
                    height={32}
                  />

                  <div>
                    <p className="text-sm font-medium">
                      {item?.fileOriginalName || "N/A"}
                    </p>
                    <div className="flex items-center gap-2">
                      <p className="text-xs text-gray-500">
                        {item?.filePageCount}&nbsp;pages
                      </p>
                      <p className="text-xs text-gray-500">
                        {item?.fileExtension.toUpperCase()}
                      </p>
                      <p className="text-xs text-gray-500">{item?.fileSize}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-white bg-green-600 font-medium border flex items-center justify-center cursor-pointer h-8 w-8 border-green-600 p-1 rounded-full">
                    <p className="font-medium">{item?.fileCopiesCount || 1}</p>
                  </div>
                  <div
                    onClick={() => handleDownload(item, index)}
                    className="text-white font-medium border flex items-center justify-center cursor-pointer h-8 w-8 bg-green-600 border-green-600 p-1 rounded-full"
                  >
                    {loadingStates[index] ? (
                      <ClipLoader color="#fff" size={17} />
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
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
            <div className="px-4 py-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Printing Mode</p>
                <p className="text-sm text-gray-500">
                  {item?.filePrintMode === "simplex" && "Single Sided"}
                  {item?.filePrintMode === "duplex" && "Double Sided"}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Printing Type</p>
                <p className="text-sm text-gray-500">
                  {item?.fileColorType === "color" && "Color"}
                  {item?.fileColorType === "black and white" &&
                    "Black and White"}
                  {item?.fileColorType === "mixed" && "Mixed"}
                </p>
              </div>

              {item?.fileColorType === "mixed" && (
                <>
                  <div>
                    <p className="text-sm font-medium">Color Pages</p>
                    <p className="text-sm text-gray-500">
                      1, 2, 3, 4, 5, 6, 7, 8, 9, 10
                    </p>
                  </div>
                </>
              )}

              {item?.messageForXeroxStore !== null &&
                item?.messageForXeroxStore.length > 0 && (
                  <>
                    <div>
                      <p className="text-sm font-medium">Message</p>
                      <p className="text-sm text-gray-500">
                        {item?.messageForXeroxStore}
                      </p>
                    </div>
                  </>
                )}
            </div>
            <p className="text-xs text-gray-500 absolute bottom-1 right-2 flex items-center justify-center gap-2">
              <span className="text-green-600">
                <LiaCheckDoubleSolid size={18} />
              </span>
              <span className="font-medium">
                {index + 1}/{cartItems.length}
              </span>
            </p>
          </div>
        );
      })}
    </>
  );
};

export default DocumentInfo;
