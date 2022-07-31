import { useState, useEffect, useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
);

const DataChart = ({ data }) => {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState({ datasets: [] });
  const [options, setOptions] = useState({ datasets: [] });

  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) {
      return;
    }

    // console.log({chart,data});

    const createGradientColor = (value) => {
      const ctx = chart.ctx;
      const chartArea = chart.chartArea;
      const scales = chart.scales;
      const gradient = ctx.createLinearGradient(0, 0, 0, chartArea.bottom);
      var shift = scales.y.getPixelForValue(value) / chartArea.bottom;

      if (shift > 1) {
        shift = 1;
      }

      gradient.addColorStop(0, "rgba(255, 245, 117, 1)");
      gradient.addColorStop(shift, "rgba(255, 245, 117, 1)");
      gradient.addColorStop(shift, "rgba(255,  127, 80, 1)");
      gradient.addColorStop(1, "rgba(255, 127, 80, 1)");

      return gradient;
    };

    const aboveGradient = (value) => {
      const ctx = chart.ctx;
      const chartArea = chart.chartArea;
      const scales = chart.scales;
      const yAxie = scales.y.getPixelForValue(value);
      const gradient = ctx.createLinearGradient(0, yAxie, 0, chartArea.top);

      gradient.addColorStop(0, "rgba(255, 245, 117, 0)");
      gradient.addColorStop(1, "rgba(255, 245, 117, 0.5)");

      return gradient;
    };

    const belowGradient = (value) => {
      const ctx = chart.ctx;
      const chartArea = chart.chartArea;
      const scales = chart.scales;
      const yAxie = scales.y.getPixelForValue(value);
      const gradient = ctx.createLinearGradient(0, yAxie, 0, chartArea.bottom);

      gradient.addColorStop(0, "rgba(255, 127, 80, 0)");
      gradient.addColorStop(1, "rgba(255, 127, 80, 0.5)");

      return gradient;
    };

    const title = (tooltipItems) => {
      const index = parseInt(tooltipItems[0].dataIndex);
      return (
        "ID: " +
        tooltipItems[0].label +
        "\nWallet: " +
        data.accounts[index].substring(0, 5) +
        "..." +
        data.accounts[index].substring(38, 42)
      );
    };

    const beforeFooter = (tooltipItems) => {
      const index = parseInt(tooltipItems[0].dataIndex);
      return "Usd Amount: " + data.usdAmounts[index];
    };

    const footer = (tooltipItems) => {
      const index = parseInt(tooltipItems[0].dataIndex);
      return "Matic Amount: " + data.maticAmounts[index];
    };

    const afterFooter = (tooltipItems) => {
      const index = parseInt(tooltipItems[0].dataIndex);
      const datas = tooltipItems[0].dataset.data;
      var result = "";

      if (index === 0 && datas[index] > 0) {
        result = "Win";
      } else {
        result = "Loss";
      }

      if (index > 0 && datas[index - 1] > datas[index]) {
        result = "Loss";
      }
      if (index > 0 && datas[index - 1] < datas[index]) {
        result = "Win";
      }

      return "Result: " + result;
    };

    setOptions({
      responsive: true,
      plugins: {
        tooltip: {
          backgroundColor: "#4d4763ec",
          mode: "index",
          intersect: false,
          callbacks: {
            title: title,
            beforeFooter: beforeFooter,
            footer: footer,
            afterFooter: afterFooter,
          },
        },
      },
      hover: {
        mode: "index",
        intersect: false,
      },
      scales: {
        x: {
          ticks: {
            beginAtZero: true,
            stepSize: 100,
          },

          grid: {
            display: false,
            drawBorder: false,
          },
        },
        y: {
          ticks: {
            type: "category",
            labelOffset: 35,
          },
          grid: {
            display: false,
            drawBorder: false,
          },
        },
      },
    });

    setChartData({
      labels: data.time,
      datasets: [
        {
          label: "Profit",
          data: data.profit,

          // point
          pointBackgroundColor: function (context) {
            return context.raw >= 0 ? "rgba(255, 245, 117, 1)" : "#ff7f50";
          },
          pointBorderColor: function (context) {
            return context.raw >= 0 ? "rgba(255, 245, 117, 1)" : "#ff7f50";
          },
          pointRadius: 2,
          pointHoverRadius: 5,

          // lines
          tension: 0,
          borderWidth: 2,
          fill: {
            target: {
              value: data.profit[0],
            },
            above: function (context) {
              return aboveGradient(context.dataset.data[0]);
            },
            below: function (context) {
              return belowGradient(context.dataset.data[0]);
            },
          },
          borderColor: function (context) {
            return createGradientColor(context.dataset.data[0]);
          },
        },
      ],
    });
  }, [data]);

  return <Line options={options} ref={chartRef} data={chartData} />;
};

export default DataChart;
