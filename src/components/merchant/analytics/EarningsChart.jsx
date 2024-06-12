import React from "react";
import { Bar, Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import "chartjs-adapter-date-fns";

Chart.register(...registerables);

const EarningsChart = ({ data, filter = "today" }) => {
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

    data.forEach(item => {
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

  const gradientColor = "rgb(37, 99, 235)";

  let chartData;
  let ChartComponent;

  if (filter === "today" || filter === "yesterday") {
    ChartComponent = Bar;
    const hourlyData = aggregateEarningsByHour(data);
    chartData = {
      labels: Object.keys(hourlyData),
      datasets: [
        {
          label: "Earnings",
          data: Object.values(hourlyData),
          backgroundColor: gradientColor,
          borderWidth: 0, // Remove bar border
          barPercentage: 0.6, // Adjust bar width within category space
          categoryPercentage: 0.6, // Adjust bar width within category space
          maxBarThickness: 60, // Max bar thickness
          minBarLength: 2, // Min bar length
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
            gradient.addColorStop(1, "rgba(37, 99, 235, 0)");
            return gradient;
          },
          borderColor: gradientColor,
          borderWidth: 2, // Line width
          fill: false, // Fill the area under the line
          tension: 0, // Smoothing of the line
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
          color: "black", // X-axis tick color
          font: {
            size: 12, // Font size of x-axis ticks
          },
        },
        grid: {
          color: "rgba(0, 0, 0, 0.1)", // X-axis grid line color
          borderDash: [5, 5], // Make X-axis grid lines dashed
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: "black", // Y-axis tick color
          font: {
            size: 12, // Font size of y-axis ticks
          },
        },
        grid: {
          color: "rgba(0, 0, 0, 0.1)", // Y-axis grid line color
          borderDash: [5, 5], // Make Y-axis grid lines dashed
        },
      },
    },
  };

  return (
    <div className="w-full h-auto p-6 border bg-white shadow-sm rounded-md flex flex-col gap-4">
      <p>
        <b>Earnings</b>
      </p>
      <ChartComponent data={chartData} options={options} />
    </div>
  );
};

export default EarningsChart;
