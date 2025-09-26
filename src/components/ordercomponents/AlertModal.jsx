// AlertModal.jsx
import React, { useEffect, useRef, useState } from "react";
import "./AlertModal.css";

export default function AlertModal({
  open,
  onClose,
  onSubmit,
  symbol = "HINDUNILVR",
  name = "HINDUSTAN UNILEVER LTD.",
  lastPrice = 0,
  currency = "INR",
}) {
  const dlgRef = useRef(null);
  const [dateError, setDateError] = useState("");
  
  const fmt = new Intl.NumberFormat(
    currency === "INR" ? "en-IN" : "en-US",
    { style: "currency", currency }
  );

  // Set min datetime to current time for HTML5 validation
  const getCurrentDateTimeLocal = () => {
    const now = new Date();
    // Adjust for timezone offset to get local time in ISO format
    const offsetMs = now.getTimezoneOffset() * 60 * 1000;
    const localTime = new Date(now.getTime() - offsetMs);
    return localTime.toISOString().slice(0, 16); // Format: YYYY-MM-DDTHH:MM
  };

  const validateExpiryDate = (dateValue) => {
    if (!dateValue) return true; // Optional field, empty is valid
    
    const selectedDate = new Date(dateValue);
    const now = new Date();
    
    if (selectedDate <= now) {
      setDateError("Expiry date must be in the future");
      return false;
    }
    
    setDateError("");
    return true;
  };

  useEffect(() => {
    const dlg = dlgRef.current;
    if (!dlg) return;
    if (open && !dlg.open) {
      dlg.showModal();
      setDateError(""); // Clear any previous errors when opening
    }
    if (!open && dlg.open) dlg.close();
  }, [open]);

  // Close on "cancel" event (ESC) or <form method="dialog">
  useEffect(() => {
    const dlg = dlgRef.current;
    if (!dlg) return;
    const onCancel = (e) => { e.preventDefault(); onClose?.(); };
    dlg.addEventListener("cancel", onCancel);
    return () => dlg.removeEventListener("cancel", onCancel);
  }, [onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const expiryValue = fd.get("expires");
    
    // Validate expiry date before submission
    if (!validateExpiryDate(expiryValue)) {
      return; // Stop form submission if validation fails
    }
    
    const payload = {
      symbol,
      name,
      direction: fd.get("direction"),             // "at_or_above" | "at_or_below"
      target: Number(fd.get("target")),
      expires: expiryValue || null,              // ISO datetime-local
      repeat: fd.get("repeat") === "on",          // repeat notification
      channel_email: fd.get("ch_email") === "on", // email notifications
      note: fd.get("note") || "",
    };
    onSubmit?.(payload);
    onClose?.();
  };

  const handleDateChange = (e) => {
    validateExpiryDate(e.target.value);
  };

  return (
    <dialog ref={dlgRef} className="alert-dialog" aria-label="Add price alert">
      <form className="alert-form" onSubmit={handleSubmit} method="dialog">
        <header className="alert-head">
          <div className="alert-title">
            <div className="alert-name">{name}</div>
            <div className="alert-meta">{symbol} · Last {fmt.format(lastPrice)}</div>
          </div>
          <button
            type="button"
            className="alert-close"
            aria-label="Close"
            onClick={onClose}
          >
            ×
          </button>
        </header>

        <div className="alert-grid">
          {/* Direction */}
          <label className="field">
            <span className="label">Condition</span>
            <select name="direction" defaultValue="at_or_above" required>
              <option value="at_or_above">Price at or above</option>
              <option value="at_or_below">Price at or below</option>
            </select>
          </label>

          {/* Target price */}
          <label className="field">
            <span className="label">Target price</span>
            <input
              name="target"
              type="number"
              inputMode="decimal"
              step="0.01"
              placeholder="Enter price"
              defaultValue={lastPrice || ""}
              required
            />
          </label>

          {/* Expiration - spans full width and includes validation */}
          <label className="field field-full">
            <span className="label">Expires (optional)</span>
            <input 
              name="expires" 
              type="datetime-local"
              min={getCurrentDateTimeLocal()}
              onChange={handleDateChange}
            />
          </label>

          {/* Repeat */}
          <label className="field checkbox">
            <input name="repeat" type="checkbox" />
            <span>Repeat notification</span>
          </label>

          {/* Email notification - simplified to single checkbox */}
          <label className="field checkbox">
            <input name="ch_email" type="checkbox" />
            <span>Email notification</span>
          </label>

          {/* Note - spans full width */}
          <label className="field field-full">
            <span className="label">Note (optional)</span>
            <input name="note" type="text" placeholder="Add a note" />
          </label>
        </div>

        <footer className="alert-actions">
          <button type="button" className="btn ghost" onClick={onClose}>Cancel</button>
          <button type="submit" className="btn primary">Create alert</button>
        </footer>
      </form>
    </dialog>
  );
}
