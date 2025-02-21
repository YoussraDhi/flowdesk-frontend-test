import React from "react";
import FuzzyText from "@/blocks/TextAnimations/FuzzyText/FuzzyText";

const Error = () => {
  return (
    <main>
      <FuzzyText fontSize={52} baseIntensity={0.1} hoverIntensity={1}>
        {"Error 404: \n Page not found".toUpperCase()}
      </FuzzyText>
    </main>
  );
};

export default Error;
