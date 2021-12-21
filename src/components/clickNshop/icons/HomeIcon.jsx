import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { MAIN_BLUE, MAIN_GREY } from "../../utils/colors";

function HomeIcon({ active = false }) {
  if (active) {
    return (
      <Svg
        width={18}
        height={18}
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Path
          d="M17.486 8.863L9.441.824a.624.624 0 00-.882 0L.514 8.864a1.251 1.251 0 00.883 2.135h.847v5.735c0 .346.28.625.625.625H7.75v-4.375h2.188v4.375h5.193c.346 0 .625-.279.625-.625v-5.736h.848a1.251 1.251 0 00.883-2.135z"
          fill={MAIN_BLUE}
        />
      </Svg>
    );
  }
  return (
    <Svg
      width={18}
      height={18}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M17.486 8.863L9.441.824a.624.624 0 00-.882 0L.514 8.864a1.251 1.251 0 00.883 2.135h.847v5.735c0 .346.28.625.625.625H7.75v-4.375h2.188v4.375h5.193c.346 0 .625-.279.625-.625v-5.736h.848a1.251 1.251 0 00.883-2.135z"
        fill={MAIN_GREY}
      />
    </Svg>
  );
}

export default HomeIcon;
