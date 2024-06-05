"use client";
import React from "react";
import { BarChart, Bar } from "recharts";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const OrderChart = () => {
  let data;
  let orderData;
  let earningsDataKey;
  let ordersDataKey;
  let xAxisKey;
  return (
    <>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          margin={{
            top: 8,
            right: 28,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Orders" fill="#4378ee" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default OrderChart;


