import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import Explore from '~src/screens/User/HomeTab/Socials/ExploreTab';

import ViewAll from '~src/screens/User/HomeTab/Socials/ExploreTab/ViewAll';

const { Navigator, Screen } = createStackNavigator();

export default function ExploreTab() {
  return (
    <Navigator detachInactiveScreens headerMode="none">
      <Screen name="Explore" component={Explore} />
      <Screen name="ViewAll" component={ViewAll} />
    </Navigator>
  );
}
