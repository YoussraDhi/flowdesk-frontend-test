/*
	jsrepo 1.39.2
	Installed from https://reactbits.dev/ts/default/
	2-21-2025
*/

import { FC, CSSProperties } from "react";
import "./GlitchText.css";

interface GlitchTextProps {
  children: string;
  speed?: number;
  enableShadows?: boolean;
  enableOnHover?: boolean;
  className?: string;
  fontSize?: string; // Add fontSize prop
}

interface CustomCSSProperties extends CSSProperties {
  "--after-duration": string;
  "--before-duration": string;
  "--after-shadow": string;
  "--before-shadow": string;
  fontSize?: string; // Add fontSize to CustomCSSProperties
}

const GlitchText: FC<GlitchTextProps> = ({
  children,
  speed = 0.5,
  enableShadows = true,
  enableOnHover = false,
  className = "",
  fontSize = "inherit", // Default fontSize to inherit
}) => {
  const inlineStyles: CustomCSSProperties = {
    "--after-duration": `${speed * 3}s`,
    "--before-duration": `${speed * 2}s`,
    "--after-shadow": enableShadows ? "-5px 0 red" : "none",
    "--before-shadow": enableShadows ? "5px 0 cyan" : "none",
    fontSize, // Add fontSize to inlineStyles
  };

  const hoverClass = enableOnHover ? "enable-on-hover" : "";

  return (
    <div
      className={`glitch ${hoverClass} ${className}`}
      style={inlineStyles}
      data-text={children}
    >
      {children}
    </div>
  );
};

export default GlitchText;
