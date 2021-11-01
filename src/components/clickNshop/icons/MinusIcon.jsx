import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { BADGE_RED } from '../../utils/colors';

function MinusIcon({ color = BADGE_RED }) {
  return (
    <Svg
      width={14}
      height={14}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M7 0a7 7 0 10.001 14.001A7 7 0 007 0zm3 7.375a.125.125 0 01-.125.125h-5.75A.125.125 0 014 7.375v-.75c0-.069.056-.125.125-.125h5.75c.069 0 .125.056.125.125v.75z"
        fill={color}
      />
    </Svg>
  );
}

export default MinusIcon;
