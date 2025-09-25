// src/context/AppContext.jsx
import React, { createContext, useContext, useMemo, useState } from "react";

const AppContext = createContext(undefined);

export function OrderContextProvider({ children }) {
  const [stock, setStock] = useState(null);

  const value = useMemo(
    () => ({ stock, setStock }),
    [stock]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be used within <AppProvider>");
  return ctx;
}
