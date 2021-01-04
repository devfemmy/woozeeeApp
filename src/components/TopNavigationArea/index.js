import React, { useMemo } from 'react';

import { Divider, Layout, TopNavigation } from '@ui-kitten/components';

// Components import
import BackAction from './components/BackAction';
// import TopNavigationMenu from './components/TopNavigationMenu';
import Title from './components/Title';
import Logo from './components/Logo';
import SwitchTheme from './components/SwitchTheme';

export default function TopNavigationArea(props) {
  const {
    // eslint-disable-next-line react/prop-types
    navigation,
    // eslint-disable-next-line react/prop-types
    title,
    // eslint-disable-next-line react/prop-types
    icon,
    // eslint-disable-next-line react/prop-types
    style,
    // eslint-disable-next-line react/prop-types
    screen,
  } = props;

  const TopNavigationAuth = useMemo(
    () => (
      <Layout level="2">
        <TopNavigation
          alignment="center"
          /* eslint-disable-next-line react/jsx-props-no-spreading */
          title={(evaProps) => <Title {...evaProps} title={title} />}
          /* eslint-disable-next-line react/jsx-props-no-spreading */
          accessoryLeft={(evaProps) => (
            // eslint-disable-next-line react/jsx-props-no-spreading
            <BackAction {...evaProps} navigation={navigation} icon={icon} />
          )}
          /* eslint-disable-next-line react/jsx-props-no-spreading */
          accessoryRight={(evaProps) => <SwitchTheme {...evaProps} />}
          // accessoryRight={() => <TopNavigationMenu />}
          accessibilityLiveRegion="polite"
          accessibilityLabel="screen navigation"
          style={[style, { backgroundColor: 'transparent' }]}
        />
        <Divider />
      </Layout>
    ),
    [navigation, title, icon, style],
  );

  const TopNavigationUser = useMemo(
    () => (
      <Layout level="2">
        <TopNavigation
          alignment="center"
          /* eslint-disable-next-line react/jsx-props-no-spreading */
          title={(evaProps) => <Logo {...evaProps} />}
          /* eslint-disable-next-line react/jsx-props-no-spreading */
          accessoryLeft={(evaProps) => (
            // eslint-disable-next-line react/jsx-props-no-spreading
            <BackAction {...evaProps} navigation={navigation} icon={icon} />
          )}
          /* eslint-disable-next-line react/jsx-props-no-spreading */
          accessoryRight={(evaProps) => <SwitchTheme {...evaProps} />}
          // accessoryRight={() => <TopNavigationMenu />}
          accessibilityLiveRegion="polite"
          accessibilityLabel="screen navigation"
          style={[style, { backgroundColor: 'transparent' }]}
        />
        <Divider />
      </Layout>
    ),
    [navigation, icon, style],
  );

  return screen === 'auth' ? TopNavigationAuth : TopNavigationUser;
}
