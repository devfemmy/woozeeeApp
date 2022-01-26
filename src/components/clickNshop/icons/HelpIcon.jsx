import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { MAIN_BLUE, MAIN_GREY } from "../../utils/colors";

function HelpIcon({ active = false }) {
  if (active) {
    return (
      <Svg
        width={20}
        height={20}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Path
          d="M10 0a10 10 0 100 20 10 10 0 000-20zm-.137 16.156a1.03 1.03 0 110-2.061 1.03 1.03 0 010 2.061zm.856-5.037v1.075a.857.857 0 01-.813.85h-.069a.836.836 0 01-.868-.813v-1.725a.744.744 0 01.7-.819c.981-.074 2.612-.437 2.612-2.03 0-1.144-.881-1.92-2.144-1.92a3.319 3.319 0 00-2.5 1.2.85.85 0 01-1.468-.562c.003-.236.1-.46.269-.625a4.856 4.856 0 013.75-1.681c2.312 0 3.925 1.437 3.925 3.5 0 1.906-1.232 3.181-3.394 3.55z"
          fill={MAIN_BLUE}
        />
      </Svg>
    );
  }
  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M10 18.333a8.333 8.333 0 100-16.666 8.333 8.333 0 000 16.666z"
        stroke={MAIN_GREY}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M7.575 7.5a2.5 2.5 0 014.858.833c0 1.667-2.5 2.5-2.5 2.5M10 14.167h.008"
        stroke={MAIN_GREY}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default HelpIcon;
