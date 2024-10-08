import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function PhoneIcon({ size = 18 }) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M17.01 12.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H1.19C.65 0 0 .24 0 .99 0 10.28 7.73 18 17.01 18c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"
        fill="#fff"
      />
    </Svg>
  );
}

export default PhoneIcon;
