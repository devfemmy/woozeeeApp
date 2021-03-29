import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import BottomNavigationArea from 'src/components/BottomNavigationArea';

// Screens
import Social from 'src/screens/User/HomeTab/Social/SocialTab';
import Wooz from 'src/screens/User/HomeTab/Social/WoozTab';
import Profile from 'src/screens/User/HomeTab/Social/ProfileTab';

import VideoUpload from 'src/screens/User/Common/VideoUpload';

// Routes
import Challenge from './Challenge';

const { Navigator, Screen } = createBottomTabNavigator();

export default function SocialRoute() {
  return (
    <Navigator
      detachInactiveScreens
      tabBar={(props) => <BottomNavigationArea {...props} page="social" />}
    >
      <Screen name="SocialTab" component={Social} />
      <Screen name="WoozTab" component={Wooz} />
      <Screen name="VideoUpload" component={VideoUpload} />
      <Screen name="ChallengeTab" component={Challenge} />
      <Screen name="ProfileTab" component={Profile} />
    </Navigator>
  );
}
