import React, { useState } from 'react';

import { Layout, Tab, TabView } from '@ui-kitten/components';

import useModifiedAndroidBackAction from 'src/hooks/useModifiedAndroidBackAction';

import TopNavigationArea from 'src/components/TopNavigationArea';

import Notifications from './Notifications';
import Inbox from './Inbox';

export default function Messaging({ navigation }) {
  useModifiedAndroidBackAction(navigation, 'SocialRoute');

  const [selectedIndex, setSelectedIndex] = useState(0);

  const shouldLoadComponent = (index) => index === selectedIndex;

  return (
    <Layout level="6" style={{ flex: 1 }}>
      <TopNavigationArea title="" navigation={navigation} screen="default" />
      <TabView
        style={{ flex: 1 }}
        selectedIndex={selectedIndex}
        shouldLoadComponent={shouldLoadComponent}
        onSelect={(index) => setSelectedIndex(index)}
      >
        <Tab title="Notifications" style={{ paddingVertical: 10 }}>
          <Notifications navigation={navigation} />
        </Tab>
        <Tab title="Inbox" style={{ paddingVertical: 10 }}>
          <Inbox navigation={navigation} />
        </Tab>
      </TabView>
    </Layout>
  );
}
