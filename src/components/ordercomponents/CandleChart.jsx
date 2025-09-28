// CandleChart.jsx
import React, { useEffect, useRef, useState } from "react";
import {
  createChart,
  CrosshairMode,
  LineStyle,
  CandlestickSeries,
} from "lightweight-charts";
import "./CandleChart.css";

export default function CandleChart({ data }) {
  const containerRef = useRef(null);
  const chartRef = useRef(null);
  const seriesRef = useRef(null);
  const cursorStickerRef = useRef(null);
  const latestPriceLineRef = useRef(null);
  const [barSpacing, setBarSpacing] = useState(8);

  // console.log("CandleChart data:", data);

  useEffect(() => {
    const container = containerRef.current;
    const chart = createChart(containerRef.current, {
      autoSize: true,
      layout: { background: { color: "#ffffff" }, textColor: "#111827" },
      rightPriceScale: { borderVisible: true },
      timeScale: { borderVisible: true, barSpacing: 8 },
      grid: {
        vertLines: { color: "#f0f0f0" },
        horzLines: { color: "#f0f0f0" },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
        vertLine: {
          color: "rgba(0,0,0,0.35)",
          style: LineStyle.Dotted,
          width: 1,
        },
        horzLine: { color: "rgba(0,0,0,0.35)", style: LineStyle.Dotted },
      },
    });
    chartRef.current = chart;

    const series = chart.addSeries(CandlestickSeries, {
      upColor: "#059669",
      downColor: "#dc2626",
      wickUpColor: "#059669",
      wickDownColor: "#dc2626",
      borderVisible: false,
    });

    series.setData(data);

    // Latest price label on the right axis
    const last = data[data.length - 1];
    series.createPriceLine({
      price: last.close,
      color: "#111827",
      lineStyle: LineStyle.Dotted,
      lineWidth: 1,
      axisLabelVisible: true,
      title: "Last",
    });

    // Cursor-following price sticker: a div anchored to right axis, updated on crosshair move
    const cursorSticker = document.createElement("div");
    cursorSticker.className = "cursor-sticker";
    cursorStickerRef.current = cursorSticker;
    container.appendChild(cursorSticker);

    const updateSticker = (param) => {
      if (!param?.time || !param?.point) {
        cursorSticker.style.display = "none";
        return;
      }
      // Get price at crosshair for this series
      const sd = param.seriesData.get(series);
      const price = sd?.close ?? sd?.value;
      if (price == null) {
        cursorSticker.style.display = "none";
        return;
      }
      const y = series.priceToCoordinate(price);
      if (y == null) {
        cursorSticker.style.display = "none";
        return;
      }
      // Position the sticker against the right axis
      const rightPad = 0; // flush against the price scale
      cursorSticker.style.display = "block";
      cursorSticker.style.top = `${y - 10}px`;
      cursorSticker.style.right = `${rightPad}px`;
      cursorSticker.textContent = price.toFixed(2);
    };

    chart.subscribeCrosshairMove(updateSticker);

    // Resize handler
    const ro = new ResizeObserver(() => {
      chart.applyOptions({
        width: container.clientWidth,
        height: container.clientHeight,
      });
    });
    ro.observe(container);

    return () => {
      chart.unsubscribeCrosshairMove(updateSticker);
      ro.disconnect();
      chart.remove();
    };
  }, [data]);

  // Toolbar actions
  const zoom = (dir) => {
    const next = Math.max(2, Math.min(40, barSpacing + dir * 2));
    setBarSpacing(next);
    chartRef.current?.timeScale().applyOptions({ barSpacing: next });
  };

  // PAN: move viewport by N bars (positive = left/older, negative = right/newer)
  const move = (bars) => {
    const ts = chartRef.current?.timeScale();
    if (!ts) return;
    const cur = ts.scrollPosition(); // current distance from right edge, in bars
    ts.scrollToPosition(cur + bars, true); // animate to the new position
  };

  const fit = () => {
    chartRef.current?.timeScale().fitContent();
  };

  // Live timestamp in the footer
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  // Example range selection: filter incoming data by tail length (1D/1W/1M)
  const onRange = (key) => {
    const map = { "1D": 78, "1W": 7 * 78, "1M": 30 * 78 }; // e.g., 30‑min bars per day
    const n = map[key] ?? data.length;
    const tail = data.slice(-n);
    seriesRef.current?.setData(tail);
    fit();
  };

  return (
    <div className="tv-wrap">
      <div>
      </div>
      <div ref={containerRef} className="tv-chart" />
      <div className="tv-toolbar">
        <div className="ranges">
          <button onClick={() => onRange("1D")}>1D</button>
          <button onClick={() => onRange("1W")}>1W</button>
          <button onClick={() => onRange("1M")}>1M</button>
        </div>
        <div className="nav">
          <button onClick={() => move(-50)} title="Left">
            ⟵
          </button>
          <button onClick={() => zoom(1)} title="Zoom in">
            ＋
          </button>
          <button onClick={() => zoom(-1)} title="Zoom out">
            －
          </button>
          <button onClick={() => move(50)} title="Right">
            ⟶
          </button>
          <button onClick={fit} title="Fit">
            Fit
          </button>
        </div>
        <div className="clock">{now.toLocaleString()}</div>
      </div>
    </div>
  );
}
