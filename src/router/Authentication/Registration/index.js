import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import RegisterMin from '~src/screens/Authentication/Registration';
import RegisterFull from '~src/screens/Authentication/Registration/RegisterFull';

const { Navigator, Screen } = createStackNavigator();

export default function Registration() {
  return (
    <Navigator
      headerMode="none"
      initialRouteName="RegisterMin"
      detachInactiveScreens
    >
      <Screen name="RegisterMin" component={RegisterMin} />
      <Screen name="RegisterFull" component={RegisterFull} />
    </Navigator>
  );
}
