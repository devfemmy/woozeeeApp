import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { BLACK } from "../../utils/colors";

function CartIcon() {
  return (
    <Svg
      width={22}
      height={22}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M7.5 21.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM18 21.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM21 4.25H4.365L3.75 1.1A.75.75 0 003 .5H0V2h2.385L5.25 16.4A.75.75 0 006 17h13.5v-1.5H6.615L6 12.5h13.5a.75.75 0 00.75-.585l1.5-6.75A.751.751 0 0021 4.25zM18.9 11H5.715l-1.05-5.25h15.398L18.9 11z"
        fill={BLACK}
      />
    </Svg>
  );
}

export default CartIcon;
