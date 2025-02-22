import axiosInstance from "./http/axiosInstance";
import { Ticker } from "@/types/Ticker";

export const getLivePrice = (symbol: string) => {
  return new WebSocket(
    `wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@trade`
  );
};

export const getExchangeInfo = async () => {
  const response = await axiosInstance.get("/v3/exchangeInfo");
  return response.data;
};

export const getTickers = async (): Promise<Ticker[]> => {
  const response = await axiosInstance.get("/v3/ticker/24hr");
  return response.data;
};

export const getTicker = async (symbol: string): Promise<Ticker> => {
  const response = await axiosInstance.get(`/v3/ticker/24hr?symbol=${symbol}`);
  return response.data;
};

export const getTickerHistory = async (symbol: string) => {
  const response = await axiosInstance.get(
    `/v1/klines?symbol=${symbol}&interval=1d&limit=30`
  );
  return response.data;
};
