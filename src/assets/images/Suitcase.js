import React from "react";
import { SvgCss } from "react-native-svg";

export default (props) => {
  const { fill, width, height } = props;
  const xml = `
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.6364 3.36368V1.29532L9.7055 0.45459H4.29459L3.36368 1.54259V3.36368H1.18186L0.45459 4.09095V12.8182L1.18186 13.5455H12.8182L13.5455 12.8182V4.09095L12.8182 3.36368H10.6364ZM4.81823 1.90914H9.18186V3.36368H4.81823V1.90914Z" fill=${
      fill ? fill : "white"
    }/>
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
