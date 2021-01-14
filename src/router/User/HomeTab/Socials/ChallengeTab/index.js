import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import Challenge from '~src/screens/User/HomeTab/Socials/ChallengeTab';

const { Navigator, Screen } = createStackNavigator();

export default function ChallengeTab() {
  return (
    <Navigator detachInactiveScreens headerMode="none">
      <Screen name="Challenge" component={Challenge} />
    </Navigator>
  );
}
