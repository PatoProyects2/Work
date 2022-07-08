import { useState, useEffect, useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
  TimeScale,
} from "chart.js";
import { Line } from "react-chartjs-2";

// ChartJS.register({
//   id: "custom_canvas_background_color",
//   beforeDraw: (chart) => {
//     const ctx = chart.canvas.getContext("2d");
//     ctx.save();
//     ctx.globalCompositeOperation = "destination-over";
//     ctx.fillStyle = "lightGreen";
//     ctx.fillRect(0, 0, chart.width, chart.height);
//     ctx.restore();
//   },
// });

const DataChart = ({ data }) => {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState({ datasets: [] });
  const [options, setOptions] = useState({ datasets: [] });

  useEffect(() => {
    // console.log(data);
    ChartJS.register(
      CategoryScale,
      LinearScale,
      PointElement,
      LineElement,
      Tooltip,
      Filler,
      TimeScale
    );

    // Linea de puntos del valor 0
    ChartJS.register({
      id: "dottedLine",
      beforeDatasetsDraw(chart) {
        const ctx = chart.canvas.getContext("2d");
        const chartArea = chart.chartArea;
        const scales = chart.scales;

        const startingPoint = 0;
        const yAxie = scales.y.getPixelForValue(startingPoint);

        // Linea de puntos
        ctx.save();
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.setLineDash([1, 5]);
        ctx.strokeStyle = "rgba(102,102,102,1)";
        ctx.moveTo(chartArea.left, yAxie);
        ctx.lineTo(chartArea.right, yAxie);
        ctx.stroke();
        ctx.stroke();
        ctx.closePath();
        ctx.setLineDash([]);

        // Rectángulo
        ctx.beginPath();
        ctx.fillStyle = "rgba(102,102,102,1)";
        ctx.fillRect(0, yAxie - 15, chartArea.left, 20);
        ctx.closePath();

        // Texto dentro del rectángulo
        ctx.font = "12px sans-serif";
        ctx.fillStyle = "white";
        ctx.textBaseLine = "middle";
        ctx.textAlign = "center";
        ctx.fillText(startingPoint, chartArea.left / 2, yAxie);
      },
    });

    const chart = chartRef.current;
    if (!chart) {
      return;
    }
    // console.log(chart);

    setOptions({
      fill: true,
      responsive: true,
      showScale: true,
      pointDot: true,
      showLines: false,
      layout: {
        padding: {
          left: 5,
        },
      },
      scales: {
        x: {
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
      gradient.addColorStop(shift, "rgba(255, 107, 107, 1)");
      gradient.addColorStop(1, "rgba(255, 107, 107, 1)");

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

    const crosshairLine = (mousemove) => {
      const ctx = chart.ctx;
      const chartArea = chart.chartArea;
      const canvas = chart.canvas;

      const coorX = mousemove.offsetX;
      const coorY = mousemove.offsetY;

      chart.update("none");
      ctx.restore();

      if (
        coorX >= chartArea.left &&
        coorX <= chartArea.right &&
        coorY >= chartArea.top &&
        coorY <= chartArea.bottom
      ) {
        canvas.style.cursor = "crosshair";
      } else {
        canvas.style.cursor = "default";
      }

      // Dot line
      ctx.lineWidth = 1;
      ctx.strokeStyle = "#666";
      ctx.setLineDash([3, 3]);

      if (
        coorX >= chartArea.left &&
        coorX <= chartArea.right &&
        coorY >= chartArea.top &&
        coorY <= chartArea.bottom
      ) {
        // Horizontal line
        ctx.beginPath();
        ctx.moveTo(chartArea.left, coorY);
        ctx.lineTo(chartArea.right, coorY);
        ctx.stroke();
        ctx.closePath();

        // Vertical line
        ctx.beginPath();
        ctx.moveTo(coorX, chartArea.top);
        ctx.lineTo(coorX, chartArea.bottom);
        ctx.stroke();
        ctx.closePath();

        crosshairLabel(coorX, coorY);
        crossHairPoint(coorX);
      }
    };

    chart.canvas.addEventListener("mousemove", (e) => {
      crosshairLine(e);
    });

    const crosshairLabel = (coorX, coorY) => {
      const ctx = chart.ctx;
      const chartArea = chart.chartArea;
      const scales = chart.scales;
      const labels = chart.data.labels;

      const xData = labels[scales.x.getValueForPixel(coorX)];
      const textWidth = ctx.measureText(xData).width + 15;

      // Label
      ctx.font = "12px sans-serif";
      ctx.textBaseLine = "middle";
      ctx.textAlign = "center";

      // yLabel
      ctx.beginPath();
      ctx.fillStyle = "rgba(132,132,132,1)";
      ctx.fillRect(0, coorY - 15, chartArea.left, 20);
      ctx.closePath();

      ctx.fillStyle = "white";
      ctx.fillText(
        scales.y.getValueForPixel(coorY).toFixed(2),
        chartArea.left / 2,
        coorY
      );

      // xLabel
      ctx.beginPath();
      ctx.fillStyle = "rgba(132,132,132,1)";
      ctx.fillRect(coorX - textWidth / 2, chartArea.bottom, textWidth, 20);
      ctx.closePath();

      ctx.fillStyle = "white";
      ctx.fillText(xData, coorX, chartArea.bottom + 15);
    };

    const crossHairPoint = (coorX) => {
      const ctx = chart.ctx;
      const chartArea = chart.chartArea;
      const scales = chart.scales;
      const data = chart.data.datasets[0].data;
      const labels = chart.data.labels;

      ctx.beginPath();
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 3;
      ctx.setLineDash([]);

      // const angle = Math.PI / 180;
      // const yOpening = scales.y.getPixelForValue(data[0][1]);
      // const segments = chartArea.width / (labels.length - 1);
      // const index = Math.floor((coorX - chartArea.left) / segments);
      // const yStart = scales.y.getPixelForValue(data[index][1]);
      // const yEnd = scales.y.getPixelForValue(data[index + 1][1]);

      // const yInterpolation =
      //   yStart +
      //   ((yEnd - yStart) / segments) *
      //     (coorX - scales.x.getPixelForValue(labels[index]));

      // if (yOpening >= yInterpolation) {
      //   ctx.fillStyle = "rgba(255, 245, 117, 1)";
      // } else {
      //   ctx.fillStyle = "rgba(255, 107, 107, 1)";
      // }

      // // Draw the circle
      // ctx.arc(coorX, yInterpolation, 5, angle * 0, angle * 360, false);
      // ctx.fill();
      // ctx.stroke();

      const angle = Math.PI / 180;
      const yOpening = scales.y.getPixelForValue(data[0][1]);
      if (scales.x._gridLineItems) {
        const segments = scales.x._gridLineItems.length - 1;
        for (let i = 0; i < segments; i++) {
          if (
            coorX >= scales.x._gridLineItems[i].tx1 &&
            coorX <= scales.x._gridLineItems[i + 1].tx1
          ) {
            let yStart = scales.y.getPixelForValue(data[i][1]);
            let yEnd = scales.y.getPixelForValue(data[i + 1][1]);

            let yInterpolation =
              yStart +
              ((yEnd - yStart) / (chartArea.width / segments)) *
                (coorX - scales.x._gridLineItems[i].tx1);

            if (yOpening >= yInterpolation) {
              ctx.fillStyle = "rgba(255, 245, 117, 1)";
            } else {
              ctx.fillStyle = "rgba(255, 127, 80, 1)";
            }

            ctx.arc(coorX, yInterpolation, 5, angle * 0, angle * 360, false);
            ctx.fill();
            ctx.stroke();
          }
        }
      }
    };

    // const zoom = (mousewheel) => {
    //   const scaleConfig = chart.config.options.scales;
    //   const xMin = scaleConfig.x.min;
    //   const xMax = scaleConfig.x.max;
    //   const wheelValue = mousewheel.wheelDeltaY;

    //   if (wheelValue >= 0) {
    //     scaleConfig.x.min = data.time[data.time.indexOf(xMin) + 1];
    //     scaleConfig.x.min = data.time[data.time.indexOf(xMax) - 1];
    //   }

    //   if (wheelValue < 0) {
    //     scaleConfig.x.min = data.time[data.time.indexOf(xMin) - 1];
    //     scaleConfig.x.min = data.time[data.time.indexOf(xMax) + 1];
    //   }

    //   if (data.time[data.time.indexOf(xMin)] <= 0) {
    //     scaleConfig.x.min = data.time[0];
    //   }

    //   if (
    //     data.time[data.time.indexOf(xMax)] >= data.time[data.time.length - 1]
    //   ) {
    //     scaleConfig.x.max = data.time[date.time.length - 1];
    //   }
    // };

    // chart.canvas.addEventListener("mousewheel", (e) => {
    //   zoom(e);
    // });

    setChartData({
      labels: data.time,
      datasets: [
        {
          data: data.profit,
          pointBackgroundColor: function (context) {
            return context.raw[1] > 0
              ? "rgba(255, 245, 117, 1)"
              : "rgba(255, 107, 107, 1)";
          },
          pointBorderColor: function (context) {
            return context.raw[1] > 0
              ? "rgba(255, 245, 117, 1)"
              : "rgba(255, 107, 107, 1)";
          },
          pointRadius: 0,
          pointHitRadius: 0,
          pointHoverRadius: 0,
          borderWidth: 2,
          fill: {
            target: {
              value: data.profit[0][1],
            },
            above: function (context) {
              return aboveGradient(context.dataset.data[0][1]);
            },
            below: function (context) {
              return belowGradient(context.dataset.data[0][1]);
            },
          },
          // segment: {
          //   borderColor: function (context) {
          //     if (context.type === "segment") {
          //       return context.p1.raw[1] > 0
          //         ? "rgba(255, 245, 117, 0.5)"
          //         : "rgba(255, 107, 107, 0.5)";
          //     }
          //   },
          //   backgroundColor: function (context) {
          //     if (context.type === "segment") {
          //       return createGradientColor(
          //         context.p1.raw[1] > 0
          //           ? "rgba(255, 245, 117, 0.5)"
          //           : "rgba(255, 107, 107, 0.5)"
          //       );
          //     }
          //   },
          // },
          borderColor: function (context) {
            return createGradientColor(context.dataset.data[0][1]);
          },
          tension: 0,
        },
      ],
    });

    return () => {
      chart.canvas.removeEventListener("mousemove", (e) => {
        crosshairLine(e);
      });
      // chart.canvas.removeEventListener("mousewheel", (e) => {
      //   zoom(e);
      // });
    };
  }, []);

  return <Line options={options} ref={chartRef} data={chartData} />;
};

export default DataChart;
