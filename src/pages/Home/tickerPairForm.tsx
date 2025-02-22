import React, { useEffect, useRef } from "react";
import Dropover from "@/components/ui/Dropovoer";
import { useTickerStore } from "@/store/tickerStore";
import styled from "styled-components";
import useExchangeInfo from "@/hooks/useExchangeInfo";
import Loader from "@/components/ui/Loader";
import { getLivePrice } from "@/api/getTickers";

const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const Error = styled.p`
  color: red;
`;

const PairDataContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  width: 100%;
  max-width: 1200px;
  padding: 1rem;
  border-radius: 8px;
  margin-top: 1rem;
`;

const DataItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ChangePercentage = styled.span<{ $isPositive: boolean }>`
  color: ${(props) => (props.$isPositive ? "#00ff00" : "#ff0000")};
`;

const ChangePrice = styled.span<{ $isHigher: boolean }>`
  color: ${(props) => (props.$isHigher ? "#00ff00" : "#ff0000")};
`;

export default function TickerPairForm() {
  const setTickerPairInStore = useTickerStore((state) => state.setTickerPair);
  const fetchTicker = useTickerStore((state) => state.fetchTicker);
  const defaultPair = useTickerStore((state) => state.tickerPair);
  const { ticker, tickerPair } = useTickerStore((state) => state);

  const [firstToken, setFirstToken] = React.useState(defaultPair.slice(0, 3));
  const [secondToken, setSecondToken] = React.useState(defaultPair.slice(3));
  const [tickerPairState, setTickerPairState] = React.useState(
    `${firstToken}${secondToken}`
  );
  const [error, setError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [livePrice, setLivePrice] = React.useState<string | null>(
    ticker?.lastPrice
  );
  const wsRef = useRef<WebSocket | null>(null);

  const { popularPairs } = useExchangeInfo();

  const firstTokenOptions = Array.from(
    new Set(popularPairs.map((pair) => pair.baseAsset))
  );
  const secondTokenOptions = popularPairs
    .filter((pair) => pair.baseAsset === firstToken)
    .map((pair) => pair.quoteAsset);

  useEffect(() => {
    setTickerPairState(`${firstToken}${secondToken}`);
    setError(null);
  }, [firstToken, secondToken]);

  useEffect(() => {
    if (wsRef.current) {
      wsRef.current.close();
    }

    const ws = getLivePrice(tickerPair);
    wsRef.current = ws;

    ws.onmessage = (event) => {
      const response = JSON.parse(event.data);
      setLivePrice(response.p);
    };

    ws.onclose = () => {
      wsRef.current = null;
    };

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [tickerPair]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTickerPairInStore(tickerPairState);
    // Check that the tickerPair exists in the popularPairs
    if (!popularPairs.find((pair) => pair.symbol === tickerPairState)) {
      setError("Invalid pair");
      return;
    }
    try {
      setIsLoading(true);
      await fetchTicker();
      setIsLoading(false);
    } catch (error) {
      setError("Error fetching ticker");
      setIsLoading(false);
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Dropover
          options={firstTokenOptions}
          value={firstToken}
          onChange={(token: string) => setFirstToken(token)}
        />
        <label>
          <Dropover
            options={secondTokenOptions}
            value={secondToken}
            onChange={(token: string) => setSecondToken(token)}
          />
        </label>
        <button type="submit">Go</button>
      </Form>
      {isLoading && <Loader />}
      {error && <Error>{error}</Error>}
      {!isLoading && tickerPair && ticker && (
        <PairDataContainer>
          <DataItem>
            <span>Price</span>
            <ChangePrice
              $isHigher={
                parseFloat(livePrice) > parseFloat(ticker.weightedAvgPrice)
              }
            >
              {parseFloat(livePrice).toFixed(2)}
            </ChangePrice>
          </DataItem>
          <DataItem>
            <span>Volume</span>
            <span>{ticker.volume}</span>
          </DataItem>
          <DataItem>
            <span>Open Time</span>
            <span>{new Date(ticker.openTime).toLocaleString()}</span>
          </DataItem>
          <DataItem>
            <span>Close Time</span>
            <span>{new Date(ticker.closeTime).toLocaleString()}</span>
          </DataItem>
          <DataItem>
            <span>Change %</span>
            <ChangePercentage
              $isPositive={parseFloat(ticker.priceChangePercent) > 0}
            >
              {ticker.priceChangePercent}%
            </ChangePercentage>
          </DataItem>
        </PairDataContainer>
      )}
    </>
  );
}
