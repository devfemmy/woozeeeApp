import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import Challenge from 'src/screens/User/HomeTab/Social/ChallengeTab';

import ChallengeWooz from 'src/screens/User/HomeTab/Social/ChallengeTab/ChallengeWooz';

const { Navigator, Screen } = createStackNavigator();

export default function ChallengeRoute() {
  return (
    <Navigator headerMode="none" detachInactiveScreens>
      <Screen name="Challenge" component={Challenge} />
      <Screen name="ChallengeWooz" component={ChallengeWooz} />
    </Navigator>
  );
}
