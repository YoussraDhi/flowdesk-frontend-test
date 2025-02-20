import axios from 'axios';

const API_KEY = "ef11429f-0670-4efa-adf7-49d107ddd85d";

export const makeAxiosInstance = () => {
  return axios.create({
    baseURL: 'https://api3.binance.com',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `${API_KEY}`
    },
  });
};

const axiosInstance = makeAxiosInstance();

export default axiosInstance;