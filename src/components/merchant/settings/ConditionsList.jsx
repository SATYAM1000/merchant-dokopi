"use client";
import React, { useEffect, useState } from "react";
import ConditionsTable from "./ConditionsTable";
import { useCurrentUser } from "@/hooks/use-current-user";
import { toast } from "sonner";
import axios from "axios";
import { API_DOMAIN } from "@/lib/constants";
import { fetchAccessToken } from "@/actions/access-token";
import { ClipLoader } from "react-spinners";

const ConditionsList = () => {
  const user = useCurrentUser();
  const [priceList, setpriceList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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
      console.log("store pricing condiitons are ", data.data.priceList);
      if (!data.success) {
        toast.error("Failed to fetch error");
        return;
      } else {
        setpriceList(data.data.priceList);
      }
    } catch (error) {
      console.log("Error in fetching Prices", error);
      toast.error("Unable to fetch price list");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <section className="w-full bg-white h-fit px-6 py-6  ">
      {isLoading ? (
        <div className="w-full h-[50vh] flex justify-center items-center">
          <ClipLoader color="blue" size={40} />
        </div>
      ) : (
        <>
          <div>
            <h3 className="text-[#1A181E] font-medium">Conditions List</h3>
            <p className="text-[#808080] text-sm">
              Set the conditions for different items in your store.
            </p>
          </div>
          <div className="w-full">
            <ConditionsTable priceList={priceList} />
          </div>
        </>
      )}
    </section>
  );
};

export default ConditionsList;
