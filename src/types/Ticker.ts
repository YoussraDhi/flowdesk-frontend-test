export type Ticker = {
  symbol: string;
  price: string;
  priceChange: string; // Absolute price change
  priceChangePercent: string; // Relative price change in percent
  weightedAvgPrice: string; // QuoteVolume / Volume
  openPrice: string;
  highPrice: string;
  lowPrice: string;
  lastPrice: string;
  volume: string;
  quoteVolume: string; // Sum of (price * volume) for all trades
  openTime: number; // Open time for ticker window
  closeTime: number; // Close time for ticker window
  firstId: number; // Trade IDs
  lastId: number;
  count: number; // Number of trades in the interval
};
