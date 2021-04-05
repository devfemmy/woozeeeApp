import React, { useState } from 'react';

import { Layout, Tab, TabView } from '@ui-kitten/components';

import useModifiedAndroidBackAction from 'src/hooks/useModifiedAndroidBackAction';

import Versus from 'src/screens/User/HomeTab/Social/ChallengeTab/VersusTab';
import Explore from 'src/screens/User/HomeTab/Social/ChallengeTab/ExploreTab';

import TopNavigationArea from 'src/components/TopNavigationArea';
import { t } from 'i18n-js';

export default function Challenge({ navigation }) {
  useModifiedAndroidBackAction(navigation, 'SocialRoute');

  const [selectedIndex, setSelectedIndex] = useState(0);

  const shouldLoadComponent = (index) => index === selectedIndex;

  return (
    <Layout level="6" style={{ flex: 1 }}>
      <TopNavigationArea
        title="woozeee"
        navigation={navigation}
        screen="toolbar"
      />
      <TabView
        style={{ flex: 1 }}
        selectedIndex={selectedIndex}
        // shouldLoadComponent={shouldLoadComponent}
        onSelect={(index) => setSelectedIndex(index)}
      >
        <Tab title={t('challenge')} style={{ paddingVertical: 10 }}>
          <Versus />
        </Tab>
        <Tab title={t('explore')} style={{ paddingVertical: 10 }}>
          <Explore />
        </Tab>
      </TabView>
    </Layout>
  );
}
