import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { BADGE_RED } from '../../utils/colors';

function StarIcon({ color = BADGE_RED, size = 11 }) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 11 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M4.549.927c.3-.921 1.603-.921 1.902 0l.508 1.564a1 1 0 00.951.691h1.645c.969 0 1.372 1.24.588 1.81l-1.33.966a1 1 0 00-.364 1.118l.508 1.565c.3.92-.755 1.687-1.539 1.118l-1.33-.967a1 1 0 00-1.176 0l-1.33.967c-.784.569-1.839-.197-1.54-1.118l.509-1.565a1 1 0 00-.363-1.118L.857 4.991c-.784-.569-.381-1.809.588-1.809H3.09a1 1 0 00.95-.69L4.55.926z"
        fill={color}
      />
    </Svg>
  );
}

export default StarIcon;
