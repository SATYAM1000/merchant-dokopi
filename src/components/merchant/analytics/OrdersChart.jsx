import React from "react";
import { Bar, Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import "chartjs-adapter-date-fns";

Chart.register(...registerables);

const OrdersChart = ({ data, filter = "today" }) => {
  const aggregateOrders = (data) => {
    return data.reduce((acc, item) => {
      const date = new Date(item.date).toLocaleDateString();
      if (!acc[date]) {
        acc[date] = 0;
      }
      acc[date] += item.orders;
      return acc;
    }, {});
  };

  const aggregateOrdersByHour = (data) => {
    const hourlyData = {};

    data.forEach((item) => {
      const date = new Date(item.date);
      const hour = date.getHours();
      const hourRange = `${hour}:00 - ${hour + 1}:00`;

      if (!hourlyData[hourRange]) {
        hourlyData[hourRange] = 0;
      }
      hourlyData[hourRange] += item.orders;
    });

    return hourlyData;
  };

  const gradientColor = "rgb(99, 102, 241)";

  let chartData;
  let ChartComponent;

  if (filter === "today" || filter === "yesterday") {
    ChartComponent = Bar;
    const hourlyData = aggregateOrdersByHour(data);
    chartData = {
      labels: Object.keys(hourlyData),
      datasets: [
        {
          label: "Orders",
          data: Object.values(hourlyData),
          backgroundColor: gradientColor,
          borderRadius: 5, // Decreased border radius for bars
          borderWidth: 0, // Remove bar border
          barPercentage: 0.6, // Adjust bar width within category space
          categoryPercentage: 0.6, // Adjust bar width within category space
          maxBarThickness: 40, // Max bar thickness
          minBarLength: 5, // Min bar length
        },
      ],
    };
  } else {
    const aggregatedData = aggregateOrders(data);
    ChartComponent = Bar;
    chartData = {
      labels: Object.keys(aggregatedData),
      datasets: [
        {
          label: "Orders",
          data: Object.values(aggregatedData),
          backgroundColor: gradientColor,
          borderRadius: 5, // Decreased border radius for bars
          borderWidth: 0, // Remove bar border
          barPercentage: 0.6, // Adjust bar width within category space
          categoryPercentage: 0.6, // Adjust bar width within category space
          maxBarThickness: 40, // Max bar thickness
          minBarLength: 5, // Min bar length
        },
      ],
    };
  }

  const options = {
    responsive: true,
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
        text: "Orders Over Time", // Chart title
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
    <div className="w-full h-auto p-6 border bg-white shadow-sm rounded-md flex flex-col gap-4">
      <p className="text-xl font-bold text-gray-900 ">Orders</p>

      <ChartComponent data={chartData} options={options} />
    </div>
  );
};

export default OrdersChart;
