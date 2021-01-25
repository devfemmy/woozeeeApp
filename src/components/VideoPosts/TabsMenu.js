import React, { useMemo } from 'react';

import { View } from 'react-native';

import { Button, Layout } from '@ui-kitten/components';

export default function TabsMenu(props) {
  const { tabs, tabInfo } = props;

  const { activeTab, updateTab } = tabInfo;

  /* prettier-ignore */
  return useMemo(
    () => (
      <Layout level="2" style={{ paddingHorizontal: 20, borderRadius: 5 }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}
        >
          {tabs
            && tabs.map((tab, index) => (
              <Button
                appearance="ghost"
                status={activeTab === index ? 'primary' : 'basic'}
                size="large"
                accessibilityLabel={tab.title}
                accessibilityLiveRegion="polite"
                accessoryLeft={tab.icon}
                onPress={() => updateTab(index)}
                key={tab.title}
              />
            ))}
        </View>
      </Layout>
    ),
    [activeTab, tabs, updateTab],
  );
}
