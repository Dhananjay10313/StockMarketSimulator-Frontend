// OrderModal.jsx
import React, { useState, useRef, useEffect } from "react";
import "./OrderForm.css";

const OrderModal = ({
  open,
  side,
  setSide,
  onClose,
  onSubmit,
  symbol = "HINDUNILVR",
  name = "HINDUSTAN UNILEVER LTD.",
  lastPrice = 2665.6,
  currency = "INR",
}) => {
  const dialogRef = useRef(null);
  const [orderType, setOrderType] = useState("market");
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(lastPrice);
  const [gttCondition, setGttCondition] = useState("at_or_above");

  const fmt = new Intl.NumberFormat(currency === "INR" ? "en-IN" : "en-US", {
    style: "currency",
    currency,
  });

  // Constants for calculation
  const BROKERAGE_RATE = 0.0003; // 0.03% for delivery
  const GST_RATE = 0.18; // 18% on brokerage
  const STT_RATE = 0.001; // 0.1% for delivery
  const STAMP_DUTY = 0.00003; // 0.003%
  const SEBI_FEE = 0.0000001; // 0.00001%

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onCancel = (e) => {
      e.preventDefault();
      onClose?.();
    };
    dialog.addEventListener("cancel", onCancel);
    return () => dialog.removeEventListener("cancel", onCancel);
  }, [onClose]);

  // Set price based on order type
  useEffect(() => {
    if (orderType === "market") {
      setPrice(lastPrice);
    }
  }, [orderType, lastPrice]);

  // Auto-set GTT condition based on side
  useEffect(() => {
    if (orderType === "gtt") {
      setGttCondition(side === "buy" ? "at_or_below" : "at_or_above");
    }
  }, [side, orderType]);

  // OrderModal.jsx - Corrected calculateOrderSummary function
  const calculateOrderSummary = () => {
    const grossAmount = quantity * price;

    if (side === "buy") {
      // BUY ORDER: Calculate total cost (amount + charges)
      const brokerage = Math.max(grossAmount * BROKERAGE_RATE, 20);
      const gst = brokerage * GST_RATE;
      const stt = grossAmount * STT_RATE; // 0.1% for delivery
      const stampDuty = grossAmount * STAMP_DUTY; // 0.015% only on buy
      const sebiFee = grossAmount * SEBI_FEE;
      const exchangeCharges = grossAmount * 0.0000297; // NSE charges

      const totalCharges =
        brokerage + gst + stt + stampDuty + sebiFee + exchangeCharges;
      const netAmount = grossAmount + totalCharges; // Total cost to buyer

      return {
        grossAmount,
        brokerage,
        gst,
        stt,
        stampDuty: stampDuty,
        sebiFee,
        exchangeCharges,
        dpCharges: 0,
        totalCharges,
        netAmount,
      };
    } else {
      // SELL ORDER: Calculate net proceeds (amount - charges)
      const brokerage = Math.max(grossAmount * BROKERAGE_RATE, 20);
      const gst = brokerage * GST_RATE;
      const stt = grossAmount * STT_RATE; // 0.1% for delivery
      const sebiFee = grossAmount * SEBI_FEE;
      const exchangeCharges = grossAmount * 0.0000297; // NSE charges
      const dpCharges = 18.5; // DP charges only on sell

      const totalCharges =
        brokerage + gst + stt + sebiFee + exchangeCharges + dpCharges;
      const netAmount = grossAmount - totalCharges; // Net proceeds to seller

      return {
        grossAmount,
        brokerage,
        gst,
        stt,
        stampDuty: 0, // No stamp duty on sell
        sebiFee,
        exchangeCharges,
        dpCharges,
        totalCharges,
        netAmount,
      };
    }
  };

  const summary = calculateOrderSummary();

  const handleSubmit = (e) => {
    e.preventDefault();
    const orderData = {
      symbol,
      name,
      orderType,
      side,
      quantity: Number(quantity),
      price: Number(price),
      gttCondition: orderType === "gtt" ? gttCondition : null,
      summary,
    };
    onSubmit?.(orderData);
    onClose?.();
  };

  const getOrderTypeMessage = () => {
    switch (orderType) {
      case "market":
        return "Market orders execute immediately at the best available price";
      case "limit":
        return "Limit orders execute only at your specified price or better";
      case "gtt":
        return "GTT orders trigger when price conditions are met (valid for 365 days)";
      default:
        return "";
    }
  };

  return (
    <dialog ref={dialogRef} className="order-dialog" aria-label="Place Order">
      <form className="order-form" onSubmit={handleSubmit}>
        <header className="order-header">
          <div className="order-title">
            <div className="order-symbol">{symbol}</div>
            <div className="order-name">{name}</div>
            <div className="order-price">LTP: {fmt.format(lastPrice)}</div>
          </div>
          <button
            type="button"
            className="order-close"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </header>

        <div className="order-body">
          {/* Info Section */}
          <div className="order-info">
            <div className="info-icon">ℹ</div>
            <div className="info-text">{getOrderTypeMessage()}</div>
          </div>

          {/* Order Type Selection */}
          <div className="field-group">
            <label className="field-label">Order Type</label>
            <div className="order-type-tabs">
              {["market", "limit", "gtt"].map((type) => (
                <button
                  key={type}
                  type="button"
                  className={`order-tab ${orderType === type ? "active" : ""}`}
                  onClick={() => setOrderType(type)}
                >
                  {type.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Buy/Sell Toggle */}
          <div className="field-group">
            <label className="field-label">Transaction Type</label>
            <div className="side-toggle">
              <button
                type="button"
                className={`side-btn buy ${side === "buy" ? "active" : ""}`}
                onClick={() => setSide("buy")}
              >
                BUY
              </button>
              <button
                type="button"
                className={`side-btn sell ${side === "sell" ? "active" : ""}`}
                onClick={() => setSide("sell")}
              >
                SELL
              </button>
            </div>
          </div>

          {/* Quantity and Price */}
          <div className="field-row">
            <div className="field-group">
              <label className="field-label">Quantity</label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) =>
                  setQuantity(Math.max(1, Number(e.target.value)))
                }
                className="field-input"
                required
              />
            </div>

            <div className="field-group">
              <label className="field-label">
                Price {orderType === "market" ? "(Market)" : ""}
              </label>
              <div className="price-input-wrapper">
                <input
                  type="number"
                  step="0.01"
                  min="0.01"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="field-input"
                  disabled={orderType === "market"}
                  required
                />
                {orderType === "gtt" && (
                  <div className="gtt-condition">
                    <select
                      value={gttCondition}
                      onChange={(e) => setGttCondition(e.target.value)}
                      className="gtt-select"
                    >
                      <option value="at_or_above">At or above</option>
                      <option value="at_or_below">At or below</option>
                    </select>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          {/* Order Summary - Corrected */}
          <div className="order-summary">
            <div className="summary-title">Order Summary</div>
            <div className="summary-row">
              <span>{side === "buy" ? "Purchase Value" : "Sale Value"}</span>
              <span>{fmt.format(summary.grossAmount)}</span>
            </div>

            {/* Charges breakdown */}
            <div className="charges-section">
              <div className="charges-title">Charges & Taxes:</div>
              <div className="summary-row small">
                <span>Brokerage</span>
                <span>{fmt.format(summary.brokerage)}</span>
              </div>
              <div className="summary-row small">
                <span>GST (18%)</span>
                <span>{fmt.format(summary.gst)}</span>
              </div>
              <div className="summary-row small">
                <span>STT</span>
                <span>{fmt.format(summary.stt)}</span>
              </div>
              <div className="summary-row small">
                <span>Exchange Charges</span>
                <span>{fmt.format(summary.exchangeCharges)}</span>
              </div>
              {summary.stampDuty > 0 && (
                <div className="summary-row small">
                  <span>Stamp Duty</span>
                  <span>{fmt.format(summary.stampDuty)}</span>
                </div>
              )}
              {summary.dpCharges > 0 && (
                <div className="summary-row small">
                  <span>DP Charges</span>
                  <span>{fmt.format(summary.dpCharges)}</span>
                </div>
              )}
              <div className="summary-row small">
                <span>SEBI Fee</span>
                <span>{fmt.format(summary.sebiFee)}</span>
              </div>
            </div>

            <div className="summary-row total">
              <span>{side === "buy" ? "Total Cost" : "Net Proceeds"}</span>
              <span className={side === "buy" ? "cost" : "proceeds"}>
                {fmt.format(summary.netAmount)}
              </span>
            </div>
          </div>
        </div>

        <footer className="order-footer">
          <button type="button" className="btn secondary" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className={`btn primary ${side}`}>
            {side === "buy" ? "BUY" : "SELL"} {quantity}{" "}
            {quantity === 1 ? "share" : "shares"}
          </button>
        </footer>
      </form>
    </dialog>
  );
};

export default OrderModal;
