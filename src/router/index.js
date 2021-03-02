import React, { useContext, useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { createStackNavigator } from '@react-navigation/stack';

import * as SplashScreen from 'expo-splash-screen';

import { AuthContext } from 'src/contexts';

/* Screens import */
import Onboarding from 'src/screens/Authentication';
import Login from 'src/screens/Authentication/Login';
import Register from 'src/screens/Authentication/Registration';
import RegisterFull from 'src/screens/Authentication/Registration/RegisterFull';
import VerifyWithCode from 'src/screens/Authentication/Verification';
import RecoverWithEmail from 'src/screens/Authentication/Recovery';

// Common screens
import FAQs from 'src/screens/Common/Extras/FAQs';

// Common User Screens
import Settings from 'src/screens/User/Common/Settings';
import EditProfile from 'src/screens/User/Common/EditProfile';
import Search from 'src/screens/User/Common/Search';
import Movies from 'src/screens/User/Common/Movies';
import LiveStream from 'src/screens/User/Common/LiveStream';
import Messaging from 'src/screens/User/Common/Messaging';
import Comments from 'src/screens/User/Common/Comments';
import Chats from 'src/screens/User/Common/Chats';

/* Routes import */
import UserRoute from './User';
import SocialRoute from './User/HomeTab/Socials';

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
      SocialRoute,
      EditProfile,
      Settings,
      Search,
      Movies,
      LiveStream,
      Messaging,
      Comments,
      Chats,
    },

    Common: {
      FAQs,
    },
  };

  useEffect(() => {
    (async () => {
      await SplashScreen.hideAsync();
    })();
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
