import React from "react";
import { SvgCss } from "react-native-svg";

export default (props) => {
  const { fill, width, height } = props;
  const xml = `
    <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="20" height="1.5" fill="black" fill-opacity="0.8"/>
    <rect y="6" width="15" height="1.5" fill="black" fill-opacity="0.8"/>
    <rect y="12" width="10" height="1.5" fill="black" fill-opacity="0.8"/>
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
