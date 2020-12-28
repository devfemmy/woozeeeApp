import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import VerifyWithCode from '~src/screens/Authentication/Verification';

const { Navigator, Screen } = createStackNavigator();

export default function Verification() {
  return (
    <Navigator
      headerMode="none"
      initialRouteName="VerifyWithCode"
      detachInactiveScreens
    >
      <Screen name="VerifyWithCode" component={VerifyWithCode} />
      {/*  can add other verification methods/screens */}
    </Navigator>
  );
}
