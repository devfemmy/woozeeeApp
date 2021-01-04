import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import Home from '~src/screens/User/Home';

const { Navigator, Screen } = createStackNavigator();

export default function HomeRoute() {
  return (
    <Navigator detachInactiveScreens headerMode="none">
      <Screen name="Home" component={Home} />
    </Navigator>
  );
}
