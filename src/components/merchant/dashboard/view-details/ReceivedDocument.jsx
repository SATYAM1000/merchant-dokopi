'use client'
import { X } from "lucide-react";
import Link from "next/link";
import React from "react";

const ReceivedDocument = ({ docs }) => {
  return (
    <div className="mt-6 space-y-6 w-[100%]  max-h-[67vh] overflow-hidden rounded-md  overflow-y-scroll relative hide-scrollbar flex flex-col mb-6 gap-2">
      <ul className="space-y-4 bg-gray-100 rounded-md    ">
        <li
          key={docs.id}
          className="flex p-2 rounded-md items-center gap-4 pb-4 min-w-full border-b border-gray-300"
        >
          <img
            src={docs?.fileIconPath}
            alt={docs?.fileOriginalName}
            className="h-16 w-16 rounded object-contain"
          />
          <div className="w-full">
            <h3 className="text-[15px] font-medium text-gray-900 ">
              {docs?.fileOriginalName}
            </h3>
            <dl className="mt-0.5 w-full space-y-px text-[11px] text-gray-700">
              <div className="flex items-center justify-between w-full ">
                <div className="flex items-center gap-4">
                  <dd className="inline font-medium">
                    {docs?.fileSize}
                  </dd>
                  <dd className="inline font-medium">
                    {docs?.filePageCount}&nbsp;Pages
                  </dd>
                </div>
                <div
                  className="cursor-pointer"
                  onClick={() => removeFromCartHandler(docs?.id)}
                >
                  <X className="h-4 w-4" />
                </div>
              </div>
              <div className="flex items-center gap-2 text-gray-700 text-[11px] ">
                <dd className="inline capitalize ">
                  {docs?.filePrintMode}
                </dd>
                <dd className="inline capitalize">
                  {docs?.fileColorType}
                </dd>
                <dd className="inline capitalize">
                  {docs?.additionalServices}
                </dd>
              </div>
                <Link href={docs.fileURL} target="_blank"> Click to get Documents</Link>
            </dl>
          </div>
        </li>
      </ul>
    </div>
  )
};

export default ReceivedDocument;
