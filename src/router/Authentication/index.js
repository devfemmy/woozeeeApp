import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import Login from '~src/screens/Authentication/Login';

import Registration from './Registration';
import Recovery from './Recovery';
import Verification from './Verification';

const { Navigator, Screen } = createStackNavigator();

export default function Authentication() {
  return (
    <Navigator headerMode="none" initialRouteName="Login" detachInactiveScreens>
      <Screen name="Login" component={Login} />
      <Screen name="Registration" component={Registration} />
      <Screen name="Recovery" component={Recovery} />
      <Screen name="Verification" component={Verification} />
    </Navigator>
  );
}
