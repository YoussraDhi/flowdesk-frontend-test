import React from "react";
import "@/App.css";

import Aurora from "@/blocks/Backgrounds/Aurora/Aurora";
import GlitchText from "@/blocks/TextAnimations/GlitchText/GlitchText";
import TickerPairForm from "./tickerPairForm";

function Home(): React.ReactElement {
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
    </div>
  );
}

export default Home;
