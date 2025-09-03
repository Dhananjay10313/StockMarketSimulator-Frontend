// PortfolioLineChartInCard.jsx
import React, { useMemo } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  TimeScale,
  Tooltip,
  Filler,
  Legend,
  Title,
} from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";
import "chartjs-adapter-date-fns";
import "./chart-card.css";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  TimeScale,
  Tooltip,
  Filler,
  Legend,
  Title,
  zoomPlugin
);

export default function PortfolioLineChartInCard({ points = [] }) {
  const data = useMemo(
    () => ({
      datasets: [
        {
          label: "Portfolio value",
          data: points.map((p) => ({ x: p.t, y: p.v })),
          borderColor: "#16a34a",
          backgroundColor: "rgba(22,163,74,0.15)",
          fill: true,
          borderWidth: 2,
          pointRadius: 0,
          tension: 0.35,
        },
      ],
    }),
    [points]
  );

  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: "Portfolio value",
          align: "start",
          color: "#0f172a",
          font: { weight: "800", size: 16 },
          padding: { bottom: 6 },
        },
        tooltip: { intersect: false, mode: "index" },
        legend: { display: false },
        zoom: {
          zoom: { wheel: { enabled: true }, pinch: { enabled: true }, mode: "x" },
          pan: { enabled: true, mode: "x" },
          limits: { x: { min: "original", max: "original" } },
        },
      },
      scales: {
        x: { type: "time", time: { unit: "hour" }, grid: { display: false } },
        y: {
          ticks: { callback: (v) => `$${Number(v).toLocaleString()}` },
          grid: { color: "rgba(0,0,0,0.06)" },
        },
      },
    }),
    []
  );

  return (
    <div className="chartCard sharp">
      <div className="chartInner">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
