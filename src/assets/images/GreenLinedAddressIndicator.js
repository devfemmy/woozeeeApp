import React from "react";
import { SvgCss } from "react-native-svg";

export default (props) => {
  const { fill, width, height } = props;
  const xml = `
    <svg width="12" height="25" viewBox="0 0 12 25" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="6" cy="6" r="4" fill="#24924A" stroke="#25E365" stroke-width="3"/>
    <path d="M6 12L6 25" stroke="#25E365"/>
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
