import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { BADGE_RED } from '../../utils/colors';

function ShareIcon({ color = BADGE_RED }) {
  return (
    <Svg
      width={18}
      height={22}
      viewBox="0 0 18 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M1 11v8a2 2 0 002 2h12a2 2 0 002-2v-8M13 5L9 1 5 5M9 1v13"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default ShareIcon;
