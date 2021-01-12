import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import BottomNavigationArea from '~src/components/BottomNavigationArea';

import SocialTab from './SocialTab';

const { Navigator, Screen } = createBottomTabNavigator();

export default function SocialsRoute() {
  return (
    <Navigator
      detachInactiveScreens /* eslint-disable-next-line react/jsx-props-no-spreading */
      tabBar={(props) => <BottomNavigationArea {...props} page="socials" />}
    >
      <Screen name="Social" component={SocialTab} />
      <Screen name="Explore" component={SocialTab} />
      <Screen name="Challenge" component={SocialTab} />
      <Screen name="Profile" component={SocialTab} />
    </Navigator>
  );
}
