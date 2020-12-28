import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import RecoverWithEmail from '~src/screens/Authentication/Recovery';

const { Navigator, Screen } = createStackNavigator();

export default function Recovery() {
  return (
    <Navigator
      headerMode="none"
      initialRouteName="RecoverWithEmail"
      detachInactiveScreens
    >
      <Screen name="RecoverWithEmail" component={RecoverWithEmail} />
      {/* can add other recovery options/screens */}
    </Navigator>
  );
}
