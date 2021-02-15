import React from 'react';

import { View } from 'react-native';

import { Button, Layout } from '@ui-kitten/components';

export default function TabsMenu(props) {
  const { tabs, tabInfo } = props;

  const { activePage, updateTab } = tabInfo;

  return (
    <Layout level="3" style={{ paddingHorizontal: 20 }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
        }}
      >
        {
          /*  prettier-ignore */
          tabs
          && tabs.map((tab) => (
            <Button
              appearance="ghost"
              status={activePage === tab.title ? 'primary' : 'basic'}
              size="large"
              accessibilityLabel={tab.title}
              accessibilityLiveRegion="polite"
              accessoryLeft={tab.icon}
              onPress={() => updateTab(tab.title)}
              key={tab.title}
            />
          ))
        }
      </View>
    </Layout>
  );
}
