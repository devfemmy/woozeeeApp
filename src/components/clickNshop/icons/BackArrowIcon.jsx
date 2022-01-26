import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { BLACK } from "../../utils/colors";

function BackArrowIcon() {
  return (
    <Svg
      width={18}
      height={12}
      viewBox="0 0 18 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M18 5H3.83l3.58-3.59L6 0 0 6l6 6 1.41-1.41L3.83 7H18V5z"
        fill={BLACK}
      />
    </Svg>
  );
}

export default BackArrowIcon;
