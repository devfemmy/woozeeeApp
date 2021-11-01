import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { BLACK } from '../../utils/colors';

function BoxIcon() {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M20 3H4c-1.103 0-2 .897-2 2v2c0 .736.405 1.375 1 1.722V19c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V8.722c.595-.347 1-.986 1-1.722V5c0-1.103-.897-2-2-2zM4 5h16l.002 2H4V5zm1 14V9h14l.002 10H5z"
        fill={BLACK}
      />
      <Path d="M8 11h8v2H8v-2z" fill={BLACK} />
    </Svg>
  );
}

export default BoxIcon;
