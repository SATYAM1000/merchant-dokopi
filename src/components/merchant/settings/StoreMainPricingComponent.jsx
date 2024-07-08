"use client";
import React from "react";
import StorePricing from "./StorePricing";
import ConditionsList from "./ConditionsList";
import { useCurrentUser } from "@/hooks/use-current-user";
import { toast } from "sonner";
import axios from "axios";
import { API_DOMAIN } from "@/lib/constants";
import { fetchAccessToken } from "@/actions/access-token";
import { ClipLoader } from "react-spinners";
import { useEffect, useState } from "react";

const StoreMainPricingComponent = () => {
  const user = useCurrentUser();
  const [priceList, setpriceList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isStorePricingListExist, setIsStorePricingListExist] = useState(true);
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `${API_DOMAIN}/api/v1/store/pricing/get/${user.storeId}`,
        {
          headers: {
            Authorization: `Bearer ${await fetchAccessToken()}`,
          },
        }
      );
      if (!data.success) {
        toast.error("Failed to fetch error");
        return;
      } else {
        setpriceList(data.data.priceList);
      }
    } catch (error) {
      console.log("Error in fetching Prices", error);
      if (
        error?.response?.status === 404 &&
        error?.response?.data?.code === "STORE_PRICING_NOT_FOUND"
      ) {
        setIsStorePricingListExist(false);
      }
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="w-full flex flex-col gap-8">
      <StorePricing priceList={priceList} setpriceList={setpriceList} isStorePricingListExist={isStorePricingListExist} setIsStorePricingListExist={setIsStorePricingListExist} />
      <ConditionsList
        priceList={priceList}
        setpriceList={setpriceList}
        isStorePricingListExist={isStorePricingListExist}
      />
    </div>
  );
};

export default StoreMainPricingComponent;
