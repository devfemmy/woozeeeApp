import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function TilesIcon() {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M0 10.667h10.667V0H0v10.667zM0 24h10.667V13.333H0V24zm13.333 0H24V13.333H13.333V24zm0-24v10.667H24V0"
        fill="#fff"
      />
    </Svg>
  );
}

export default TilesIcon;
