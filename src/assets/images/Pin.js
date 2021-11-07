import React from "react";
import { SvgCss } from "react-native-svg";

export default (props) => {
  const { fill, width, height } = props;
  const xml = `
    <svg width="12" height="20" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 0.410797C2.6856 0.410797 0 3.0856 0 6.3988C0 12.1276 6 19.5988 6 19.5988C6 19.5988 12 12.1264 12 6.3988C12 3.0868 9.3144 0.410797 6 0.410797ZM6 9.712C5.1407 9.712 4.31659 9.37064 3.70897 8.76302C3.10136 8.15541 2.76 7.3313 2.76 6.472C2.76 5.6127 3.10136 4.78859 3.70897 4.18097C4.31659 3.57335 5.1407 3.232 6 3.232C6.8593 3.232 7.68341 3.57335 8.29103 4.18097C8.89864 4.78859 9.24 5.6127 9.24 6.472C9.24 7.3313 8.89864 8.15541 8.29103 8.76302C7.68341 9.37064 6.8593 9.712 6 9.712Z" fill="#FF5757"/>
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
