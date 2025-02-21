import React from "react";
import GlitchText from "@/blocks/TextAnimations/GlitchText/GlitchText";

const Logo = () => {
  return (
    <>
      <GlitchText
        speed={1}
        enableShadows={true}
        enableOnHover={true}
        fontSize="32px"
      >
        Crypto Tracker
      </GlitchText>
    </>
  );
};

export default Logo;
