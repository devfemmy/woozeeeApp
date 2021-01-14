import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import Profile from '~src/screens/User/HomeTab/Socials/ProfileTab';

const { Navigator, Screen } = createStackNavigator();

export default function ProfileTab() {
  return (
    <Navigator detachInactiveScreens headerMode="none">
      <Screen name="Profile" component={Profile} />
    </Navigator>
  );
}
