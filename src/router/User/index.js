import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import BottomNavigationArea from 'src/components/BottomNavigationArea';

import Home from 'src/screens/User/HomeTab';

import Wallet from 'src/screens/User/WalletTab';

import BillPay from 'src/screens/User/BillPayTab';

const { Navigator, Screen } = createBottomTabNavigator();

export default function UserRoute() {
  return (
    <Navigator
      detachInactiveScreens
      tabBar={(props) => <BottomNavigationArea {...props} page="user" />}
    >
      <Screen name="HomeTab" component={Home} />
      {/* <Screen name="MyWalletTab" component={Home} /> */}
      <Screen name="BillPayTab" component={BillPay} />
      {/* <Screen name="MyActivitiesTab" component={Home} /> */}
    </Navigator>
  );
}
