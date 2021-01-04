import React from 'react';

import { BottomNavigation, BottomNavigationTab } from '@ui-kitten/components';

import { IconHome } from './CustomIcons';

export default function BottomNavigationArea(props) {
  // eslint-disable-next-line react/prop-types
  const { navigation, state } = props;

  return (
    <BottomNavigation
      /* eslint-disable-next-line react/prop-types */
      selectedIndex={state.index}
      /* eslint-disable-next-line react/prop-types */
      onSelect={(index) => navigation.navigate(state.routeNames[index])}
    >
      <BottomNavigationTab title="HOME" icon={IconHome} />
    </BottomNavigation>
  );
}
