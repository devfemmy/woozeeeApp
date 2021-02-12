import React from 'react';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import TopTabsArea from 'src/components/TopTabsArea';

import Versus from 'src/screens/User/HomeTab/Socials/ChallengeTab/VersusTab';
import Explore from 'src/screens/User/HomeTab/Socials/ChallengeTab/ExploreTab';

const { Navigator, Screen } = createMaterialTopTabNavigator();

export default function ChallengeRoute() {
  return (
    <Navigator
      detachInactiveScreens
      tabBar={(props) => <TopTabsArea {...props} page="challenge" />}
    >
      <Screen name="VersusTab" component={Versus} />
      <Screen name="ExploreTab" component={Explore} />
    </Navigator>
  );
}
