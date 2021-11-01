import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { MAIN_BLUE, MAIN_GREY } from "../../utils/colors";

function AccountIcon({ active = false }) {
  if (active) {
    return (
      <Svg
        width={18}
        height={19}
        viewBox="0 0 18 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Path
          d="M4.5 4.5C4.5 6.981 6.519 9 9 9s4.5-2.019 4.5-4.5S11.481 0 9 0a4.505 4.505 0 00-4.5 4.5zM17 19h1v-1c0-3.859-3.141-7-7-7H7c-3.86 0-7 3.141-7 7v1h17z"
          fill={MAIN_BLUE}
        />
      </Svg>
    );
  }
  return (
    <Svg
      width={18}
      height={19}
      viewBox="0 0 18 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M9 8a3.505 3.505 0 01-3.5-3.5C5.5 2.571 7.071 1 9 1s3.5 1.571 3.5 3.5S10.929 8 9 8zm2 4c3.307 0 6 2.693 6 6H1c0-3.307 2.692-6 6-6h4z"
        stroke={MAIN_GREY}
        strokeWidth={2}
      />
    </Svg>
  );
}

export default AccountIcon;
