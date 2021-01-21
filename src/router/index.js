import React, { useContext, useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import * as SplashScreen from 'expo-splash-screen';

import { AuthContext } from '~src/contexts';

/* Screens import */
import Onboarding from '~src/screens/Authentication';
import Login from '~src/screens/Authentication/Login';
import Register from '~src/screens/Authentication/Registration';
import RegisterFull from '~src/screens/Authentication/Registration/RegisterFull';
import VerifyWithCode from '~src/screens/Authentication/Verification';
import RecoverWithEmail from '~src/screens/Authentication/Recovery';

// Common screens
import TermsConditions from '~src/screens/Common/Extras/TermsCondtitons';
import PrivacyPolicy from '~src/screens/Common/Extras/PrivacyPolicy';
import FAQs from '~src/screens/Common/Extras/FAQs';

// Common User Screens
import Settings from '~src/screens/User/Common/Settings';
import EditProfile from '~src/screens/User/Common/EditProfile';

/* Routes import */
import UserRoute from './User';
import SocialsRoute from './User/HomeTab/Socials';

const { Navigator, Screen } = createStackNavigator();

export default function Router() {
  const { authState } = useContext(AuthContext);

  const screens = {
    Auth: {
      Onboarding,
      Login,
      Register,
      RegisterFull,
      VerifyWithCode,
      RecoverWithEmail,
    },

    User: {
      UserRoute,
      SocialsRoute,
      EditProfile,
      Settings,
    },

    Common: {
      TermsConditions,
      PrivacyPolicy,
      FAQs,
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
          ...screens.Common,
        }).map(([name, component]) => (
          <Screen name={name} component={component} key={name} />
        ))}
      </Navigator>
    </NavigationContainer>
  );
}
