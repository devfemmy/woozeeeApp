// prettier-ignore
import React, {
  useState, useContext, useMemo,
} from 'react';

import {
  Divider,
  Layout,
  Text,
  Toggle,
  TopNavigation,
  TopNavigationAction,
  // OverflowMenu,
  // MenuItem,
} from '@ui-kitten/components';

import { AppSettingsContext } from '~src/contexts';

import {
  IconBack,
  IconClose,
  // IconMoreVertical,
  // IconQuestionMarkCircle,
  // IconAlertCircle,
} from '~src/components/CustomIcons';

export default function TopNavigationArea(props) {
  const {
    // eslint-disable-next-line react/prop-types
    navigation,
    // eslint-disable-next-line react/prop-types
    title,
    // eslint-disable-next-line react/prop-types
    iconType,
    // eslint-disable-next-line react/prop-types
    style,
  } = props;

  const { appState, appOptions } = useContext(AppSettingsContext);

  const { updateSettings } = appOptions;

  const [isError, setError] = useState(false);

  // const [isNavigationMenuOpen, setNavigationMenuOpen] = useState(false);

  // const toggleTopNavigationMenu = () => setNavigationMenuOpen((prevState) => !prevState);

  // const TopNavigationMenuIcon = () => (
  //   <TopNavigationAction
  //     icon={IconMoreVertical}
  //     onPress={toggleTopNavigationMenu}
  //     accessibilityLiveRegion="polite"
  //     accessibilityLabel="Open Menu"
  //     accessibilityActions={['onPress']}
  //   />
  // );

  // const TopNavigationMenu = () => (
  //   <>
  //     <OverflowMenu
  //       anchor={TopNavigationMenuIcon}
  //       visible={isNavigationMenuOpen}
  //       onBackdropPress={() => setNavigationMenuOpen(false)}
  //       backdropStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.15)' }}
  //       accessibilityLiveRegion="polite"
  //       accessibilityHint="Extras"
  //     >
  //       <MenuItem accessoryLeft={IconQuestionMarkCircle} title="F.A.Qs" />
  //       <MenuItem accessoryLeft={IconAlertCircle} title="About" />
  //     </OverflowMenu>
  //   </>
  // );

  return useMemo(() => {
    // eslint-disable-next-line react/prop-types
    const routeBack = () => navigation.goBack();

    // prettier-ignore
    const useSwitchTheme = async () => {
      try {
        const settingsError = await updateSettings({
          darkMode: !appState.darkMode,
        });

        if (settingsError) {
          await setError(true);
        }
      } catch (e) {
        await setError(true);
      }
    };

    const renderSwitch = () => (
      <Toggle checked={appState.darkMode} onChange={useSwitchTheme} />
    );

    const TopNavigationTitle = (navigationProps) => (
      /* eslint-disable-next-line react/jsx-props-no-spreading */
      <Text category="h6" {...navigationProps}>
        {title}
      </Text>
    );

    // prettier-ignore
    const TopNavigationBack = (navigationProps) => (
      <TopNavigationAction
        /* eslint-disable-next-line react/jsx-props-no-spreading */
        {...navigationProps}
        icon={iconType === 'close' ? IconClose : IconBack}
        onPress={routeBack}
        accessibilityLiveRegion="polite"
        accessibilityLabel="Go back"
        accessibilityActions={['onPress']}
      />
    );

    // prettier-ignore
    const TopNavigationSwitchTheme = (navigationProps) => (
      <TopNavigationAction
        /* eslint-disable-next-line react/jsx-props-no-spreading */
        {...navigationProps}
        icon={renderSwitch}
        accessibilityLiveRegion="polite"
        accessibilityLabel="Switch theme"
        accessibilityActions={['onPress']}
      />
    );

    return (
      <Layout level="2">
        <TopNavigation
          alignment="center"
          /* eslint-disable-next-line react/jsx-props-no-spreading */
          title={TopNavigationTitle}
          /* eslint-disable-next-line react/jsx-props-no-spreading */
          accessoryLeft={TopNavigationBack}
          accessoryRight={TopNavigationSwitchTheme}
          // accessoryRight={() => <TopNavigationMenu />}
          accessibilityLiveRegion="polite"
          accessibilityLabel="screen navigation"
          style={[style, { backgroundColor: 'transparent' }]}
        />
        <Divider />
      </Layout>
    );
  }, [iconType, style, title, appState, navigation, updateSettings]);
}
