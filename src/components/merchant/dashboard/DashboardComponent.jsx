"use client";
import React, { useEffect, useState } from "react";
import Wrapper from "@/components/global/Wrapper";

import OrdersTable from "./OrdersTable";
import OrderFilter from "./Filter";
import { useCurrentUser } from "@/hooks/use-current-user";
import axios from "axios";
import { API_DOMAIN } from "@/lib/constants";
import mongoose from "mongoose";
import { toast } from "sonner";
import { fetchAccessToken } from "@/actions/access-token";
import { ClipLoader } from "react-spinners";

const DashboardComponent = () => {
  const { storeId } = useCurrentUser();
  if (!storeId) return null;
  const [Filterdata, setFilterData] = useState([]);
  const [originalData, setOriginalDate] = useState(Filterdata);
  const [isLoading, setisLoading] = useState(true);
  const fetchOrdersData = async () => {
    try {
      const { data } = await axios.get(
        `${API_DOMAIN}/api/v1/merchant/orders/dashboard/${storeId}`,
        {
          headers: {
            Authorization: `Bearer ${await fetchAccessToken()}`,
          },
        }
      );
      if (!data.success) {
        toast.error("failed to fetch the orders details");
        return;
      } else {
        setFilterData(data.data);
        setOriginalDate(data.data);
      }
    } catch (error) {
      toast.error("failed to fetch the orders details");
    } finally {
      setisLoading(false);
    }
  };
  useEffect(() => {
    if (mongoose.Types.ObjectId.isValid(storeId)) {
      fetchOrdersData();
    }
  }, [storeId]);
  return (
    <section className="min-h-screen w-full overflow-hidden">
      {isLoading ? (
        <div className="w-full h-screen flex items-center justify-center">
          <ClipLoader color="blue" size={40} />
        </div>
      ) : (
        <div className="w-full h-auto flex flex-col gap-0 ">
          <OrderFilter
            setFilterData={setFilterData}
            originalData={originalData}
          />
          <Wrapper>
            <OrdersTable data={Filterdata} />
          </Wrapper>
        </div>
      )}
    </section>
  );
};

export default DashboardComponent;
