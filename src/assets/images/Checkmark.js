import React from "react";
import { SvgCss } from "react-native-svg";

export default (props) => {
  const { fill, width, height } = props;
  const xml = `
    <svg width="13" height="10" viewBox="0 0 13 10" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.455 0.454993C10.6649 0.246901 10.9483 0.129787 11.2439 0.128972C11.5395 0.128156 11.8235 0.243704 12.0346 0.450635C12.2456 0.657566 12.3668 0.939253 12.3718 1.2348C12.3769 1.53034 12.2654 1.81599 12.0615 2.02999L6.07349 9.51499C5.97058 9.62584 5.84637 9.7148 5.70829 9.77654C5.57021 9.83829 5.4211 9.87156 5.26987 9.87436C5.11864 9.87716 4.9684 9.84943 4.82813 9.79284C4.68786 9.73625 4.56044 9.65195 4.45349 9.54499L0.485992 5.57599C0.375462 5.473 0.286809 5.3488 0.225321 5.2108C0.163833 5.0728 0.13077 4.92383 0.128105 4.77278C0.12544 4.62172 0.153227 4.47168 0.209808 4.3316C0.26639 4.19151 0.350607 4.06426 0.457435 3.95744C0.564263 3.85061 0.691514 3.76639 0.831596 3.70981C0.971678 3.65323 1.12172 3.62544 1.27278 3.62811C1.42383 3.63077 1.5728 3.66383 1.7108 3.72532C1.8488 3.78681 1.973 3.87546 2.07599 3.98599L5.21699 7.12549L10.4265 0.487993C10.4358 0.476374 10.4458 0.465351 10.4565 0.454993H10.455Z" fill="white"/>
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
