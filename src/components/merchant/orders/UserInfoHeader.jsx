"use client";
import React from "react";

const UserInfoHeader = () => {
  return (
    <section className="w-full min-h-20 bg-[#fff] p-4 flex items-center gap-6 border-b border-black/[0.15]">
      <div className="h-14 w-14 rounded-full bg-gray-200 p-2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22">
          <path
            d="m16.428 15.744c-.159-.052-1.164-.505-.536-2.414h-.009c1.637-1.686 2.888-4.399 2.888-7.07 0-4.107-2.731-6.26-5.905-6.26-3.176 0-5.892 2.152-5.892 6.26 0 2.682 1.244 5.406 2.891 7.088.642 1.684-.506 2.309-.746 2.396-2.238.724-8.325 4.332-8.229 9.586h24.05c.107-5.02-4.708-8.279-8.513-9.586"
            transform="matrix(.63167 0 0 .63167 2.846 2.999)"
            fill="#a7a7a7"
          />
        </svg>
      </div>
      <div className="flex w-full justify-between">
        <div className="text-xl font-semibold">#order_000001</div>
        <div className="text-sm cursor-pointer underline underline-offset-4">Invoice</div>
      </div>
    </section>
  );
};

export default UserInfoHeader;
