import { create } from "zustand";
import { getTickers } from "@/api/getTickers";
import { Ticker } from "@/types/Ticker";

interface TickerState {
  tickers: Ticker[];
  fetchTickers: () => Promise<void>;
  currencyBase: string;
  currencyBaseOptions: string[];
}

export const useTickerStore = create<TickerState>((set) => ({
  tickers: [],
  currencyBase: "USD",
  currencyBaseOptions: ["USD", "EUR", "JPY"],

  fetchTickers: async () => {
    const res = await getTickers();
    set({
      tickers: res,
    });
  },
  setCurrencyBase: (currencyBase: string) => {
    set({ currencyBase });
  },
}));
