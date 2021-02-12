import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import Wooz from 'src/screens/User/HomeTab/Socials/WoozTab';

const { Navigator, Screen } = createStackNavigator();

export default function WoozTab() {
  return (
    <Navigator detachInactiveScreens headerMode="none">
      <Screen name="Wooz" component={Wooz} />
    </Navigator>
  );
}
