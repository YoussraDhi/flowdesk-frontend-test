import { useState, useEffect } from "react";
import { mainTokens } from "@/constant/mainToken";
import axiosInstance from "@/api/http/axiosInstance";
import { getExchangeInfo } from "../api/getTickers";

const useExchangeInfo = () => {
  const [exchangeInfo, setExchangeInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [popularPairs, setPopularPairs] = useState([]);

  const filterPopularPairs = (exchangeInfo) => {
    if (!exchangeInfo) return [];
    const popularPairs = exchangeInfo.symbols.filter(
      (symbol) =>
        mainTokens.includes(symbol.baseAsset) &&
        mainTokens.includes(symbol.quoteAsset) &&
        symbol.status === "TRADING"
    );
    setPopularPairs(popularPairs);
  };

  useEffect(() => {
    const fetchExchangeInfo = async () => {
      try {
        const exchangeInfo = await getExchangeInfo();
        setExchangeInfo(exchangeInfo);
        filterPopularPairs(exchangeInfo);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchExchangeInfo();
  }, []);

  return { exchangeInfo, loading, error, popularPairs };
};

export default useExchangeInfo;
