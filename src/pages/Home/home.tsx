import React from "react";
import "@/App.css";

import Aurora from "@/blocks/Backgrounds/Aurora/Aurora";
import GlitchText from "@/blocks/TextAnimations/GlitchText/GlitchText";
import TickerPairForm from "./tickerPairForm";
import { useTickerStore } from "@/store/tickerStore";

function Home() {
  const { ticker, tickerPair } = useTickerStore((state) => state);
  return (
    <div className="home">
      <Aurora colorStops={["#fca311", "#14213d", "#fca311"]} amplitude={0.6} />
      <GlitchText
        speed={1}
        enableShadows={true}
        enableOnHover={true}
        fontSize="52px"
      >
        Crypto Tracker
      </GlitchText>
      <TickerPairForm />
      {tickerPair && ticker && (
        <div>
          {Object.keys(ticker).map((t, idx) => (
            <div key={idx}>
              <p>
                {t}: {ticker[t]}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
