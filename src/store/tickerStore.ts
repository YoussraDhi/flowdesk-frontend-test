import { create } from "zustand";
import { getTickers } from "@/api/getTickers";
import { Ticker } from "@/types/Ticker";
import { getLivePrice } from "@/api/getTickers";

interface TickerState {
  tickers: Ticker[];
  fetchTickers: () => Promise<void>;
  setTickerPrice: (tickers: Ticker[]) => void;
  currencyBase: string;
  currencyBaseOptions: string[];
}

export const useTickerStore = create<TickerState>((set, get) => ({
  tickers: [],
  currencyBase: "USD",
  currencyBaseOptions: ["USD", "EUR", "JPY"],

  fetchTickers: async () => {
    const res = await getTickers();
    set({
      tickers: res,
    });
    get().setTickerPrice(res);
  },
  setTickerPrice: (tickers: Ticker[]) => {
    if (!tickers.length) return;

    tickers.forEach((ticker: Ticker) => {
      const livePriceSocket = getLivePrice(ticker.symbol);
      if (livePriceSocket) {
        livePriceSocket.onmessage = (e: MessageEvent) => {
          const updatedPrice = JSON.parse(e.data).p;
          set((state) => ({
            tickers: state.tickers.map((t) =>
              t.symbol === ticker.symbol ? { ...t, price: updatedPrice } : t
            ),
          }));
        };
      }
    });
  },
  setCurrencyBase: (currencyBase: string) => {
    set({ currencyBase });
  },
}));
