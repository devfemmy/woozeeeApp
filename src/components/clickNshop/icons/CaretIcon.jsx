import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function CaretIcon({ color = '#FFF' }) {
  return (
    <Svg
      width={11}
      height={7}
      viewBox="0 0 11 7"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M1.75 1.625l3.75 3.75 3.75-3.75"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default CaretIcon;
