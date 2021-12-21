import * as React from "react";
import Svg, { Path } from "react-native-svg";

function VanIcon() {
  return (
    <Svg
      width={22}
      height={13}
      viewBox="0 0 22 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M2 0C.89 0 0 .89 0 2v8h2a3 3 0 006 0h6a3 3 0 106 0h2V6c0-1.11-.89-2-2-2l-3-4H2zm12 1.5h2.5L18.46 4H14V1.5zm-9 7a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm12 0a1.5 1.5 0 110 3 1.5 1.5 0 010-3z"
        fill="#fff"
      />
    </Svg>
  );
}

export default VanIcon;
