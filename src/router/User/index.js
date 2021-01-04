import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import BottomNavigationArea from '~src/components/BottomNavigationArea';

import HomeRoute from './Home';

const { Navigator, Screen } = createBottomTabNavigator();

export default function UserRoute() {
  return (
    <Navigator
      detachInactiveScreens /* eslint-disable-next-line react/jsx-props-no-spreading */
      tabBar={(props) => <BottomNavigationArea {...props} />}
    >
      <Screen name="Home" component={HomeRoute} />
    </Navigator>
  );
}
