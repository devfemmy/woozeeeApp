import React from "react";
import { SvgCss } from "react-native-svg";

export default (props) => {
  const { fill, width, height } = props;
  const xml = `
    <svg width="27" height="50" viewBox="0 0 27 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="13.96" y1="21.76" x2="13.96" y2="49.84" stroke="black" stroke-opacity="0.6" stroke-width="2"/>
    <circle cx="13.5" cy="13.66" r="10" fill="white" stroke="#00B272" stroke-width="7"/>
    </svg>       
`;
  return (
    <SvgCss
      xml={xml}
      width={width || "100%"}
      height={height || "100%"}
      fill={fill}
    />
  );
};
