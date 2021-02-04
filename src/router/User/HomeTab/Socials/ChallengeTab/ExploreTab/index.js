import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import Explore from '~src/screens/User/HomeTab/Socials/ChallengeTab/ExploreTab';

const { Navigator, Screen } = createStackNavigator();

export default function ExploreTab() {
  return (
    <Navigator detachInactiveScreens headerMode="none">
      <Screen name="Explore" component={Explore} />
    </Navigator>
  );
}
