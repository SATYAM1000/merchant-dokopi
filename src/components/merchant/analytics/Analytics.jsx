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
import OrdersChart from "./OrdersChart";
import ChartsSkelton from "./ChartsSkelton";

const Analytics = () => {
  const currentUser = useCurrentUser();

  const [selectedOption, setSelectedOption] = useState({
    value: "today",
    label: "Today",
  });

  const [analyticsData, setAnalyticsData] = useState(null);
  const [dataToShow, setDataToShow] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setDataToShow(getDataToShow(selectedOption.value, analyticsData));
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

      setAnalyticsData(data);

      console.log(data.earningsChartData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalyticsData();
  }, [selectedOption]);

  return (
    <section className="w-full p-6 h-[calc(100vh-64px)] bg-white flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <p className="flex items-center ">
            <span className=" font-semibold">
              Hey 👋{currentUser?.name.split(" ")[0]}
            </span>
            <span className="font-medium text-black">
              &nbsp;- here's what's happening with your store today
            </span>
          </p>
          <FilterData
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-2 gap-6 md:gap-12">
          {dataToShow
            ? dataToShow.map((item, i) => <AnalyticsCard key={i} item={item} />)
            : Array.from({ length: 4 }).map((_, i) => (
              <AnalyticsCardSkelton key={i} />
            ))}
        </div>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        {analyticsData ? (
          <EarningsChart
            data={analyticsData?.earningsChartData}
            filter={selectedOption?.value}
          />
        ) : (
          <ChartsSkelton />
        )}

        {analyticsData ? (
          <OrdersChart
            data={analyticsData?.ordersChartData}
            filter={selectedOption?.value}
          />
        ) : (
          <ChartsSkelton />
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
    },
    {
      title: `${prefix} Orders`,
      value: analyticsData.totalOrders,
      change: `${analyticsData?.percentageChangeOrders.toFixed(1)}`,
      toolTipData: "This is your total order amount",
    },
    {
      title: `${prefix} Pages Printed`,
      value: analyticsData.totalPagesPrinted,
      change: `${analyticsData?.percentageChangePagesPrinted.toFixed(1)}`,
      toolTipData: "This is your total pages printed",
    },
    {
      title: `Last Settlement`,
      value: "N/A",
      change: `N/A`,
    },
  ];
}
