import React from "react";
import FuzzyText from "@/blocks/TextAnimations/FuzzyText/FuzzyText";

export default function Loader() {
  return (
    <FuzzyText fontSize={52} baseIntensity={0.2} hoverIntensity={1}>
      {"Loading..."}
    </FuzzyText>
  );
}
