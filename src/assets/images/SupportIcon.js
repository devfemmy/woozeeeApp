import React from "react";
import { SvgCss } from "react-native-svg";

export default (props) => {
  const { fill, width, height } = props;
  const xml = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#333333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M9.09 8.99999C9.3251 8.33166 9.78915 7.7681 10.4 7.40912C11.0108 7.05015 11.7289 6.91893 12.4272 7.0387C13.1255 7.15848 13.7588 7.52151 14.2151 8.06352C14.6713 8.60552 14.9211 9.29151 14.92 9.99999C14.92 12 11.92 13 11.92 13" stroke="#333333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M12 17H12.01" stroke="#333333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
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
