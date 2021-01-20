import React, { useMemo } from 'react';

import { Divider, Layout, TopNavigation } from '@ui-kitten/components';

// Components import
import BackButton from './components/BackButton';
import HelpButton from './components/HelpButton';
import Title from './components/Title';
import Logo from './components/Logo';
import SearchField from './components/SearchField';
import TopNavigationMenu from './components/TopNavigationMenu';

import { IconFlag } from '~src/components/CustomIcons';

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
          accessoryRight={(evaProps) => (
            // eslint-disable-next-line react/jsx-props-no-spreading
            <HelpButton {...evaProps} navigation={navigation} />
          )}
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
          /* eslint-disable-next-line react/jsx-props-no-spreading */
          accessoryLeft={IconFlag}
          accessoryRight={(evaProps) => (
            /* eslint-disable-next-line react/jsx-props-no-spreading */
            <TopNavigationMenu {...evaProps} navigation={navigation} />
          )}
          // accessoryRight={() => <TopNavigationMenu />}
          accessibilityLiveRegion="polite"
          accessibilityLabel="screen navigation"
          style={[style, { backgroundColor: 'transparent' }]}
        />
        <Divider />
      </Layout>
    ),
    [navigation, style],
  );

  const TopNavigationSearch = useMemo(
    () => (
      <Layout level="4">
        <TopNavigation
          alignment="center"
          /* eslint-disable-next-line react/jsx-props-no-spreading */
          title={(evaProps) => <SearchField {...evaProps} />}
          accessoryRight={(evaProps) => (
            /* eslint-disable-next-line react/jsx-props-no-spreading */
            <TopNavigationMenu {...evaProps} navigation={navigation} />
          )}
          // accessoryRight={() => <TopNavigationMenu />}
          accessibilityLiveRegion="polite"
          accessibilityLabel="screen navigation"
          style={[style, { backgroundColor: 'transparent' }]}
        />
        <Divider />
      </Layout>
    ),
    [style, navigation],
  );

  const TopNavigationProfile = useMemo(
    () => (
      <Layout level="4">
        <TopNavigation
          alignment="center"
          accessoryRight={(evaProps) => (
            /* eslint-disable-next-line react/jsx-props-no-spreading */
            <TopNavigationMenu {...evaProps} navigation={navigation} />
          )}
          // accessoryRight={() => <TopNavigationMenu />}
          accessibilityLiveRegion="polite"
          accessibilityLabel="screen navigation"
          style={[style, { backgroundColor: 'transparent' }]}
        />
      </Layout>
    ),
    [style, navigation],
  );

  const navs = {
    auth: TopNavigationAuth,
    user: TopNavigationUser,
    search: TopNavigationSearch,
    profile: TopNavigationProfile,
  };

  return navs[screen];
}
