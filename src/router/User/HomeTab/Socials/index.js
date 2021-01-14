import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import BottomNavigationArea from '~src/components/BottomNavigationArea';

// Tabs
import SocialTab from './SocialTab';
import ExploreTab from './ExploreTab';
import ChallengeTab from './ChallengeTab';
import ProfileTab from './ProfileTab';

const { Navigator, Screen } = createBottomTabNavigator();

export default function SocialsRoute() {
  return (
    <Navigator
      detachInactiveScreens /* eslint-disable-next-line react/jsx-props-no-spreading */
      tabBar={(props) => <BottomNavigationArea {...props} page="socials" />}
    >
      <Screen name="SocialTab" component={SocialTab} />
      <Screen name="ExploreTab" component={ExploreTab} />
      <Screen name="UploadVideo" component={SocialTab} />
      <Screen name="ChallengeTab" component={ChallengeTab} />
      <Screen name="ProfileTab" component={ProfileTab} />
    </Navigator>
  );
}
