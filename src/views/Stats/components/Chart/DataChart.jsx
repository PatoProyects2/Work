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

    ChartJS.register(
      CategoryScale,
      LinearScale,
      PointElement,
      LineElement,
      Tooltip,
      Filler
    );

    // Linea de puntos del valor 0
    // ChartJS.register({
    //   id: "dottedLine",
    //   beforeDatasetsDraw(chart) {
    //     const ctx = chart.canvas.getContext("2d");
    //     const chartArea = chart.chartArea;
    //     const scales = chart.scales;

    //     try {
    //       const startingPoint = 0;
    //       const yAxie = scales.y.getPixelForValue(0);

    //       // Linea de puntos
    //       ctx.save();
    //       ctx.beginPath();
    //       ctx.lineWidth = 1;
    //       ctx.setLineDash([1, 5]);
    //       ctx.strokeStyle = "rgba(102,102,102,1)";
    //       ctx.moveTo(chartArea.left, yAxie);
    //       ctx.lineTo(chartArea.right, yAxie);
    //       ctx.stroke();
    //       ctx.stroke();
    //       ctx.closePath();
    //       ctx.setLineDash([]);

    //       // Rectángulo
    //       ctx.beginPath();
    //       ctx.fillStyle = "rgba(102,102,102,1)";
    //       ctx.fillRect(0, yAxie - 15, chartArea.left, 20);
    //       ctx.closePath();

    //       // Texto dentro del rectángulo
    //       ctx.font = "10px sans-serif";
    //       ctx.fillStyle = "white";
    //       ctx.textBaseLine = "middle";
    //       ctx.textAlign = "center";
    //       ctx.fillText(startingPoint, chartArea.left / 2, yAxie);
    //     } catch (err) {}
    //   },
    // });

    const createGradientColor = (value) => {
      var ctx = chart.ctx;
      var chartArea = chart.chartArea;
      var scales = chart.scales;

      var gradient = ctx.createLinearGradient(0, 0, 0, chartArea.bottom);
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

    // const crosshairLine = (mousemove) => {
    //   const ctx = chart.ctx;
    //   const chartArea = chart.chartArea;
    //   const canvas = chart.canvas;

    //   const coorX = mousemove.offsetX;
    //   const coorY = mousemove.offsetY;

    //   chart.update("none");
    //   ctx.restore();

    //   if (
    //     coorX >= chartArea.left &&
    //     coorX <= chartArea.right &&
    //     coorY >= chartArea.top &&
    //     coorY <= chartArea.bottom
    //   ) {
    //     canvas.style.cursor = "crosshair";
    //   } else {
    //     canvas.style.cursor = "default";
    //   }

    //   // Dot line
    //   ctx.lineWidth = 1;
    //   ctx.strokeStyle = "#666";
    //   ctx.setLineDash([3, 3]);

    //   if (
    //     coorX >= chartArea.left &&
    //     coorX <= chartArea.right &&
    //     coorY >= chartArea.top &&
    //     coorY <= chartArea.bottom
    //   ) {
    //     // Horizontal line
    //     ctx.beginPath();
    //     ctx.moveTo(chartArea.left, coorY);
    //     ctx.lineTo(chartArea.right, coorY);
    //     ctx.stroke();
    //     ctx.closePath();

    //     // Vertical line
    //     ctx.beginPath();
    //     ctx.moveTo(coorX, chartArea.top);
    //     ctx.lineTo(coorX, chartArea.bottom);
    //     ctx.stroke();
    //     ctx.closePath();

    //     crosshairLabel(coorX, coorY);
    //     // crossHairPoint(coorX);
    //   }
    // };

    // chart.canvas.addEventListener("mousemove", (e) => {
    //   crosshairLine(e);
    // });

    // const crosshairLabel = (coorX, coorY) => {
    //   const ctx = chart.ctx;
    //   const chartArea = chart.chartArea;
    //   const scales = chart.scales;
    //   const labels = chart.data.labels;

    //   try {
    //     const xData = labels[scales.x.getValueForPixel(coorX)];
    //     const textWidth = ctx.measureText(xData).width + 15;

    //     // Label
    //     ctx.font = "10px sans-serif";
    //     ctx.textBaseLine = "middle";
    //     ctx.textAlign = "center";

    //     // yLabel
    //     ctx.beginPath();
    //     ctx.fillStyle = "rgba(132,132,132,1)";
    //     ctx.fillRect(0, coorY - 15, chartArea.left, 20);
    //     ctx.closePath();

    //     ctx.fillStyle = "white";
    //     ctx.fillText(
    //       scales.y.getValueForPixel(coorY).toFixed(2),
    //       chartArea.left / 2,
    //       coorY
    //     );

    //     // xLabel
    //     ctx.beginPath();
    //     ctx.fillStyle = "rgba(132,132,132,1)";
    //     ctx.fillRect(coorX - textWidth / 2, chartArea.bottom, textWidth, 20);
    //     ctx.closePath();

    //     ctx.fillStyle = "white";
    //     ctx.fillText(xData, coorX, chartArea.bottom + 15);
    //   } catch (err) {}
    // };

    // const crossHairPoint = (coorX) => {
    //   const ctx = chart.ctx;
    //   const chartArea = chart.chartArea;
    //   const scales = chart.scales;

    //   try {
    //     const data = chart.data.datasets[0].data;
    //     const labels = chart.data.labels;

    //     ctx.beginPath();
    //     ctx.strokeStyle = "#fff";
    //     ctx.lineWidth = 3;
    //     ctx.setLineDash([]);

    //     const angle = Math.PI / 180;
    //     const yOpening = scales.y.getPixelForValue(data[0]);
    //     if (scales.x._gridLineItems) {
    //       const segments = scales.x._gridLineItems.length - 1;
    //       for (let i = 0; i < segments; i++) {
    //         if (
    //           coorX >= scales.x._gridLineItems[i].tx1 &&
    //           coorX <= scales.x._gridLineItems[i + 1].tx1
    //         ) {
    //           let yStart = scales.y.getPixelForValue(data[i]);
    //           let yEnd = scales.y.getPixelForValue(data[i + 1]);

    //           let yInterpolation =
    //             yStart +
    //             ((yEnd - yStart) / (chartArea.width / segments)) *
    //               (coorX - scales.x._gridLineItems[i].tx1);

    //           if (yOpening >= yInterpolation) {
    //             ctx.fillStyle = "rgba(255, 245, 117, 1)";
    //           } else {
    //             ctx.fillStyle = "rgba(255, 127, 80, 1)";
    //           }

    //           ctx.arc(coorX, yInterpolation, 5, angle * 0, angle * 360, false);
    //           ctx.fill();
    //           ctx.stroke();
    //         }
    //       }
    //     }
    //   } catch (err) {}
    // };

    setOptions({
      responsive: true,
      tooltips: {
        mode: "index",
        intersect: false,
      },
      hover: {
        mode: "index",
        intersect: false,
      },
      scales: {
        x: {
          min: data.time,
          max: data.time[data.time.length - 1],
          grid: {
            display: false,
            drawBorder: false,
          },
        },
        y: {
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
          pointBackgroundColor: function (context) {
            return context.raw > 0 ? "rgba(255, 245, 117, 1)" : "#ff7f50";
          },
          pointBorderColor: function (context) {
            return context.raw > 0 ? "rgba(255, 245, 117, 1)" : "#ff7f50";
          },
          pointRadius: 3,
          pointHoverRadius: 5,
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
          tension: 0,
        },
      ],
    });

  }, [data]);

  return <Line options={options} ref={chartRef} data={chartData} />;
};

export default DataChart;
