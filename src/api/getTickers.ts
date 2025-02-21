import axiosInstance from "./http/axiosInstance";
import { Ticker } from "@/types/Ticker";

export const getLivePrice = (symbol: string) => {
  return new WebSocket(`wss://stream.binance.com:9443/ws/${symbol}@trade`);
};

export const getTickers = async (): Promise<Ticker[]> => {
  const response = await axiosInstance.get("/v3/ticker/24hr");
  // const livePrice = getLivePrice("btcusdt");
  // livePrice.onmessage = (e: MessageEvent) => {
  //   console.log(JSON.parse(e.data));
  // };
  return response.data;
};

export const getTicker = async (symbol: string) => {
  const response = await axiosInstance.get(`/v3/ticker/price?symbol=${symbol}`);
  return response.data;
};
