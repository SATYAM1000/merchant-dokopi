import React from "react";
import { Bar, Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import "chartjs-adapter-date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OrdersChart from "./OrdersChart";

Chart.register(...registerables);

const EarningsChart = ({ data, ordersData, filter = "today" }) => {
  if(!data) return null;
  const aggregateEarnings = (data) => {
    return data.reduce((acc, item) => {
      const date = new Date(item.date).toLocaleDateString();
      if (!acc[date]) {
        acc[date] = 0;
      }
      acc[date] += item.earnings;
      return acc;
    }, {});
  };

  const aggregateEarningsByHour = (data) => {
    const hourlyData = {};
    data.forEach((item) => {
      const date = new Date(item.date);
      const hour = date.getHours();
      const hourRange = `${hour}:00 - ${hour + 1}:00`;
      if (!hourlyData[hourRange]) {
        hourlyData[hourRange] = 0;
      }
      hourlyData[hourRange] += item.earnings;
    });
    return hourlyData;
  };

  const gradientColor = "rgb(99, 102, 241)";

  let chartData;
  let ChartComponent;

  if (filter === "today" || filter === "yesterday") {
    ChartComponent = Line;
    const hourlyData = aggregateEarningsByHour(data);
    chartData = {
      labels: Object.keys(hourlyData),
      datasets: [
        {
          label: "Earnings",
          data: Object.values(hourlyData),
          backgroundColor: (context) => {
            const ctx = context.chart.ctx;
            const gradient = ctx.createLinearGradient(0, 0, 0, 400);
            gradient.addColorStop(0, gradientColor);
            gradient.addColorStop(1, "rgba(99, 102, 241, 0)");
            return gradient;
          },
          borderColor: gradientColor,
          borderWidth: 2, // Line width
          fill: true, // Fill the area under the line
          tension: 0, // Smoothing of the line
        },
      ],
    };
  } else {
    const aggregatedData = aggregateEarnings(data);
    ChartComponent = Line;
    chartData = {
      labels: Object.keys(aggregatedData),
      datasets: [
        {
          label: "Earnings",
          data: Object.values(aggregatedData),
          backgroundColor: (context) => {
            const ctx = context.chart.ctx;
            const gradient = ctx.createLinearGradient(0, 0, 0, 400);
            gradient.addColorStop(0, gradientColor);
            gradient.addColorStop(1, "rgba(99, 102, 241, 0)");
            return gradient;
          },
          borderColor: gradientColor,
          borderWidth: 2, // Line width
          fill: true, // Fill the area under the line
          tension: 0, // Smoothing of the line
        },
      ],
    };
  }

  const options = {
    responsive: true,

    maintainAspectRatio: true,

    plugins: {
      legend: {
        display: false,
        position: "top", // Position the legend at the top
        labels: {
          color: "black", // Color of legend labels
          font: {
            size: 14, // Font size of legend labels
          },
        },
      },
      title: {
        display: false,
        position: "top",
        text: "Earnings Over Time", // Chart title
        color: "black", // Title color
        font: {
          size: 16, // Font size of title
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: gradientColor, // Tooltip background color
        titleColor: "#fff", // Tooltip title color
        bodyColor: "#fff", // Tooltip body color
        borderColor: gradientColor, // Tooltip border color
        borderWidth: 1, // Tooltip border width
      },
    },
    scales: {
      x: {
        type: "category",
        ticks: {
          color: "#7f7f7f", // X-axis tick color
          font: {
            size: 12, // Font size of x-axis ticks
          },
        },
        grid: {
          color: "rgba(0, 0, 0, 0.1)", // X-axis grid line color
          borderDash: [5, 5], // Make X-axis grid lines dashed
          drawBorder: false, // Optionally, remove the axis line
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: "#7f7f7f", // Y-axis tick color
          font: {
            size: 12, // Font size of y-axis ticks
          },
        },
        grid: {
          color: "rgba(0, 0, 0, 0.1)", // Y-axis grid line color
          borderDash: [5, 5], // Make Y-axis grid lines dashed
          drawBorder: false, // Optionally, remove the axis line
        },
      },
    },
  };

  return (
    <div className="w-full lg:w-3/5 h-auto px-6 pt-6 border bg-white shadow-sm rounded-md flex flex-col gap-4">
      <Tabs defaultValue="earnings" className="w-full">
        <TabsList>
          <TabsTrigger value="earnings">Earnings</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
        </TabsList>
        <TabsContent value="earnings">
          <div className="w-full h-full mt-4">
            <ChartComponent data={chartData} options={options} />
          </div>
        </TabsContent>
        <TabsContent value="orders">
          <OrdersChart data={ordersData} filter={filter} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EarningsChart;
