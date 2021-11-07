import React from "react";
import { SvgCss } from "react-native-svg";

export default (props) => {
  const { fill, width, height } = props;
  const xml = `
    <svg width="12" height="21" viewBox="0 0 12 21" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 0L6 13" stroke="#FD5555"/>
    <circle cx="6" cy="15" r="4" fill="#BA1A1A" stroke="#FD5555" stroke-width="3"/>
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
