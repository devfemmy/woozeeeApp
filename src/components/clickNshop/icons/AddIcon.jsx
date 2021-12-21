import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { BADGE_RED } from '../../utils/colors';

function AddIcon({ color = BADGE_RED }) {
  return (
    <Svg
      width={14}
      height={14}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M7 0a7 7 0 110 14A7 7 0 017 0zm0 3.5a.438.438 0 00-.43.359l-.008.079v2.624H3.938a.438.438 0 00-.078.869l.079.006h2.624v2.625a.438.438 0 00.869.08l.006-.08V7.438h2.625a.438.438 0 00.08-.869l-.08-.006H7.438V3.938A.437.437 0 007 3.5z"
        fill={color}
      />
    </Svg>
  );
}

export default AddIcon;
