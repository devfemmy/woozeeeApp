import React, { useContext } from 'react';

import { TabBar, Tab, Layout } from '@ui-kitten/components';

import { LocaleContext } from 'src/contexts';

// Screens
const tabs = {
  challenge: {
    versus: 'noIcon',
    explore: 'noIcon',
  },
};

export default function TopTabsArea(props) {
  // prettier-ignore
  const {
    navigation, state, style, page,
  } = props;

  const t = useContext(LocaleContext);

  return (
    <Layout level="5">
      <TabBar
        style={[style, { backgroundColor: 'transparent' }]}
        selectedIndex={state.index}
        onSelect={(index) => navigation.navigate(state.routeNames[index])}
      >
        {Object.entries(tabs[page]).map(([title]) => (
          <Tab title={t(title)} key={title} />
        ))}
      </TabBar>
    </Layout>
  );
}
