"use client";
import React, { useEffect, useState } from "react";
import Wrapper from "@/components/global/Wrapper";

import OrdersTable from "./OrdersTable";
import OverviewComponentContainer from "./OverviewComponentContainer";
import OrderFilter from "./Filter";
import { useCurrentUser } from "@/hooks/use-current-user";
import axios from "axios";
import { API_DOMAIN } from "@/lib/constants";
import mongoose from "mongoose";
import { toast } from "sonner";
import { fetchAccessToken } from "@/actions/access-token";
import TableSkeleton from "./TableSkeleton";

const DashboardComponent = () => {
  const { storeId } = useCurrentUser();
  const [data, setData] = useState([])
  const [isLoading, setisLoading] = useState(false)
  const fetchOrdersData = async () => {
    try {
      const { data } = await axios.get(`${API_DOMAIN}/api/v1/merchant/orders/dashboard/${storeId}`, {
        headers: {
          Authorization: `Bearer ${await fetchAccessToken()
            }`
        }
      })
      if (!data.success) {
        toast.error("failed to fetch the orders details")
        return;
      }
      else {
        setData(data.data)
        console.log(data.data)
      }
    } catch (error) {
      toast.error("failed to fetch the orders details")
    } finally {
      setisLoading(true)
    }
  }
  useEffect(() => {
    if (mongoose.Types.ObjectId.isValid(storeId)) {
      fetchOrdersData()
    }

  }, [storeId])
  return (
    <section className="min-h-[calc(100vh-64px)] w-full">
      <div className="w-full h-auto flex flex-col gap-0 ">
        <div
          className={`w- full flex items - center mb - 6 justify - between bg - gray - 100 px - 6 py - 4 border - b`}
        >
          <OverviewComponentContainer />
        </div>
        <OrderFilter setData={setData} data={data} />
        <Wrapper>
          {
            isLoading ? <OrdersTable data={data} /> : <TableSkeleton />
          }

        </Wrapper>
      </div>
    </section>
  );
};

export default DashboardComponent;
