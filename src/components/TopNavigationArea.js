import React, { useState, useContext } from 'react';

import {
  Layout,
  Toggle,
  TopNavigation,
  TopNavigationAction,
  // OverflowMenu,
  // MenuItem,
} from '@ui-kitten/components';

import { AppSettingsContext } from '~src/contexts';

import { BoldText } from '~src/components/CustomTexts';

import {
  IconBack,
  IconClose,
  // IconMoreVertical,
  // IconQuestionMarkCircle,
  // IconAlertCircle,
} from '~src/components/CustomIcons';

export default function TopNavigationArea(props) {
  // eslint-disable-next-line react/prop-types
  const { navigation, title, iconType } = props;

  const { appState, appOptions } = useContext(AppSettingsContext);

  const { updateSettings } = appOptions;

  const [isError, setError] = useState(false);

  // const [isNavigationMenuOpen, setNavigationMenuOpen] = useState(false);

  // eslint-disable-next-line react/prop-types
  const routeBack = () => navigation.goBack();

  const switchTheme = async () => {
    try {
      const settingsError = await updateSettings(appState, {
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
    <Toggle checked={appState.darkMode} onChange={switchTheme} />
  );

  // prettier-ignore
  // const toggleTopNavigationMenu = () => setNavigationMenuOpen((prevState) => !prevState);

  const TopNavigationTitle = (propsNavigation) => (
    /* eslint-disable-next-line react/jsx-props-no-spreading */
    <BoldText {...propsNavigation}>{title}</BoldText>
  );

  const TopNavigationBack = (propsNavigation) => (
    <TopNavigationAction
      /* eslint-disable-next-line react/jsx-props-no-spreading */
      {...propsNavigation}
      icon={iconType === 'close' ? IconClose : IconBack}
      onPress={routeBack}
      accessibilityLiveRegion="polite"
      accessibilityLabel="Go back"
      accessibilityActions={['onPress']}
    />
  );

  const TopNavigationSwitchTheme = (propsNavigation) => (
    <TopNavigationAction
      /* eslint-disable-next-line react/jsx-props-no-spreading */
      {...propsNavigation}
      icon={renderSwitch}
      accessibilityLiveRegion="polite"
      accessibilityLabel="Switch theme"
      accessibilityActions={['onPress']}
    />
  );

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

  return (
    <Layout level="1">
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
      />
    </Layout>
  );
}
