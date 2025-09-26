// ChartView.jsx
import React, { use, useEffect, useState } from "react";
import "./ChartView.css";
import CandleChart from "./CandleChart.jsx";
import ChartComponent from "./CandleChart.jsx"; // default chart component
import { useAppContext } from "../../contexts/OrderContext.jsx";
import AlertModal from "./AlertModal.jsx";
import OrderForm from "./OrderForm.jsx";

// Inline SVG for an alert/bell icon (Bootstrap Icons bell), inherits currentColor
// Source path adapted from Bootstrap Icons "bell" for inline usage.
const BellIcon = ({ size = 18 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6" />
  </svg>
);

function generateCandles({
  count = 200,
  startTime = Math.floor(Date.now() / 1000) - count * 1800,
  intervalSec = 1800, // 30 minutes
  startPrice = 2650,
  volatility = 6,
} = {}) {
  const out = [];
  let prevClose = startPrice;
  for (let i = 0; i < count; i++) {
    const time = startTime + i * intervalSec;
    const drift = (Math.random() - 0.5) * volatility;
    const open = prevClose;
    const close = Math.max(1, open + drift);
    const high = Math.max(open, close) + Math.random() * (volatility / 2);
    const low = Math.min(open, close) - Math.random() * (volatility / 2);
    out.push({
      time,
      open: +open.toFixed(2),
      high: +high.toFixed(2),
      low: +low.toFixed(2),
      close: +close.toFixed(2),
    });
    prevClose = close;
  }
  return out;
}

// Props:
// - ChartComponent: an existing chart component, rendered full-height inside the middle area
// - symbol, name: stock identifiers shown in the navbar
// - price: current price to show on Buy/Sell buttons
// - currency: ISO code, e.g., "INR" | "USD"
// - onBuy, onSell, onAlert: action callbacks
export default function ChartView({ onAlert }) {
  const { stock } = useAppContext();
  const { name, symbol, price, id } = stock || {};
  const [alertOpen, setAlertOpen] = useState(false);
  const [orderFromOpen, setOrderFormOpen] = useState(false);
  const [side, setSide] = useState("buy");
  const currency = "INR"; // hardcoded for now; could be a prop
  const fmt = new Intl.NumberFormat(currency === "INR" ? "en-IN" : "en-US", {
    style: "currency",
    currency,
  });

  useEffect(() => {
    console.log("Selected stock changed:", stock);
  }, [id]);

  const onOrderClick = () => {
    console.log("Order clicked");
    if (!id) {
      alert("Please select a stock from the watchlist first.");
      return;
    }
    setOrderFormOpen(true);
  };

  return (
    <div className="cv-wrap">
      {/* Navbar */}
      <OrderForm
        open={orderFromOpen}
        symbol={symbol}
        side={side}
        setSide={setSide}
        name={name}
        lastPrice={price}
        currency={currency}
        onSubmit={onOrderClick}
        onClose={() => setOrderFormOpen(false)}
      />

      <AlertModal
        symbol={symbol}
        name={name}
        lastPrice={price}
        currency={currency}
        onSubmit={onAlert}
        open={alertOpen}
        onClose={() => setAlertOpen(false)}
      />

      <div className="cv-nav">
        <div className="cv-title">
          <span className="cv-name">{name}</span>
          <span className="cv-symbol">· {symbol}</span>
        </div>
        <button
          className="cv-alert"
          type="button"
          onClick={() => {
            setAlertOpen(true);
            console.log("here");
          }}
          aria-label="Add price alert"
        >
          <BellIcon />
          <span className="cv-alert-text">Add alert</span>
        </button>
      </div>

      {/* Chart area */}
      <div className="cv-main">
        {/* The chart component is expected to auto-size to this container */}
        {/* If your chart accepts height/width props, pass height="100%" */}
        {ChartComponent ? (
          <div className="cv-chart">
            <ChartComponent
              data={generateCandles({ count: 500, startPrice: 2660 })}
            />
          </div>
        ) : (
          <div className="cv-chart cv-chart--placeholder">
            Provide ChartComponent prop to render the chart here
          </div>
        )}
      </div>

      {/* Trade bar */}
      <div className="cv-tradebar">
        <div className="cv-tradebar-right">
          <button
            className="cv-btn cv-btn--sell"
            type="button"
            onClick={() => {
              onOrderClick();
              setSide("sell");
            }}
            aria-label={`Sell at ${fmt.format(price)}`}
          >
            <span className="cv-btn-label">SELL</span>
            <span className="cv-btn-price">{fmt.format(price)}</span>
          </button>
          <button
            className="cv-btn cv-btn--buy"
            type="button"
            onClick={() => {
              onOrderClick();
              setSide("buy");
            }}
            aria-label={`Buy at ${fmt.format(price)}`}
          >
            <span className="cv-btn-label">BUY</span>
            <span className="cv-btn-price">{fmt.format(price)}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
