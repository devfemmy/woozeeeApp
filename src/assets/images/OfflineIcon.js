import React from "react";
import { SvgCss } from "react-native-svg";

export default (props) => {
  const { fill, width, height } = props;
  const xml = `
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.01 0.00362152C3.51 0.493622 0 4.31362 0 8.95362C0 11.3406 0.948211 13.6298 2.63604 15.3176C4.32387 17.0054 6.61305 17.9536 9 17.9536C13.63 17.9536 17.45 14.4536 17.95 9.95362C18.04 9.16362 17.17 8.53362 16.41 9.00362C15.5937 9.52468 14.6523 9.81675 13.6844 9.84927C12.7165 9.88178 11.7576 9.65354 10.9082 9.18843C10.0587 8.72333 9.34988 8.03845 8.85586 7.20548C8.36183 6.37252 8.10077 5.42207 8.1 4.45362C8.1 3.39362 8.41 2.39362 8.94 1.56362C9.39 0.893622 8.9 -0.0663785 8.01 0.00362152Z" fill="#343434"/>
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
