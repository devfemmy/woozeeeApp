import React, { useMemo, useCallback } from 'react';

import {
  Divider,
  Layout,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';

import {
  IconCFlag,
  IconVideoOutline,
  IconBell,
  IconSearch,
} from 'src/components/CustomIcons';

// Components import
import BackButton from './components/BackButton';
import HelpButton from './components/HelpButton';
import Title from './components/Title';
import Logo from './components/Logo';
import SearchField from './components/SearchField';
import TopNavigationMenu from './components/TopNavigationMenu';
import TopNavigationUserMenu from './components/TopNavigationUserMenu';

export default function TopNavigationArea(props) {
  // prettier-ignore
  const {
    navigation, title, icon, style, screen,
  } = props;

  const routeSearch = useCallback(() => navigation.navigate('Search'), [
    navigation,
  ]);

  const renderToolsOptions = useCallback(
    () => (
      <>
        <TopNavigationAction
          {...props}
          icon={IconVideoOutline}
          accessibilityLiveRegion="polite"
          accessibilityLabel="Record"
        />
        <TopNavigationAction
          {...props}
          icon={IconBell}
          accessibilityLiveRegion="polite"
          accessibilityLabel="Notification"
        />
      </>
    ),
    [props],
  );

  const renderSearchIcon = useCallback(
    () => (
      <TopNavigationAction
        {...props}
        icon={IconSearch}
        accessibilityLiveRegion="polite"
        accessibilityLabel="Search"
        onPress={routeSearch}
      />
    ),
    [props, routeSearch],
  );

  const TopNavigationAuth = useMemo(
    () => (
      <Layout level="5">
        <TopNavigation
          alignment="center"
          title={(evaProps) => <Title {...evaProps} title={title} />}
          accessoryLeft={(evaProps) => (
            <BackButton {...evaProps} navigation={navigation} icon={icon} />
          )}
          accessoryRight={(evaProps) => (
            <HelpButton {...evaProps} navigation={navigation} />
          )}
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
      <Layout level="5">
        <TopNavigation
          alignment="center"
          title={(evaProps) => <Logo {...evaProps} />}
          accessoryLeft={IconCFlag}
          accessoryRight={(evaProps) => (
            <TopNavigationMenu {...evaProps} navigation={navigation} />
          )}
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
      <Layout level="5">
        <TopNavigation
          alignment="center"
          title={(evaProps) => <SearchField {...evaProps} />}
          accessoryRight={(evaProps) => (
            <TopNavigationMenu {...evaProps} navigation={navigation} />
          )}
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
      <Layout level="5">
        <TopNavigation
          alignment="center"
          accessoryRight={(evaProps) => (
            <TopNavigationMenu {...evaProps} navigation={navigation} />
          )}
          accessibilityLiveRegion="polite"
          accessibilityLabel="screen navigation"
          style={[style, { backgroundColor: 'transparent' }]}
        />
      </Layout>
    ),
    [style, navigation],
  );

  const TopNavigationSocial = useMemo(
    () => (
      <Layout level="5">
        <TopNavigation
          alignment="center"
          title={(evaProps) => <Logo {...evaProps} />}
          accessoryLeft={(evaProps) => (
            <TopNavigationUserMenu {...evaProps} navigation={navigation} />
          )}
          accessoryRight={renderToolsOptions}
          accessibilityLiveRegion="polite"
          accessibilityLabel="screen navigation"
          style={[style, { backgroundColor: 'transparent' }]}
        />
        <Divider />
      </Layout>
    ),
    [navigation, style, renderToolsOptions],
  );

  const TopNavigationToolbar = useMemo(
    () => (
      <Layout level="5">
        <TopNavigation
          alignment="center"
          // accessoryLeft={(evaProps) => (
          //   <TopNavigationMenu {...evaProps} navigation={navigation} />
          // )}
          accessoryRight={renderSearchIcon}
          accessibilityLiveRegion="polite"
          accessibilityLabel="screen navigation"
          style={[style, { backgroundColor: 'transparent' }]}
        />
        <Divider />
      </Layout>
    ),
    [style, renderSearchIcon],
  );

  const navs = {
    auth: TopNavigationAuth,
    user: TopNavigationUser,
    search: TopNavigationSearch,
    profile: TopNavigationProfile,
    social: TopNavigationSocial,
    toolbar: TopNavigationToolbar,
  };

  return navs[screen];
}
