import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { LIGHT_GREY } from '../../utils/colors';

function Clock() {
  return (
    <Svg
      width={15}
      height={15}
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M7.492 0C3.353 0 0 3.36 0 7.5 0 11.64 3.353 15 7.492 15 11.64 15 15 11.64 15 7.5 15 3.36 11.64 0 7.492 0zM7.5 13.5c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6zm.375-9.75H6.75v4.5l3.938 2.363.562-.923-3.375-2.002V3.75z"
        fill={LIGHT_GREY}
      />
    </Svg>
  );
}

export default Clock;
