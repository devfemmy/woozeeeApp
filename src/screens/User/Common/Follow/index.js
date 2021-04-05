import React, { useState, useContext } from 'react';

import { Layout, Tab, TabView } from '@ui-kitten/components';

import { LocaleContext } from 'src/contexts';

import TopNavigationArea from 'src/components/TopNavigationArea';

// Tabs
import Followers from './Followers';
import Following from './Following';
import Suggested from './Suggested';

export default function Follow({ navigation }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const t = useContext(LocaleContext);

  const shouldLoadComponent = (index) => index === selectedIndex;

  return (
    <Layout level="6" style={{ flex: 1 }}>
      <TopNavigationArea
        title="@Bukka101Official"
        navigation={navigation}
        screen="default"
      />
      <TabView
        style={{ flex: 1 }}
        selectedIndex={selectedIndex}
        // shouldLoadComponent={shouldLoadComponent}
        onSelect={(index) => setSelectedIndex(index)}
      >
        <Tab title={t('followers')} style={{ paddingVertical: 10 }}>
          <Followers navigation={navigation} />
        </Tab>
        <Tab title={t('following')} style={{ paddingVertical: 10 }}>
          <Following navigation={navigation} />
        </Tab>
        <Tab title={t('Suggested')} style={{ paddingVertical: 10 }}>
          <Suggested navigation={navigation} />
        </Tab>
      </TabView>
    </Layout>
  );
}
