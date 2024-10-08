"use client";
import { useCurrentUser } from "@/hooks/use-current-user";
import React, { useEffect, useState } from "react";

import AnalyticsCard from "./AnalyticsCard";
import FilterData from "./FilterData";
import axios from "axios";
import { fetchAccessToken } from "@/actions/access-token";
import { API_DOMAIN } from "@/lib/constants";
import AnalyticsCardSkelton from "./AnalyticsCardSkelton";
import EarningsChart from "./EarningsChart";
import ChartsSkelton from "./ChartsSkelton";
import { IndianRupee, ListOrdered, Notebook } from "lucide-react";
import BalanceCard from "./BalanceCard";
import SettlementsCard from "./SettlementsCard";
import SettlementsCardSkelton from "./SettlementsCardSkelton";
import { toast } from "sonner";

const Analytics = () => {
  const currentUser = useCurrentUser();

  if (!currentUser?.storeId) return null;

  const [selectedOption, setSelectedOption] = useState({
    value: "thismonth",
    label: "This Month",
  });

  const [analyticsData, setAnalyticsData] = useState(null);
  const [dataToShow, setDataToShow] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setDataToShow(getDataToShow(selectedOption.value, analyticsData));
    console.log("data to show is ", analyticsData);
  }, [selectedOption, analyticsData]);

  const fetchAnalyticsData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${API_DOMAIN}/api/v1/chart/analytics/${currentUser.storeId}/${selectedOption.value}`,
        {
          headers: {
            Authorization: `Bearer ${await fetchAccessToken()}`,
          },
        }
      );

      console.log("fetched data is ", data);

      setAnalyticsData(data);
    } catch (error) {
      console.log("error while fetchinf orders ", error);
      toast.error(error?.response?.data?.msg || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalyticsData();
  }, [selectedOption]);

  return (
    <section className="w-full p-4 h-full bg-[#f5f5f5] flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-end md:justify-between">
          <p className=" hidden md:flex items-center ">
            <span className=" font-semibold">
              👋 Hey {currentUser?.name.split(" ")[0]}
            </span>
            <span className=" text-gray-600">
              &nbsp;- here's what's happening with your store today
            </span>
          </p>
          <FilterData
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-2 gap-6 md:gap-12">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <AnalyticsCardSkelton key={i} />
            ))
          ) : (
            <>
              {dataToShow &&
                dataToShow.map((item, i) => (
                  <AnalyticsCard key={i} item={item} />
                ))}
              <BalanceCard />
            </>
          )}
        </div>
      </div>

      <div className="w-full h-full overflow-hidden  flex flex-col lg:flex-row gap-6">
        {loading && !analyticsData ? (
          <ChartsSkelton />
        ) : (
          <EarningsChart data={analyticsData?.earningsChartData} ordersData={analyticsData?.ordersChartData} filter="thismonth" />
        )}

        {loading ? (
          <SettlementsCardSkelton />
        ) : (
          analyticsData && <SettlementsCard />
        )}
      </div>
    </section>
  );
};

export default Analytics;

function getDataToShow(selectedOption, analyticsData) {
  if (!analyticsData) return null;

  const timePeriods = {
    today: "Today's",
    yesterday: "Yesterday's",
    thisweek: "Week's",
    thismonth: "Month's",
    year: "Year's",
  };

  const prefix = timePeriods[selectedOption];

  if (!prefix) return null;

  return [
    {
      title: `${prefix} Earning`,
      value: `₹ ${analyticsData.totalEarnings}`,
      change: `${analyticsData?.percentageChangeEarnings.toFixed(1)}`,
      toolTipData: "This is your total earning amount",
      image: "/analytics/earning.svg",
      icon: <IndianRupee className="w-5 h-5" />,
    },
    {
      title: `${prefix} Orders`,
      value: analyticsData.totalOrders,
      change: `${analyticsData?.percentageChangeOrders.toFixed(1)}`,
      toolTipData: "This is your total order amount",
      image: "/analytics/orders.svg",
      icon: <ListOrdered className="w-5 h-5" />,
    },
    {
      title: `${prefix} Pages Printed`,
      value: analyticsData.totalPagesPrinted,
      change: `${analyticsData?.percentageChangePagesPrinted.toFixed(1)}`,
      toolTipData: "This is your total pages printed",
      image: "/analytics/page.svg",
      icon: <Notebook className="w-5 h-5" />,
    },
  ];
}
