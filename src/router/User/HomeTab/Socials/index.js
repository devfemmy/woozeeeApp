import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import BottomNavigationArea from 'src/components/BottomNavigationArea';

// Screens
import Social from 'src/screens/User/HomeTab/Socials/SocialTab';
import Wooz from 'src/screens/User/HomeTab/Socials/WoozTab';
import Profile from 'src/screens/User/HomeTab/Socials/ProfileTab';
import Challenge from 'src/screens/User/HomeTab/Socials/ChallengeTab';

const { Navigator, Screen } = createBottomTabNavigator();

export default function SocialRoute() {
  return (
    <Navigator
      detachInactiveScreens
      tabBar={(props) => <BottomNavigationArea {...props} page="social" />}
    >
      <Screen name="SocialTab" component={Social} />
      <Screen name="WoozTab" component={Wooz} />
      <Screen name="UploadVideo" component={Social} />
      <Screen name="ChallengeTab" component={Challenge} />
      <Screen name="ProfileTab" component={Profile} />
    </Navigator>
  );
}
