import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { GREEN } from '../../utils/colors';

function VerifyIcon() {
  return (
    <Svg
      width={13}
      height={13}
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M3.75 4.583L5 5.833l4.167-4.166"
        stroke={GREEN}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8.75 5v2.917a.833.833 0 01-.833.833H2.083a.833.833 0 01-.833-.833V2.083a.833.833 0 01.833-.833h4.584"
        stroke={GREEN}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default VerifyIcon;
