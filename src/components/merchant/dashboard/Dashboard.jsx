"use client";
import React from "react";
import Header from "./Header";
import OrdersContainer from "./OrderContainer";
import UserInfoHeader from "./UserInfoHeader";
import DocumentInfo from "./Document";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Scroll } from "lucide-react";

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
);

const DashboardComponent = () => {
  return (
    <div className="w-full h-[calc(100vh-64px)] bg-gray-300 text-black/[0.90] overflow-hidden flex ">
      {/* ----------left-side----------------- */}
      <div className="w-1/4  h-full ">
        <div className="w-full h-full flex flex-col gap-4 px-6 py-4 bg-white border-r border-black/[0.30]">
          <Header />
          <OrdersContainer />
        </div>
      </div>

      {/* ----------right-side-------------------------- */}
      <div className="w-3/4 h-full bg-custom-image bg-contain bg-center flex flex-col">
        <UserInfoHeader />

        {/* --------------------documents-------------------- */}
        <div className="w-full h-full">
          <ScrollArea className="h-[calc(100vh-150px)] w-full rounded-md border bg-transparent text-black">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
              <DocumentInfo />
              <DocumentInfo />
              <DocumentInfo />
              <DocumentInfo />
              <DocumentInfo />
              <DocumentInfo />
              <DocumentInfo />
              <DocumentInfo />
              <DocumentInfo />
              <DocumentInfo />
              <DocumentInfo />
              <DocumentInfo />
              <DocumentInfo />
              <DocumentInfo />
              <DocumentInfo />
              <DocumentInfo />
              <DocumentInfo />
              <DocumentInfo />
              <DocumentInfo />
              <DocumentInfo />
              <DocumentInfo />
              <DocumentInfo />
              <DocumentInfo />
              <DocumentInfo />
              <DocumentInfo />
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default DashboardComponent;
