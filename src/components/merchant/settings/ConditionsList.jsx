'use client'
import React, { useEffect, useState } from "react";
import ConditionsTable from "./ConditionsTable";
import { useCurrentUser } from "@/hooks/use-current-user";
import { toast } from "sonner";
import axios from "axios";
import { API_DOMAIN } from "@/lib/constants";
import { fetchAccessToken } from "@/actions/access-token";

const ConditionsList = () => {
  const user = useCurrentUser();
  const [priceList, setpriceList] = useState([])
  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        `${API_DOMAIN}/api/v1/merchant/store/new-price-list/${user.storeId}`,
        {
          headers: {
            Authorization: `Bearer ${await fetchAccessToken()}`,
          },
        }
      );
      console.log(data);
      if (!data.success) {
        toast.error("Failed to fetch error");
        return
      }
      else {
        setpriceList(data.data.priceList)
      }
    } catch (error) {
      console.log("Error in fetching Prices", error);
      toast.error("Unable to fetch price list")
    }
  }
  useEffect(() => {
    fetchData()
  }, [])
  return (
    <section className="w-full bg-white h-fit px-6 py-6  ">
      <div>
        <h3 className="text-[#1A181E] font-medium">Conditions List</h3>
        <p className="text-[#808080] text-sm">
          Set the conditions for different items in your store.
        </p>
      </div>
      <div className="w-full">
        <ConditionsTable priceList={priceList} />
      </div>
    </section>
  );
};

export default ConditionsList;
