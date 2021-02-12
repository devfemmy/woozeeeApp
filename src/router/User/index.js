import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import BottomNavigationArea from 'src/components/BottomNavigationArea';

import HomeTab from './HomeTab';

const { Navigator, Screen } = createBottomTabNavigator();

export default function UserRoute() {
  return (
    <Navigator
      detachInactiveScreens /* eslint-disable-next-line react/jsx-props-no-spreading */
      tabBar={(props) => <BottomNavigationArea {...props} page="user" />}
    >
      <Screen name="HomeTab" component={HomeTab} />
      <Screen name="MyWalletTab" component={HomeTab} />
      <Screen name="BillPayTab" component={HomeTab} />
      <Screen name="MyActivitiesTab" component={HomeTab} />
    </Navigator>
  );
}
