import React from 'react';

import {
  BottomNavigation,
  BottomNavigationTab,
  Layout,
  Divider,
} from '@ui-kitten/components';

import {
  IconHome,
  IconCreditCard,
  IconCalendar,
  IconClock,
} from './CustomIcons';

export default function BottomNavigationArea(props) {
  // eslint-disable-next-line react/prop-types
  const { navigation, state, style } = props;

  return (
    <Layout level="1">
      <Divider />
      <BottomNavigation
        appearance="noIndicator"
        style={[style, { backgroundColor: 'transparent' }]}
        /* eslint-disable-next-line react/prop-types */
        selectedIndex={state.index}
        /* eslint-disable-next-line react/prop-types */
        onSelect={(index) => navigation.navigate(state.routeNames[index])}
      >
        <BottomNavigationTab title="Home" icon={IconHome} />
        <BottomNavigationTab title="Wallet" icon={IconCreditCard} />
        <BottomNavigationTab title="Bill Pay" icon={IconCalendar} />
        <BottomNavigationTab title="Activities" icon={IconClock} />
      </BottomNavigation>
    </Layout>
  );
}
