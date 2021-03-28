import React, { useMemo, useCallback } from 'react';

import {
  Divider,
  Layout,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';

import {
  IconCFlag,
  IconCNotification,
  IconSearch,
  IconOptions,
  IconCVideo,
  IconCSearch,
} from 'src/components/CustomIcons';

// Components import
import BackButton from './components/BackButton';
import HelpButton from './components/HelpButton';
import Title from './components/Title';
import Logo from './components/Logo';
import SearchField from './components/SearchField';
import SettingsButton from './components/SettingsButton';

import TopNavigationUserMenu from './components/TopNavigationUserMenu';
import TopNavigationGlobalMenu from './components/TopNavigationGlobalMenu';

export default function TopNavigationArea(props) {
  // prettier-ignore
  const {
    navigation, title, icon, style, screen,
  } = props;

  const routeSearch = useCallback(() => navigation.navigate('Search'), [
    navigation,
  ]);

  const routeLiveStream = useCallback(() => navigation.navigate('LiveStream'), [
    navigation,
  ]);

  const routeMessaging = useCallback(() => navigation.navigate('Messaging'), [
    navigation,
  ]);

  const renderSocialTools = useCallback(
    () => (
      <>
        <TopNavigationAction
          {...props}
          icon={IconCVideo}
          accessibilityLiveRegion="polite"
          accessibilityLabel="Livestream"
          onPress={routeLiveStream}
        />
        <TopNavigationAction
          {...props}
          icon={IconCNotification}
          accessibilityLiveRegion="polite"
          accessibilityLabel="Notification"
          onPress={routeMessaging}
        />
      </>
    ),
    [props, routeLiveStream, routeMessaging],
  );

  const renderMarketPlaceTools = useCallback(
    () => (
      <>
        <TopNavigationAction
          {...props}
          icon={IconCSearch}
          accessibilityLiveRegion="polite"
          accessibilityLabel="Search"
          onPress={routeSearch}
        />
        <TopNavigationAction
          {...props}
          icon={IconCNotification}
          accessibilityLiveRegion="polite"
          accessibilityLabel="Notification"
          onPress={routeMessaging}
        />
      </>
    ),
    [props, routeSearch, routeMessaging],
  );

  const renderCharityTools = useCallback(
    () => (
      <>
        <TopNavigationAction
          {...props}
          icon={IconCNotification}
          accessibilityLiveRegion="polite"
          accessibilityLabel="Notification"
          onPress={routeMessaging}
        />
      </>
    ),
    [props, routeMessaging],
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

  const renderOptionsIcon = useCallback(
    () => (
      <TopNavigationAction
        {...props}
        icon={IconOptions}
        accessibilityLiveRegion="polite"
        accessibilityLabel="Options"
      />
    ),
    [props],
  );

  // render tools based on screen
  const renderTools = useMemo(
    () => ({
      social: renderSocialTools,
      marketPlace: renderMarketPlaceTools,
      charity: renderCharityTools,
    }),
    [renderSocialTools, renderMarketPlaceTools, renderCharityTools],
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
          accessoryLeft={() => <IconCFlag style={{ height: 28, width: 28 }} />}
          accessoryRight={(evaProps) => (
            <TopNavigationUserMenu {...evaProps} navigation={navigation} />
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
          accessoryLeft={(evaProps) => (
            <BackButton {...evaProps} navigation={navigation} icon="back" />
          )}
          title={(evaProps) => <SearchField {...evaProps} />}
          accessoryRight={renderOptionsIcon}
          accessibilityLiveRegion="polite"
          accessibilityLabel="screen navigation"
          style={[style, { backgroundColor: 'transparent' }]}
        />
        <Divider />
      </Layout>
    ),
    [style, navigation, renderOptionsIcon],
  );

  const TopNavigationProfile = useMemo(
    () => (
      <Layout level="5">
        <TopNavigation
          alignment="center"
          accessoryLeft={(evaProps) => (
            <SettingsButton {...evaProps} navigation={navigation} />
          )}
          accessibilityLiveRegion="polite"
          accessibilityLabel="screen navigation"
          style={[style, { backgroundColor: 'transparent' }]}
        />
      </Layout>
    ),
    [style, navigation],
  );

  const TopNavigationGlobal = useMemo(
    () => (
      <Layout level="5">
        <TopNavigation
          alignment="center"
          title={(evaProps) => <Logo {...evaProps} />}
          accessoryLeft={(evaProps) => (
            <TopNavigationGlobalMenu
              {...evaProps}
              navigation={navigation}
              selected={screen}
            />
          )}
          accessoryRight={renderTools[screen]}
          accessibilityLiveRegion="polite"
          accessibilityLabel="screen navigation"
          style={[style, { backgroundColor: 'transparent' }]}
        />
        <Divider />
      </Layout>
    ),
    [navigation, style, renderTools, screen],
  );

  const TopNavigationToolbar = useMemo(
    () => (
      <Layout level="5">
        <TopNavigation
          alignment="center"
          // accessoryLeft={(evaProps) => (
          //   <TopNavigationUserMenu {...evaProps} navigation={navigation} />
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

  const TopNavigationDefault = useMemo(
    () => (
      <Layout level="5">
        <TopNavigation
          alignment="center"
          title={(evaProps) => <Title {...evaProps} title={title} />}
          accessoryLeft={(evaProps) => (
            <BackButton {...evaProps} navigation={navigation} icon={icon} />
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

  const navs = {
    default: TopNavigationDefault,
    auth: TopNavigationAuth,
    user: TopNavigationUser,
    search: TopNavigationSearch,
    toolbar: TopNavigationToolbar,
    profile: TopNavigationProfile,
    social: TopNavigationGlobal,
    marketPlace: TopNavigationGlobal,
    charity: TopNavigationGlobal,
  };

  return navs[screen];
}
