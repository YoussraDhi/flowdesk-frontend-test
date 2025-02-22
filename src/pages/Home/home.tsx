import React from "react";
import "@/App.css";

import Aurora from "@/blocks/Backgrounds/Aurora/Aurora";
import GlitchText from "@/blocks/TextAnimations/GlitchText/GlitchText";
import TickerPairForm from "./tickerPairForm";

function Home(): React.ReactElement {
  return (
    <main>
      <div className="top-section">
        <Aurora
          colorStops={["#fca311", "#14213d", "#fca311"]}
          amplitude={0.6}
        />
        <GlitchText
          speed={1}
          enableShadows={true}
          enableOnHover={true}
          fontSize="52px"
        >
          Crypto Tracker
        </GlitchText>
        <button>
          <a href="/dashboard">View Market</a>
        </button>
        OR
        <h2>Select a Pair</h2>
      </div>
      <TickerPairForm />
    </main>
  );
}

export default Home;
