import axiosInstance from "./http/axiosInstance";

export const getTicker = async (symbol: string) => {
  const response = await axiosInstance.get(`/api/v3/ticker/price?symbol=${symbol}`);
  return response.data;
};