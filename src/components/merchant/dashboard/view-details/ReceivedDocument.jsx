'use client'
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const ReceivedDocument = ({ docs }) => {
  console.log("docs is ", docs);
  return (
    <div className="space-y-6 w-[100%] max-h-[67vh] rounded-md relative hide-scrollbar flex flex-col gap-2">
      <ul className="space-y-4 rounded-md">
        <li
          key={docs.id}
          className="flex p-2 rounded-md items-center gap-4 pb-4 min-w-full"
        >
          <img
            src={docs?.iconPath}
            alt={docs?.fileName}
            className="h-16 w-16 rounded object-contain"
          />
          <div className="w-full">
            <h3 className="text-[15px] font-medium text-gray-900 ">
              {docs?.fileName + "." + docs?.fileExtension}
            </h3>
            <dl className="mt-0.5 w-full space-y-px text-[11px] text-gray-700">
              <div className="flex items-center justify-between w-full ">
                <div className="flex items-center gap-4">
                  <dd className="inline font-medium">
                    {docs?.fileSize}
                  </dd>
                  <dd className="inline font-medium">
                    {docs?.pageCount}&nbsp;Pages
                  </dd>
                </div>
                
              </div>
              <div className="flex items-center flex-wrap gap-2 text-gray-700 text-[11px] ">
                <dd className="inline capitalize">
                  {docs?.paperSize}
                </dd>
                <dd className="inline capitalize ">
                  {docs?.printSides.split("_").join(" ")}
                </dd>
                <dd className="inline capitalize">
                  {docs?.printType.split("_").join(" ")}
                </dd>
                <dd className="inline capitalize">
                  {docs?.additionalServices}
                </dd>

              </div>
              <div className="flex">
                <Button variant="link" size="xs" className="ml-auto">
                  <Link href={`https://d28fpa5kkce5uk.cloudfront.net/${docs?.fileKey}`} target="_blank" className="text-blue-800">Download</Link>
                </Button>
              </div>
            </dl>
          </div>
        </li>
      </ul>
    </div>
  )
};

export default ReceivedDocument;
