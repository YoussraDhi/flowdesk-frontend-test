import React, { useEffect } from "react";
import Dropover from "@/components/ui/Dropovoer";
import { mainTokens } from "@/constant/mainToken";
import { useTickerStore } from "@/store/tickerStore";

export default function TickerPairForm() {
  const [firstToken, setFirstToken] = React.useState("BTC");
  const [secondToken, setSecondToken] = React.useState("ETH");
  const [tickerPair, setTickerPair] = React.useState(
    `${firstToken}${secondToken}`
  );
  const currencyBaseOptions = useTickerStore(
    (state) => state.currencyBaseOptions
  );
  const setTickerPairInStore = useTickerStore((state) => state.setTickerPair);
  const fetchTicker = useTickerStore((state) => state.fetchTicker);

  useEffect(() => {
    setTickerPair(`${firstToken}${secondToken}`);
  }, [firstToken, secondToken]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTickerPairInStore(tickerPair);
    fetchTicker();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Dropover
          options={[...mainTokens, ...currencyBaseOptions]}
          value={firstToken}
          onChange={(token: string) => setFirstToken(token)}
        />
        <label>
          <Dropover
            options={[...mainTokens, ...currencyBaseOptions].filter(
              (token: string) => token !== firstToken
            )}
            value={secondToken}
            onChange={(token: string) => setSecondToken(token)}
          />
        </label>
        <button type="submit">Go</button>
      </form>
    </>
  );
}
