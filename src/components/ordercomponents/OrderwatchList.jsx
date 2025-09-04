// Watchlist.jsx
import React, { useMemo, useState } from "react";
import "./OrderwatchList.css";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function Watchlist({ items = [], onSelect }) {
  const [pinnedIds, setPinnedIds] = useState(() => new Set());
  const [selectedId, setSelectedId] = useState(null);

  const isPinned = (id) => pinnedIds.has(id);

  const togglePin = (id) => {
    setPinnedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleSelect = (id) => {
    setSelectedId(id);
    if (onSelect) onSelect(id);
  };

  // Pinned first, keep original order within groups
  const sortedItems = useMemo(() => {
    const withIndex = items.map((it, i) => ({ ...it, __i: i }));
    withIndex.sort((a, b) => {
      const ap = isPinned(a.id) ? 1 : 0;
      const bp = isPinned(b.id) ? 1 : 0;
      if (ap !== bp) return bp - ap; // pinned (1) before unpinned (0)
      return a.__i - b.__i; // stable order inside group
    });
    return withIndex;
  }, [items, pinnedIds]);

  return (
    <div className="wl">
      <div className="wl-header" role="heading" aria-level={2}>
        Watchlist
      </div>

      <ul className="wl-list" role="listbox" aria-label="Stocks watchlist">
        {sortedItems.map((stock) => {
          const pinned = isPinned(stock.id);
          const selected = selectedId === stock.id;
          return (
            <li
              key={stock.id}
              role="option"
              aria-selected={selected}
              tabIndex={0}
              className={[
                "wl-row",
                pinned ? "is-pinned" : "is-unpinned",
                selected ? "is-selected" : "",
              ].join(" ")}
              onClick={() => handleSelect(stock.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleSelect(stock.id);
                }
                if (
                  (e.key === "p" || e.key === "P") &&
                  (e.metaKey || e.ctrlKey)
                ) {
                  // Ctrl/Cmd+P to toggle pin for focused row
                  e.preventDefault();
                  togglePin(stock.id);
                }
              }}
            >
              {/* Pin button (always visible for pinned; hover-revealed for unpinned via CSS) */}
              <button
                type="button"
                className="wl-pin"
                aria-pressed={pinned}
                aria-label={pinned ? "Unpin stock" : "Pin stock"}
                onClick={(e) => {
                  e.stopPropagation();
                  togglePin(stock.id);
                }}
              >
                {/* Inline SVG pin icon */}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                  className="pin-icon"
                  // Filled when pinned, outlined when unpinned
                  fill={pinned ? "currentColor" : "none"}
                  stroke={pinned ? "none" : "currentColor"}
                  strokeWidth={pinned ? 0 : 1.5}
                >
                  <path d="M4.146.146A.5.5 0 0 1 4.5 0h7a.5.5 0 0 1 .5.5c0 .68-.342 1.174-.646 1.479-.126.125-.25.224-.354.298v4.431l.078.048c.203.127.476.314.751.555C12.36 7.775 13 8.527 13 9.5a.5.5 0 0 1-.5.5h-4v4.5c0 .276-.224 1.5-.5 1.5s-.5-1.224-.5-1.5V10h-4a.5.5 0 0 1-.5-.5c0-.973.64-1.725 1.17-2.189A6 6 0 0 1 5 6.708V2.277a3 3 0 0 1-.354-.298C4.342 1.674 4 1.179 4 .5a.5.5 0 0 1 .146-.354m1.58 1.408-.002-.001zm-.002-.001.002.001A.5.5 0 0 1 6 2v5a.5.5 0 0 1-.276.447h-.002l-.012.007-.054.03a5 5 0 0 0-.827.58c-.318.278-.585.596-.725.936h7.792c-.14-.34-.407-.658-.725-.936a5 5 0 0 0-.881-.61l-.012-.006h-.002A.5.5 0 0 1 10 7V2a.5.5 0 0 1 .295-.458 1.8 1.8 0 0 0 .351-.271c.08-.08.155-.17.214-.271H5.14q.091.15.214.271a1.8 1.8 0 0 0 .37.282" />
                </svg>
              </button>

              {/* Main content */}
              <div className="wl-main">
                <div className="wl-line1">
                  <span className="wl-symbol">{stock.symbol}</span>
                  <span className="wl-price">
                    {currency.format(stock.price ?? 0)}
                  </span>
                </div>
                <div className="wl-line2">
                  <span className="wl-name">{stock.name}</span>
                  {typeof stock.changePct === "number" && (
                    <span
                      className={
                        "wl-chg " + (stock.changePct >= 0 ? "is-up" : "is-down")
                      }
                    >
                      {(stock.changePct >= 0 ? "+" : "") +
                        (stock.changePct * 100).toFixed(2) +
                        "%"}
                    </span>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
