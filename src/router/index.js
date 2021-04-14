import React, { useContext, useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { createStackNavigator } from '@react-navigation/stack';

import * as SplashScreen from 'expo-splash-screen';

import { AuthContext } from 'src/contexts';

/* Screens import */
import Intro from 'src/screens/Authentication';
import Login from 'src/screens/Authentication/Login';
import Register from 'src/screens/Authentication/Registration';
import RegisterFull from 'src/screens/Authentication/Registration/RegisterFull';
import VerifyWithCode from 'src/screens/Authentication/Verification';
import RecoverWithEmail from 'src/screens/Authentication/Recovery';

// Common screens
import FAQs from 'src/screens/Common/FAQs';
import TermsConditions from 'src/screens/Common/TermsConditions';
import PrivacyPolicy from 'src/screens/Common/PrivacyPolicy';

// Common User Screens
import Settings from 'src/screens/User/Common/Settings';
import EditProfile from 'src/screens/User/Common/EditProfile';
import Search from 'src/screens/User/Common/Search';
import Movies from 'src/screens/User/Common/Movies';
import LiveStream from 'src/screens/User/Common/LiveStream';
import Messaging from 'src/screens/User/Common/Messaging';
import Comments from 'src/screens/User/Common/Comments';
import Chats from 'src/screens/User/Common/Chats';
import Rankings from 'src/screens/User/Common/Rankings';
import UserProfile from 'src/screens/User/Common/UserProfile';
import Follow from 'src/screens/User/Common/Follow';

// Onboarding
import Onboarding from 'src/screens/User/Onboarding';

import ActivateWallet from 'src/screens/User/Onboarding/ActivateWallet';
import ActivateWalletPictureUpload from 'src/screens/User/Onboarding/ActivateWallet/PictureUpload';
import ActivateWalletOTPVerification from 'src/screens/User/Onboarding/ActivateWallet/OTPVerification';

import ActivateCare from 'src/screens/User/Onboarding/ActivateCare';
import ActivateCareSoloPlan from 'src/screens/User/Onboarding/ActivateCare/SoloPlan';
import ActivateCareFamilyPlan from 'src/screens/User/Onboarding/ActivateCare/FamilyPlan';
import ActivateCareElitePlan from 'src/screens/User/Onboarding/ActivateCare/ElitePlan';

/* Routes import */
import UserRoute from './User';
import SocialRoute from './User/HomeTab/Social';
import MarketPlaceRoute from './User/HomeTab/MarketPlace';
import CharityRoute from './User/HomeTab/Charity';

const { Navigator, Screen } = createStackNavigator();

export default function Router() {
  const { authState } = useContext(AuthContext);

  const screens = {
    Auth: {
      Intro,
      Login,
      Register,
      RegisterFull,
      VerifyWithCode,
      RecoverWithEmail,
    },

    User: {
      Onboarding,
      ActivateWallet,
      ActivateWalletPictureUpload,
      ActivateWalletOTPVerification,
      ActivateCare,
      ActivateCareSoloPlan,
      ActivateCareFamilyPlan,
      ActivateCareElitePlan,
      UserRoute,
      SocialRoute,
      MarketPlaceRoute,
      CharityRoute,
      EditProfile,
      Settings,
      Movies,
      LiveStream,
      Messaging,
      Comments,
      Chats,
      Search,
      Rankings,
      UserProfile,
      Follow,
    },

    Common: {
      FAQs,
      TermsConditions,
      PrivacyPolicy,
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
