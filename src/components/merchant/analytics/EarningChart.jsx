"use client";
import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
const EarningChart = () => {
  let data;
  let orderData;
  let earningsDataKey;
  let ordersDataKey;
  let xAxisKey;
  return (
    <>
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart
          data={orderData}
          margin={{
            top: 8,
            right: 28,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xAxisKey} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area
            type="linear"
            dataKey={earningsDataKey}
            stroke="#4378ee"
            fill="#4378ee"
            fillOpacity={0.3}
          />
        </AreaChart>
      </ResponsiveContainer>
    </>
  );
};

export default EarningChart;

const data = [
  { name: "May 28", "This Week": 0, "Last Week": 0 },
  { name: "May 29", "This Week": 25, "Last Week": 0 },
  { name: "May 30", "This Week": 10, "Last Week": 0 },
  { name: "May 31", "This Week": 5, "Last Week": 0 },
  { name: "Jun 01", "This Week": 20, "Last Week": 0 },
  { name: "Jun 02", "This Week": 30, "Last Week": 0 },
  { name: "Jun 03", "This Week": 0, "Last Week": 0 },
];

const dataDaily = [
  { name: "Day 1", orders: 12 },
  { name: "Day 2", orders: 18 },
  { name: "Day 3", orders: 10 },
  { name: "Day 4", orders: 14 },
  { name: "Day 5", orders: 20 },
  { name: "Day 6", orders: 15 },
  { name: "Day 7", orders: 22 },
];

const dataWeekly = [
  { name: "Week 1", orders: 70 },
  { name: "Week 2", orders: 80 },
  { name: "Week 3", orders: 90 },
  { name: "Week 4", orders: 100 },
];

const dataMonthly = [
  { name: "January", orders: 300 },
  { name: "February", orders: 280 },
  { name: "March", orders: 350 },
  { name: "April", orders: 400 },
  { name: "May", orders: 420 },
  { name: "June", orders: 390 },
  { name: "July", orders: 450 },
  { name: "August", orders: 470 },
  { name: "September", orders: 430 },
  { name: "October", orders: 480 },
  { name: "November", orders: 500 },
  { name: "December", orders: 520 },
];

const dailyOrderData = [
  { day: "Day 1", dailyOrders: 12, dailyEarnings: 120 },
  { day: "Day 2", dailyOrders: 18, dailyEarnings: 180 },
  { day: "Day 3", dailyOrders: 10, dailyEarnings: 100 },
  { day: "Day 4", dailyOrders: 14, dailyEarnings: 140 },
  { day: "Day 5", dailyOrders: 20, dailyEarnings: 200 },
  { day: "Day 6", dailyOrders: 15, dailyEarnings: 150 },
  { day: "Day 7", dailyOrders: 22, dailyEarnings: 220 },
];

const weeklyOrderData = [
  { week: "Week 1", weeklyOrders: 70, weeklyEarnings: 700 },
  { week: "Week 2", weeklyOrders: 80, weeklyEarnings: 800 },
  { week: "Week 3", weeklyOrders: 90, weeklyEarnings: 900 },
  { week: "Week 4", weeklyOrders: 100, weeklyEarnings: 1000 },
];

const monthlyOrderData = [
  { month: "January", monthlyOrders: 300, monthlyEarnings: 3000 },
  { month: "February", monthlyOrders: 280, monthlyEarnings: 2800 },
  { month: "March", monthlyOrders: 350, monthlyEarnings: 3500 },
  { month: "April", monthlyOrders: 400, monthlyEarnings: 4000 },
  { month: "May", monthlyOrders: 420, monthlyEarnings: 4200 },
  { month: "June", monthlyOrders: 390, monthlyEarnings: 3900 },
  { month: "July", monthlyOrders: 450, monthlyEarnings: 4500 },
  { month: "August", monthlyOrders: 470, monthlyEarnings: 4700 },
  { month: "September", monthlyOrders: 430, monthlyEarnings: 4300 },
  { month: "October", monthlyOrders: 480, monthlyEarnings: 4800 },
  { month: "November", monthlyOrders: 500, monthlyEarnings: 5000 },
  { month: "December", monthlyOrders: 520, monthlyEarnings: 5200 },
];
