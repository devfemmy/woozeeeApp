import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import BottomNavigationArea from 'src/components/BottomNavigationArea';

// Screens
import MarketPlace from 'src/screens/User/HomeTab/MarketPlace/MarketPlaceTab';

import VideoUpload from 'src/screens/User/Common/VideoUpload';

const { Navigator, Screen } = createBottomTabNavigator();

export default function MarketPlaceRoute() {
  return (
    <Navigator
      detachInactiveScreens
      tabBar={(props) => <BottomNavigationArea {...props} page="marketPlace" />}
    >
      <Screen name="MarketPlaceTab" component={MarketPlace} />
      <Screen name="CartTab" component={MarketPlace} />
      <Screen name="VideoUpload" component={VideoUpload} />
      <Screen name="CategoryTab" component={MarketPlace} />
      <Screen name="ProfileTab" component={MarketPlace} />
    </Navigator>
  );
}
