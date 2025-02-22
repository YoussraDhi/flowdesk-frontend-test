import React, { useEffect } from "react";
import Dropover from "@/components/ui/Dropovoer";
import { useTickerStore } from "@/store/tickerStore";

import styled from "styled-components";
import useExchangeInfo from "@/hooks/useExchangeInfo";
import Loader from "@/components/ui/Loader";

const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const Error = styled.p`
  color: red;
`;

export default function TickerPairForm() {
  const setTickerPairInStore = useTickerStore((state) => state.setTickerPair);
  const fetchTicker = useTickerStore((state) => state.fetchTicker);
  const defaultPair = useTickerStore((state) => state.tickerPair);

  const [firstToken, setFirstToken] = React.useState(defaultPair.slice(0, 3));
  const [secondToken, setSecondToken] = React.useState(defaultPair.slice(3));
  const [tickerPair, setTickerPair] = React.useState(
    `${firstToken}${secondToken}`
  );
  const [error, setError] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const { popularPairs } = useExchangeInfo();

  const firstTokenOptions = Array.from(
    new Set(popularPairs.map((pair) => pair.baseAsset))
  );
  const secondTokenOptions = popularPairs
    .filter((pair) => pair.baseAsset === firstToken)
    .map((pair) => pair.quoteAsset);

  useEffect(() => {
    setTickerPair(`${firstToken}${secondToken}`);
    setError(null);
  }, [firstToken, secondToken]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTickerPairInStore(tickerPair);
    //check that the tickerPair exists in the popularPairs
    if (!popularPairs.find((pair) => pair.symbol === tickerPair)) {
      setError("Invalid pair");
      return;
    }
    try {
      setIsLoading(true);
      fetchTicker();
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
    </>
  );
}
