// src/store.jsx
import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialStocksState = {
  byId: {
    AAPL: { stockId: 'AAPL', name: 'Apple Inc.', symbol: 'AAPL', changePct: 0.0 },
    MSFT: { stockId: 'MSFT', name: 'Microsoft Corp.', symbol: 'MSFT', changePct: 0.013 },
    GOOGL:{ stockId: 'GOOGL', name: 'Alphabet Inc.', symbol: 'GOOGL', changePct: -0.004 },
    AMZN: { stockId: 'AMZN', name: 'Amazon.com Inc.', symbol: 'AMZN', changePct: 0.013 },
    TSLA: { stockId: 'TSLA', name: 'Tesla Inc.', symbol: 'TSLA', changePct: -0.004 },
  },
};

const initialPricesState = {
  byId: {
    AAPL: 187.23,
    MSFT: 312.77,
    GOOGL: 142.11,
    AMZN: 134.88,
    TSLA: 243.56,
  },
};

const stocksSlice = createSlice({
  name: 'stocks',
  initialState: initialStocksState,
  reducers: {
    // Replace the entire stocks slice with a new value
    initializeStocks(_state, action) {
      return action.payload; // expected shape: { byId: { [stockId]: { stockId, name, symbol, changePct } } }
    },
    // Add or replace a stock's core data
    upsertStock(state, action) {
      state.byId[action.payload.stockId] = action.payload;
    },
    // Add or replace many stocks
    upsertManyStocks(state, action) {
      for (const stock of action.payload) {
        state.byId[stock.stockId] = stock;
      }
    },
    // Update only movement fields for a given stock
    updateMovement(state, action) {
      const s = state.byId[action.payload.stockId];
      if (s) {
        s.changePct = action.payload.changePct;
      }
    },
    // Remove a stock entirely
    removeStock(state, action) {
      delete state.byId[action.payload];
    },
    // Optional: clear everything
    clearStocks(state) {
      state.byId = {};
    },
  },
});

const stockPricesSlice = createSlice({
  name: 'stockPrices',
  initialState: initialPricesState,
  reducers: {
    // Replace the entire prices slice with a new value
    initializeStockPrices(_state, action) {
      return action.payload; // expected shape: { byId: { [stockId]: priceNumber } }
    },
    setPrice(state, action) {
      state.byId[action.payload.stockId] = action.payload.price;
    },
    setPrices(state, action) {
      Object.assign(state.byId, action.payload);
    },
    removePrice(state, action) {
      delete state.byId[action.payload];
    },
    clearPrices(state) {
      state.byId = {};
    },
  },
});

export const {
  initializeStocks,
  upsertStock,
  upsertManyStocks,
  updateMovement,
  removeStock,
  clearStocks,
} = stocksSlice.actions;

export const {
  initializeStockPrices,
  setPrice,
  setPrices,
  removePrice,
  clearPrices,
} = stockPricesSlice.actions;

export const store = configureStore({
  reducer: {
    stocks: stocksSlice.reducer,
    stockPrices: stockPricesSlice.reducer,
  },
});

// Selectors
export const selectStockById = (state, stockId) => state.stocks.byId[stockId];
export const selectPriceById = (state, stockId) => state.stockPrices.byId[stockId];
export const selectStockWithPriceById = (state, stockId) => {
  const core = state.stocks.byId[stockId];
  if (!core) return null;
  return { ...core, price: state.stockPrices.byId[stockId] ?? null };
};
