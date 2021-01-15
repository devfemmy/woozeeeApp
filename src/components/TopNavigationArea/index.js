import React, { useMemo } from 'react';

import { Divider, Layout, TopNavigation } from '@ui-kitten/components';

// Components import
import BackButton from './components/BackButton';
import LogoutButton from './components/LogoutButton';
// import TopNavigationMenu from './components/TopNavigationMenu';
import Title from './components/Title';
import Logo from './components/Logo';
import SearchField from './components/SearchField';
import SwitchTheme from './components/SwitchTheme';
import TopNavigationMenu from './components/TopNavigationMenu';

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
      <Layout level="4">
        <TopNavigation
          alignment="center"
          /* eslint-disable-next-line react/jsx-props-no-spreading */
          title={(evaProps) => <Title {...evaProps} title={title} />}
          /* eslint-disable-next-line react/jsx-props-no-spreading */
          accessoryLeft={(evaProps) => (
            // eslint-disable-next-line react/jsx-props-no-spreading
            <BackButton {...evaProps} navigation={navigation} icon={icon} />
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
      <Layout level="4">
        <TopNavigation
          alignment="center"
          /* eslint-disable-next-line react/jsx-props-no-spreading */
          title={(evaProps) => <Logo {...evaProps} />}
          /* prettier-ignore */
          accessoryLeft={(evaProps) => (icon === 'logout' ? (
          /* eslint-disable-next-line react/jsx-props-no-spreading */
            <LogoutButton {...evaProps} navigation={navigation} icon={icon} />
          ) : (
            // eslint-disable-next-line react/jsx-props-no-spreading
            <BackButton {...evaProps} navigation={navigation} icon={icon} />
          ))}
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

  const TopNavigationSearch = useMemo(
    () => (
      <Layout level="4">
        <TopNavigation
          alignment="center"
          /* eslint-disable-next-line react/jsx-props-no-spreading */
          title={(evaProps) => <SearchField {...evaProps} />}
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
    [style],
  );

  const TopNavigationProfile = useMemo(
    () => (
      <Layout level="4">
        <TopNavigation
          alignment="center"
          /* eslint-disable-next-line react/jsx-props-no-spreading */
          accessoryRight={(evaProps) => <TopNavigationMenu {...evaProps} />}
          // accessoryRight={() => <TopNavigationMenu />}
          accessibilityLiveRegion="polite"
          accessibilityLabel="screen navigation"
          style={[style, { backgroundColor: 'transparent' }]}
        />
      </Layout>
    ),
    [style],
  );

  const navs = {
    auth: TopNavigationAuth,
    user: TopNavigationUser,
    search: TopNavigationSearch,
    profile: TopNavigationProfile,
  };

  return navs[screen];
}
