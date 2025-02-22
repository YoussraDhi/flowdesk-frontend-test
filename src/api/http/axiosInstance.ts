import axios from "axios";

export const makeAxiosInstance = () => {
  return axios.create({
    baseURL: "https://api4.binance.com/api",
    headers: {
      "Content-Type": "application/json",
    },
    timeout: 10000,
  });
};

const axiosInstance = makeAxiosInstance();

export default axiosInstance;
