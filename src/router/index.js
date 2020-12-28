import React, { useContext } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { AuthContext } from '~src/contexts';

import Authentication from './Authentication';

import Onboarding from '~src/screens/Onboarding';

const { Navigator, Screen } = createStackNavigator();

function RootNavigation() {
  const { authState } = useContext(AuthContext);

  return (
    <>
      {authState.loginToken ? (
        <Navigator
          headerMode="none"
          initialRouteName="Home"
          detachInactiveScreens
        >
          <Screen name="Home" component={Onboarding} />
        </Navigator>
      ) : (
        <Navigator
          headerMode="none"
          initialRouteName="Onboarding"
          detachInactiveScreens
        >
          <Screen name="Onboarding" component={Onboarding} />
          <Screen name="Authentication" component={Authentication} />
        </Navigator>
      )}
    </>
  );
}

export default function Router() {
  return (
    <NavigationContainer>
      <Navigator
        headerMode="none"
        initialRouteName="Root"
        detachInactiveScreens
      >
        <Screen name="Root" component={RootNavigation} />
      </Navigator>
    </NavigationContainer>
  );
}
