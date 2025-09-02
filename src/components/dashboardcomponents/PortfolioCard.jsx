// PortfolioCard.jsx (JSX)
import React, { useMemo, useRef, useState, useEffect } from "react";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function PortfolioCard({
  title = "Total Portfolio",
  items = [],
  overallChangePct = 0,
}) {
  const { total, segments } = useMemo(() => {
    const sum = items.reduce((a, it) => a + (it.value || 0), 0);
    const segs = items.map((it) => ({
      ...it,
      percent: sum > 0 ? (it.value / sum) * 100 : 0,
    }));
    return { total: sum, segments: segs };
  }, [items]); // derived values memoized for efficient renders [13]

  const scrollerRef = useRef(null); // ref to the horizontal chip scroller [7]
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const updateArrows = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setCanLeft(el.scrollLeft > 1);
    setCanRight(el.scrollLeft < maxScroll - 1);
  };

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    updateArrows();
    const onScroll = () => updateArrows();
    el.addEventListener("scroll", onScroll, { passive: true });
    const onResize = () => updateArrows();
    window.addEventListener("resize", onResize);
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [items.length]); // keep buttons accurate as content or viewport changes [11]

  const scrollByCards = (dir) => {
    const el = scrollerRef.current;
    if (!el) return;
    const first = el.querySelector(".chip");
    if (!first) return;

    // Compute one-step width = chip width + gap
    const chipRect = first.getBoundingClientRect();
    const styles = getComputedStyle(el);
    const gap = parseFloat(styles.columnGap || styles.gap || "12") || 0;
    const cardWidth = chipRect.width + gap;

    // Remaining hidden items on each side
    const remainingRight = Math.ceil(
      (el.scrollWidth - el.clientWidth - el.scrollLeft) / cardWidth
    );
    const remainingLeft = Math.ceil(el.scrollLeft / cardWidth);

    const count =
      dir === "right"
        ? Math.min(2, remainingRight)
        : Math.min(2, remainingLeft); // scroll min(2, extra) per click [1]

    const delta = (dir === "right" ? 1 : -1) * cardWidth * count;
    el.scrollBy({ left: delta, behavior: "smooth" }); // smooth scroll for good UX [1]
  };

  return (
    <div className="card">
      {/* Header */}
      <div className="header">
        <div className="left">
          <div className="sub">
            {title} ({items.length})
          </div>
          <div className="total">
            {currency.format(total)}
            <span className={`badge ${overallChangePct >= 0 ? "up" : "down"}`}>
              {overallChangePct >= 0 ? "▲" : "▼"}{" "}
              {Math.abs(overallChangePct).toFixed(2)}%
            </span>
          </div>
        </div>
        <button className="openBtn" aria-label="Open portfolio details">
          ↗
        </button>
      </div>

      {/* Segmented distribution bar */}
      <div
        className="segBar"
        role="img"
        aria-label="Portfolio distribution by type"
      >
        {segments.map((seg, i) => (
          <div
            key={seg.type || i}
            className="seg"
            style={{
              width: `${seg.percent}%`,
              background: seg.color || "#ddd",
            }}
            title={`${seg.type}: ${seg.percent.toFixed(1)}%`}
          />
        ))}
      </div>

      {/* Horizontal chip scroller with arrows */}
      <div className="chipRow">
        {/* Replace your existing arrow buttons inside the chipRow with these */}
        <button
          className={`arrow left ${canLeft ? "show" : "hide"}`}
          onClick={() => scrollByCards("left")}
          aria-label="Scroll left"
          type="button"
        >
          <svg
            viewBox="0 0 24 24"
            width="18"
            height="18"
            aria-hidden="true"
            focusable="false"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Heroicons-style chevron left: M15 19l-7-7 7-7 */}
            <path d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div
          ref={scrollerRef}
          className="chipsScroller hideScrollbar"
          role="region"
          aria-label="Stock types"
        >
          {segments.map((seg, i) => {
            const isUp = Number(seg.changePct) > 0;
            return (
              <div className="chip" key={seg.type || i}>
                <div className="chipTop">
                  <span
                    className="chipSwatch"
                    style={{ background: seg.color || "#ddd" }}
                  />
                  <span className="chipName">{seg.type}</span>
                  <span className="chipSym">{seg.symbol}</span>
                </div>
                <div className="chipBottom">
                  <span className="chipVal">{currency.format(seg.value)}</span>
                  <span className={`chipChg ${isUp ? "up" : "down"}`}>
                    {isUp ? "+" : "−"}
                    {Math.abs(Number(seg.changePct || 0)).toFixed(2)}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        <button
          className={`arrow right ${canRight ? "show" : "hide"}`}
          onClick={() => scrollByCards("right")}
          aria-label="Scroll right"
          type="button"
        >
          <svg
            viewBox="0 0 24 24"
            width="18"
            height="18"
            aria-hidden="true"
            focusable="false"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Heroicons-style chevron right: M9 5l7 7-7 7 */}
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
