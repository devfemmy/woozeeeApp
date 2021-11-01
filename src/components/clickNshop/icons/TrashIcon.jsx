import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { BADGE_RED } from '../../utils/colors';

function TrashIcon({ color = BADGE_RED }) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
        fill={color}
      />
    </Svg>
  );
}

export default TrashIcon;
