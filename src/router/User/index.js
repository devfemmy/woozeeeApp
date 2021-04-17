import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import BottomNavigationArea from 'src/components/BottomNavigationArea';

import Home from 'src/screens/User/HomeTab';

import WalletTab from 'src/screens/User/WalletTab';

const { Navigator, Screen } = createBottomTabNavigator();

export default function UserRoute() {
  return (
    <Navigator
      detachInactiveScreens
      tabBar={(props) => <BottomNavigationArea {...props} page="user" />}
    >
      <Screen name="HomeTab" component={Home} />
      <Screen name="MyWalletTab" component={WalletTab} />
      <Screen name="BillPayTab" component={Home} />
      <Screen name="MyActivitiesTab" component={Home} />
    </Navigator>
  );
}
