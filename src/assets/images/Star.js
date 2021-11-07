import React from "react";
import { SvgCss } from "react-native-svg";

export default (props) => {
  const { fill, width, height } = props;
  const xml = `
    <svg width="7" height="7" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3.5 0L4.40519 2.25411L6.8287 2.41844L4.96463 3.97589L5.55725 6.33156L3.5 5.04L1.44275 6.33156L2.03537 3.97589L0.171302 2.41844L2.59481 2.25411L3.5 0Z" fill="white"/>
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
