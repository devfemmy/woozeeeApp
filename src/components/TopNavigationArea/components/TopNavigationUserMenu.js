// prettier-ignore
import React, {
  useContext, useMemo, useState, useCallback,
} from 'react';

import {
  MenuItem,
  OverflowMenu,
  TopNavigationAction,
} from '@ui-kitten/components';

import { LocaleContext } from 'src/contexts';

import {
  IconMenu,
  IconGift,
  IconMap,
  IconRadio,
  IconHome,
} from 'src/components/CustomIcons';

export default function TopNavigationUserMenu(props) {
  const { navigation } = props;

  const t = useContext(LocaleContext);

  const [isNavigationMenuOpen, setNavigationMenuOpen] = useState(false);

  const openMenu = () => {
    setNavigationMenuOpen(true);
  };

  const closeMenu = () => {
    setNavigationMenuOpen(false);
  };

  const routeHome = useCallback(() => navigation.replace('UserRoute'), [
    navigation,
  ]);

  const routeSocial = useCallback(() => navigation.replace('SocialRoute'), [
    navigation,
  ]);

  const NavigationAnchor = useCallback(
    () => (
      <TopNavigationAction
        {...props}
        icon={IconMenu}
        onPress={openMenu}
        accessibilityLiveRegion="polite"
        accessibilityLabel="open menu"
      />
    ),
    [props],
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
          title={t('social')}
          onPress={routeSocial}
        />
        <MenuItem accessoryLeft={IconMap} title={t('marketplace')} />
        <MenuItem accessoryLeft={IconGift} title={t('charity')} />
      </OverflowMenu>
    ),
    [t, NavigationAnchor, isNavigationMenuOpen, routeHome, routeSocial],
  );
}
