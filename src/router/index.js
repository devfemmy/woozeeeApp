import React, { useContext } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { AuthContext } from '~src/contexts';

/* Screens import */
import Onboarding from '~src/screens/Onboarding';
import Login from '~src/screens/Authentication/Login';
import RegisterMin from '~src/screens/Authentication/Registration';
import RegisterFull from '~src/screens/Authentication/Registration/RegisterFull';
import VerifyWithCode from '~src/screens/Authentication/Verification';
import RecoverWithEmail from '~src/screens/Authentication/Recovery';

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
      // Home,
    },
  };

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
