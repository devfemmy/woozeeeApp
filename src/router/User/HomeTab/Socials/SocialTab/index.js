import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import Social from '~src/screens/User/HomeTab/Socials/SocialTab';

const { Navigator, Screen } = createStackNavigator();

export default function SocialTab() {
  return (
    <Navigator detachInactiveScreens headerMode="none">
      <Screen name="Social" component={Social} />
    </Navigator>
  );
}
