// Watchlist.jsx
import React from "react";
import "./watchlist.css";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function Watchlist({ items = [], height = 360 }) {
  return (
    <div className="watchlistCard">
      <div className="watchlistHeader">My watchlist</div>

      {/* Fixed-height, scrollable, hidden-scrollbar wrapper */}
      <div
        className="watchlistBody hideScrollbar"
        style={{ height }} // adjustable fixed height
      >
        <ul className="watchlistList">
          {items.map((it) => {
            const isUp = Number(it.changePercent) > 0;
            return (
              <li key={it.symbol} className="watchlistRow">
                <div className="left">
                  <div className="symbol">{it.symbol}</div>
                  <div className="name">{it.name}</div>
                </div>
                <div className="right">
                  <div className="price">{currency.format(it.price)}</div>
                  <div className={`delta ${isUp ? "up" : "down"}`}>
                    {isUp ? "▲" : "▼"} {Math.abs(Number(it.changePercent)).toFixed(2)}%
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
