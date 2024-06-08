"use client";
import React from "react";
import Image from "next/image";
import { MdDownload } from "react-icons/md";
import axios from "axios";
import { ClipLoader } from "react-spinners";

const DocumentInfo = ({ cartItems }) => {
  const [showDownloadButton, setShowDownloadButton] = React.useState(false);

  const handleDownload = async (item) => {
    try {
      setShowDownloadButton(true);
      if (!item?.fileURL) return;
      const response = await axios.get(item.fileURL, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", item.fileOriginalName + ".pdf");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading file:", error);
    } finally {
      setShowDownloadButton(false);
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
            {" "}
            <div className="  bg-gray-200 w-full rounded-sm p-4 flex flex-col">
              <div className="w-full  flex items-center justify-between">
                <div className="flex items-center gap-4 ">
                  <Image
                    src="/file-icons/pdf.svg"
                    alt="curved dotted line"
                    width={32}
                    height={32}
                  />

                  <div>
                    <p className="text-sm font-medium">
                      {item?.fileOriginalName || "N/A"}
                    </p>
                    <div className="flex items-center gap-2">
                      <p className="text-xs text-gray-500 ">
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
                    onClick={() => handleDownload(item)}
                    className="text-white font-medium border flex items-center justify-center cursor-pointer h-8 w-8 bg-green-600 border-green-600 p-1 rounded-full"
                  >
                    {showDownloadButton ? (
                      <ClipLoader
                        color="#968f9d"
                        loading={showDownloadButton}
                        size={20}
                      />
                    ) : (
                      <MdDownload className="text-xl" />
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* -----info------------- */}
            <div>
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
            </div>
            <p className="text-sm text-gray-500 absolute bottom-1 right-2">
              {index + 1}/{cartItems.length}
            </p>
          </div>
        );
      })}
    </>
  );
};

export default DocumentInfo;
