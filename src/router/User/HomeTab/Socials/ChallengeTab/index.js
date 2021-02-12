import React from 'react';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import TopTabsArea from 'src/components/TopTabsArea';

// Tabs
import ExploreTab from './ExploreTab';
import VersusTab from './VersusTab';

const { Navigator, Screen } = createMaterialTopTabNavigator();

export default function ChallengeRoute() {
  return (
    <Navigator
      detachInactiveScreens /* eslint-disable-next-line react/jsx-props-no-spreading */
      tabBar={(props) => <TopTabsArea {...props} page="challenge" />}
    >
      <Screen name="VersusTab" component={VersusTab} />
      <Screen name="ExploreTab" component={ExploreTab} />
    </Navigator>
  );
}
