// Watchlist.jsx
import React from "react";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function Watchlist({ items = [] }) {
  return (
    <div style={styles.card}>
      <div style={styles.header}>My watchlist</div>
      <ul style={styles.list}>
        {items.map((it) => {
          const isUp = Number(it.changePercent) > 0;
          return (
            <li key={it.symbol} style={styles.row}>
              <div style={styles.left}>
                <div style={styles.symbol}>{it.symbol}</div>
                <div style={styles.name}>{it.name}</div>
              </div>

              <div style={styles.right}>
                <div style={styles.price}>{currency.format(it.price)}</div>
                <div style={isUp ? styles.up : styles.down}>
                  {isUp ? "▲" : "▼"} {Math.abs(Number(it.changePercent)).toFixed(2)}%
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

const styles = {
  card: {
    width: 360,
    background: "#fff",
    borderRadius: 16,
    padding: 16,
    boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
    fontFamily: "Inter, system-ui, sans-serif",
  },
  header: { fontWeight: 700, fontSize: 16, marginBottom: 8 },
  list: { listStyle: "none", padding: 0, margin: 0 },
  row: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 0",
    borderBottom: "1px solid #F1F2F4",
  },
  left: { display: "flex", flexDirection: "column", gap: 2 },
  symbol: { fontWeight: 600, fontSize: 14 },
  name: { color: "#6B7280", fontSize: 12 },
  right: { textAlign: "right" },
  price: { fontWeight: 600, fontSize: 14 },
  up: { color: "#16A34A", fontWeight: 600, fontSize: 12 },
  down: { color: "#DC2626", fontWeight: 600, fontSize: 12 },
};
