"use client";
import React from "react";
import Wrapper from "@/components/global/Wrapper";

import OverviewComponentContainer from "./OverviewComponentContainer";
import OrderFilter from "./OrderFilter";
import OrdersTable from "./OrdersTable";

const Orders = () => {
  return (
    <section className="min-h-[calc(100vh-64px)] w-full">
      <div className="w-full h-auto flex flex-col gap-0 ">
        <div
          className={`w-full flex items-center mb-6 justify-between bg-gray-100 px-6 py-4 border-b`}
        >
          <OverviewComponentContainer />
        </div>
        <OrderFilter />

        <Wrapper>
          {/* ----container---------- */}
          <OrdersTable />
        </Wrapper>
      </div>
    </section>
  );
};

export default Orders;
