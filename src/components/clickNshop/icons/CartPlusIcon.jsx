import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function CartPlusIcon() {
  return (
    <Svg
      width={23}
      height={23}
      viewBox="0 0 23 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.75 6.5a.75.75 0 01.75.75v3a.75.75 0 01-.75.75h-3a.75.75 0 110-1.5H12V7.25a.75.75 0 01.75-.75z"
        fill="#fff"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 10.25a.75.75 0 01.75-.75h3a.75.75 0 110 1.5H13.5v2.25a.75.75 0 11-1.5 0v-3z"
        fill="#fff"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 1.25A.75.75 0 01.75.5H3a.75.75 0 01.728.569L4.335 3.5H21.75a.75.75 0 01.736.888l-2.25 12A.75.75 0 0119.5 17H6a.75.75 0 01-.737-.612L3.015 4.41 2.415 2H.75A.75.75 0 010 1.25zM4.653 5l1.97 10.5h12.255L20.847 5H4.653zM7.5 17a3 3 0 100 6 3 3 0 000-6zM18 17a3 3 0 100 6 3 3 0 000-6zM7.5 18.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm10.5 0a1.5 1.5 0 100 3 1.5 1.5 0 000-3z"
        fill="#fff"
      />
    </Svg>
  );
}

export default CartPlusIcon;
