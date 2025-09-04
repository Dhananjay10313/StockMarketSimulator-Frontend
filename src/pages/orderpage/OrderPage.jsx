import React from 'react'
import OrderwatchList from '../../components/ordercomponents/OrderwatchList.jsx';
import CandleChart from '../../components/ordercomponents/CandleChart.jsx';

// --- sample data (keep your existing data) ---


const data = [
  { id: "AAPL", symbol: "AAPL", name: "Apple Inc.", price: 230.42, changePct: 0.013 },
  { id: "MSFT", symbol: "MSFT", name: "Microsoft Corp.", price: 419.12, changePct: -0.004 },
  { id: "NVDA", symbol: "NVDA", name: "NVIDIA Corp.", price: 117.55, changePct: 0.027 },
];

// 20 candles, 30‑minute interval
const BASE_TIME = 1725400000; // Unix seconds; change if desired
const SAMPLE_CANDLES = [
  { dt: 0,  open: 2640, high: 2652, low: 2630, close: 2648 },
  { dt: 1800, open: 2648, high: 2660, low: 2642, close: 2655 },
  { dt: 3600, open: 2655, high: 2664, low: 2648, close: 2650 },
  { dt: 5400, open: 2650, high: 2655, low: 2638, close: 2642 },
  { dt: 7200, open: 2642, high: 2648, low: 2628, close: 2630 },
  { dt: 9000, open: 2630, high: 2636, low: 2618, close: 2622 },
  { dt: 10800, open: 2622, high: 2635, low: 2615, close: 2632 },
  { dt: 12600, open: 2632, high: 2644, low: 2628, close: 2640 },
  { dt: 14400, open: 2640, high: 2662, low: 2635, close: 2658 },
  { dt: 16200, open: 2658, high: 2669, low: 2651, close: 2664 },
  { dt: 18000, open: 2664, high: 2675, low: 2658, close: 2672 },
  { dt: 19800, open: 2672, high: 2680, low: 2662, close: 2668 },
  { dt: 21600, open: 2668, high: 2678, low: 2658, close: 2660 },
  { dt: 23400, open: 2660, high: 2666, low: 2648, close: 2652 },
  { dt: 25200, open: 2652, high: 2668, low: 2649, close: 2662 },
  { dt: 27000, open: 2662, high: 2672, low: 2656, close: 2665 },
  { dt: 28800, open: 2665, high: 2685, low: 2660, close: 2678 },
  { dt: 30600, open: 2678, high: 2690, low: 2672, close: 2686 },
  { dt: 32400, open: 2686, high: 2695, low: 2680, close: 2682 },
  { dt: 34200, open: 2682, high: 2688, low: 2672, close: 2678 },
].map(b => ({ time: BASE_TIME + b.dt, open: b.open, high: b.high, low: b.low, close: b.close }));

// Usage:
// series.setData(SAMPLE_CANDLES);

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

// Example:
// const data = generateCandles({ count: 500, startPrice: 2660 });
// series.setData(data);


const OrderPage = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', height: '100vh' }}>
      <OrderwatchList items={data}/>
      <CandleChart data={generateCandles({ count: 500, startPrice: 2660 })}/>
    </div>
  )
}

export default OrderPage
