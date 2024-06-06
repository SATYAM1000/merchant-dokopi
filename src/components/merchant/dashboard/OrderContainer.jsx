"use client";
import React from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
const tags = Array.from({ length: 19 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
);
const OrdersContainer = () => {
  return (
    <ScrollArea className="h-[calc(100vh-120px)] w-full mt-2 ">
      <div className="flex flex-col gap-1">
        {tags.map((tag) => (
          <>
            <div
              key={tag}
              className="text-sm p-2 h-18 hover:bg-gray-100 cursor-pointer rounded-md "
            >
              <div className="w-full h-full flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-gray-200 p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22">
                    <path
                      d="m16.428 15.744c-.159-.052-1.164-.505-.536-2.414h-.009c1.637-1.686 2.888-4.399 2.888-7.07 0-4.107-2.731-6.26-5.905-6.26-3.176 0-5.892 2.152-5.892 6.26 0 2.682 1.244 5.406 2.891 7.088.642 1.684-.506 2.309-.746 2.396-2.238.724-8.325 4.332-8.229 9.586h24.05c.107-5.02-4.708-8.279-8.513-9.586"
                      transform="matrix(.63167 0 0 .63167 2.846 2.999)"
                      fill="#a7a7a7"
                    />
                  </svg>
                </div>
                <div className=" h-12 w-[calc(100%-40px)] flex flex-col justify-end ">
                  <div className="flex items-center justify-between">
                    <h4 className="text-[16px] font-medium leading-none">
                      #order_000001
                    </h4>
                    <p className="text-xs font-medium text-green-500">
                      1.59 PM
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-1">
                    <p className="text-sm text-gray-500 leading-none">
                      Paid ₹ 100
                    </p>
                    <div className="text-xs h-5 w-5 font-medium flex items-center justify-center rounded-full bg-green-500 text-white">
                      <span>
                        5
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div></div>
            </div>
          </>
        ))}
      </div>
    </ScrollArea>
  );
};

export default OrdersContainer;
