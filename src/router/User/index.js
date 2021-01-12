import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import BottomNavigationArea from '~src/components/BottomNavigationArea';

import HomeTab from './HomeTab';

const { Navigator, Screen } = createBottomTabNavigator();

export default function UserRoute() {
  return (
    <Navigator
      detachInactiveScreens /* eslint-disable-next-line react/jsx-props-no-spreading */
      tabBar={(props) => <BottomNavigationArea {...props} page="user" />}
    >
      <Screen name="Home" component={HomeTab} />
      <Screen name="MyWallet" component={HomeTab} />
      <Screen name="BillPay" component={HomeTab} />
      <Screen name="MyActivities" component={HomeTab} />
    </Navigator>
  );
}
