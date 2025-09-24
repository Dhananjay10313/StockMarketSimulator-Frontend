// src/store.ts
import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialStocksState = {
  byId: {
    AAPL: {
      stockId: 'AAPL',
      name: 'Apple Inc.',
      symbol: 'AAPL',
      movementValue: 0.0,
      movementDirection: 'flat',
    },
    MSFT: {
      stockId: 'MSFT',
      name: 'Microsoft Corp.',
      symbol: 'MSFT',
      movementValue: 0.0,
      movementDirection: 'flat',
    },
    GOOGL: {
      stockId: 'GOOGL',
      name: 'Alphabet Inc.',
      symbol: 'GOOGL',
      movementValue: 0.0,
      movementDirection: 'flat',
    },
    AMZN: {
      stockId: 'AMZN',
      name: 'Amazon.com Inc.',
      symbol: 'AMZN',
      movementValue: 0.0,
      movementDirection: 'flat',
    },
    TSLA: {
      stockId: 'TSLA',
      name: 'Tesla Inc.',
      symbol: 'TSLA',
      movementValue: 0.0,
      movementDirection: 'flat',
    },
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
    updateMovement(
      state,
      action
    ) {
      const s = state.byId[action.payload.stockId];
      if (s) {
        s.movementValue = action.payload.movementValue;
        s.movementDirection = action.payload.movementDirection;
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
  upsertStock,
  upsertManyStocks,
  updateMovement,
  removeStock,
  clearStocks,
} = stocksSlice.actions;

export const { setPrice, setPrices, removePrice, clearPrices } =
  stockPricesSlice.actions;

export const store = configureStore({
  reducer: {
    stocks: stocksSlice.reducer,
    stockPrices: stockPricesSlice.reducer,
  },
});


export const selectStockById = (state, stockId) =>
  state.stocks.byId[stockId];

export const selectPriceById = (state, stockId) =>
  state.stockPrices.byId[stockId];

export const selectStockWithPriceById = (state, stockId) => {
  const core = state.stocks.byId[stockId];
  if (!core) return null;
  return { ...core, price: state.stockPrices.byId[stockId] ?? null };
};
