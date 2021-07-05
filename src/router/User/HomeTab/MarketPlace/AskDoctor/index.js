import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import BottomNavigationArea from 'src/components/BottomNavigationArea';

// Screens
import MarketPlace from 'src/screens/User/HomeTab/MarketPlace/MarketPlaceTab';

import VideoUpload from 'src/screens/User/Common/VideoUpload';
import AskADoctor from 'src/screens/User/HomeTab/MarketPlace/MarketPlaceTab/AskADocVertical/AskADoctor/index';

const { Navigator, Screen } = createBottomTabNavigator();

export default function AskADoctorRoute() {
  return (
    <Navigator
      detachInactiveScreens
      tabBar={(props) => <BottomNavigationArea {...props} page="askADoc" />}
    >
      <Screen name="home" component={AskADoctor} />
      <Screen name="appointments" component={AskADoctor} />
      <Screen name="healthBlog" component={AskADoctor} />
    </Navigator>
  );
}
