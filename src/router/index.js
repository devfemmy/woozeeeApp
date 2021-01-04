import React, { useContext, useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import * as SplashScreen from 'expo-splash-screen';

import { AuthContext } from '~src/contexts';

/* Screens import */
import Onboarding from '~src/screens/Authentication';
import Login from '~src/screens/Authentication/Login';
import RegisterMin from '~src/screens/Authentication/Registration';
import RegisterFull from '~src/screens/Authentication/Registration/RegisterFull';
import VerifyWithCode from '~src/screens/Authentication/Verification';
import RecoverWithEmail from '~src/screens/Authentication/Recovery';

/* Routes import */
import UserRoute from './User';

const { Navigator, Screen } = createStackNavigator();

export default function Router() {
  const { authState } = useContext(AuthContext);

  const screens = {
    Auth: {
      Onboarding,
      Login,
      RegisterMin,
      RegisterFull,
      VerifyWithCode,
      RecoverWithEmail,
    },

    User: {
      UserRoute,
    },
  };

  useEffect(() => {
    const hideSplash = async () => {
      await SplashScreen.hideAsync();
    };
    hideSplash()
      .then(() => {})
      .catch(() => {});
  }, []);

  return (
    <NavigationContainer>
      <Navigator detachInactiveScreens headerMode="none">
        {Object.entries({
          ...(authState.loginToken ? screens.User : screens.Auth),
        }).map(([name, component]) => (
          <Screen name={name} component={component} key={name} />
        ))}
      </Navigator>
    </NavigationContainer>
  );
}
