import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { BLACK } from '../../utils/colors';

function CommentIcon() {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M13.771 9.123l-1.399-1.398-3.869 3.864v1.398h1.398l3.87-3.864zM14.098 6l1.398 1.398-1.067 1.067-1.398-1.398L14.098 6z"
        fill={BLACK}
      />
      <Path
        d="M20 2H4c-1.103 0-2 .897-2 2v18l5.333-4H20c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zm0 14H6.667L4 18V4h16v12z"
        fill={BLACK}
      />
    </Svg>
  );
}

export default CommentIcon;
