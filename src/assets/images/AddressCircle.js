import React from "react";
import { SvgCss } from "react-native-svg";

export default (props) => {
  const { fill, width, height } = props;
  const xml = `
    <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.5 8.00001C12.5 10.6167 10.3147 12.8333 7.5 12.8333C4.68532 12.8333 2.5 10.6167 2.5 8.00001C2.5 5.38329 4.68532 3.16667 7.5 3.16667C10.3147 3.16667 12.5 5.38329 12.5 8.00001Z" stroke="#00B272" stroke-width="5"/>
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
