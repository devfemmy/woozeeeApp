import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import Versus from 'src/screens/User/HomeTab/Socials/ChallengeTab/VersusTab';

const { Navigator, Screen } = createStackNavigator();

export default function VersusTab() {
  return (
    <Navigator detachInactiveScreens headerMode="none">
      <Screen name="Versus" component={Versus} />
    </Navigator>
  );
}
