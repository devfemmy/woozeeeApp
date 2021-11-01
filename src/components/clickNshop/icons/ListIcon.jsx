import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function ListIcon() {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M7.059 0v6.857H24V0H7.059zm0 24H24v-6.857H7.059V24zm0-8.571H24V8.57H7.059v6.858zM0 6.857h5.647V0H0v6.857zM0 24h5.647v-6.857H0V24zm0-8.571h5.647V8.57H0v6.858z"
        fill="#fff"
      />
    </Svg>
  );
}

export default ListIcon;
