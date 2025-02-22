import { create } from "zustand";
import { getTickers, getTicker } from "@/api/getTickers";
import { Ticker } from "@/types/Ticker";

interface TickerState {
  tickers: Ticker[];
  tickerPair: string;
  ticker: Ticker;
  fetchTickers: () => Promise<void>;
  fetchTicker: () => Promise<void>;
  setTickerPair: (tickerPair: string) => void;
  currencyBase: string;
  currencyBaseOptions: string[];
  setCurrencyBase: (currencyBase: string) => void;
}

export const useTickerStore = create<TickerState>((set, get) => ({
  tickers: [],
  currencyBase: "USD",
  currencyBaseOptions: ["USD", "EUR"],
  tickerPair: "BTCETH",
  ticker: {} as Ticker,

  fetchTickers: async () => {
    const res = await getTickers();
    set({
      tickers: res,
    });
  },
  setCurrencyBase: (currencyBase: string) => {
    set({ currencyBase });
  },
  fetchTicker: async () => {
    const { tickerPair } = get();
    const res = await getTicker(tickerPair);
    set({
      ticker: res,
    });
  },
  setTickerPair: (tickerPair: string) => {
    set({
      tickerPair,
    });
  },
}));
