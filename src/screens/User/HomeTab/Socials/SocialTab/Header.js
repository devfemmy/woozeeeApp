// prettier-ignore
import React, {
  useContext, useMemo, useState, useCallback,
} from 'react';

import { View } from 'react-native';

import { Button, MenuItem, OverflowMenu } from '@ui-kitten/components';

import { LocaleContext } from '~src/contexts';

import {
  IconMenu,
  IconGift,
  IconMap,
  IconRadio,
  IconHome,
} from '~src/components/CustomIcons';

export default function Header(props) {
  const { navigation } = props;

  const t = useContext(LocaleContext);

  const [isNavigationMenuOpen, setNavigationMenuOpen] = useState(false);

  const openMenu = () => {
    setNavigationMenuOpen(true);
  };

  const closeMenu = () => {
    setNavigationMenuOpen(false);
  };

  // eslint-disable-next-line react/prop-types
  const routeHome = useCallback(() => navigation.navigate('UserRoute'), [
    navigation,
  ]);

  // eslint-disable-next-line react/prop-types
  const routeSocial = useCallback(() => navigation.navigate('SocialsRoute'), [
    navigation,
  ]);

  const NavigationAnchor = useCallback(
    () => (
      <View
        style={{
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.0125)',
          marginBottom: 5,
        }}
      >
        <Button
          appearance="ghost"
          status="control"
          size="large"
          accessibilityLiveRegion="polite"
          accessibilityComponentType="button"
          accessibilityHint="Menu"
          accessoryLeft={IconMenu}
          onPress={openMenu}
        />
      </View>
    ),
    [],
  );

  return useMemo(
    () => (
      <OverflowMenu
        anchor={NavigationAnchor}
        visible={isNavigationMenuOpen}
        onBackdropPress={closeMenu}
        onTouchEnd={closeMenu}
        backdropStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
        accessibilityLiveRegion="polite"
        accessibilityHint="Extras"
      >
        <MenuItem
          accessoryLeft={IconHome}
          title={t('home')}
          onPress={routeHome}
        />
        <MenuItem
          accessoryLeft={IconRadio}
          title={t('socials')}
          onPress={routeSocial}
        />
        <MenuItem accessoryLeft={IconMap} title={t('marketplace')} />
        <MenuItem accessoryLeft={IconGift} title={t('charity')} />
      </OverflowMenu>
    ),
    [t, NavigationAnchor, isNavigationMenuOpen, routeHome, routeSocial],
  );
}
