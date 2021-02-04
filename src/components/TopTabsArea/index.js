import React, { useContext } from 'react';

import { TabBar, Tab, Layout, Divider } from '@ui-kitten/components';

import { LocaleContext } from '~src/contexts';

// Screens
const tabs = {
  challenge: {
    versus: 'noIcon',
    explore: 'noIcon',
  },
};

export default function BottomNavigationArea(props) {
  // prettier-ignore
  const {
  // eslint-disable-next-line react/prop-types
    navigation, state, style, page,
  } = props;

  const t = useContext(LocaleContext);

  return (
    <Layout level="5">
      <TabBar
        style={[style, { backgroundColor: 'transparent' }]}
        /* eslint-disable-next-line react/prop-types */
        selectedIndex={state.index}
        /* eslint-disable-next-line react/prop-types */
        onSelect={(index) => navigation.navigate(state.routeNames[index])}
      >
        {Object.entries(tabs[page]).map(([title]) => (
          <Tab title={t(title)} key={title} />
        ))}
      </TabBar>
    </Layout>
  );
}
