import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import Home from '~src/screens/User/HomeTab';

const { Navigator, Screen } = createStackNavigator();

export default function HomeTab() {
  return (
    <Navigator detachInactiveScreens headerMode="none">
      <Screen name="Home" component={Home} />
    </Navigator>
  );
}
