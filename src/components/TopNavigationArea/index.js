import React, { useMemo, useCallback, useContext } from 'react';

import {
  Divider,
  Layout,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';

import { AppSettingsContext } from 'src/contexts';

import {
  IconCFlag,
  IconCNotification,
  IconSearch,
  IconOptions,
  IconCVideo,
} from 'src/components/CustomIcons';

// Components import
import BackButton from './components/BackButton';
import HelpButton from './components/HelpButton';
import Title from './components/Title';
import Logo from './components/Logo';
import SearchField from './components/SearchField';
import TopNavigationMenu from './components/TopNavigationMenu';
import TopNavigationSocialMenu from './components/TopNavigationSocialMenu';

export default function TopNavigationArea(props) {
  // prettier-ignore
  const {
    navigation, title, icon, style, screen,
  } = props;

  const { appState } = useContext(AppSettingsContext);

  const ICON_THEME = appState.darkMode ? 'white' : '#0A143F';

  const routeSearch = useCallback(() => navigation.navigate('Search'), [
    navigation,
  ]);

  const routeLiveStream = useCallback(() => navigation.navigate('LiveStream'), [
    navigation,
  ]);

  const routeMessaging = useCallback(() => navigation.navigate('Messaging'), [
    navigation,
  ]);

  const renderToolsOptions = useCallback(
    () => (
      <>
        <TopNavigationAction
          {...props}
          icon={(evaProps) => <IconCVideo {...evaProps} />}
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
            <TopNavigationSocialMenu {...evaProps} navigation={navigation} />
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
    profile: TopNavigationProfile,
    social: TopNavigationSocial,
    toolbar: TopNavigationToolbar,
  };

  return navs[screen];
}
