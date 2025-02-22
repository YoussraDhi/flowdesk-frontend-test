import React from "react";
import "@/App.css";

import Aurora from "@/blocks/Backgrounds/Aurora/Aurora";
import GlitchText from "@/blocks/TextAnimations/GlitchText/GlitchText";

function Home() {
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
    </div>
  );
}

export default Home;
