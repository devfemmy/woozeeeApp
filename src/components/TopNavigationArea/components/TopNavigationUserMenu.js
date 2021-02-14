import React, { useContext, useState } from 'react';

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
  IconCWooz,
  IconCHome,
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

  const routeHome = () => navigation.replace('UserRoute');

  const routeSocial = () => navigation.replace('SocialRoute');

  const NavigationAnchor = () => (
    <TopNavigationAction
      {...props}
      icon={IconMenu}
      onPress={openMenu}
      accessibilityLiveRegion="polite"
      accessibilityLabel="open menu"
    />
  );

  return (
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
        accessoryLeft={IconCHome}
        title={t('home')}
        onPress={routeHome}
      />
      <MenuItem
        accessoryLeft={IconCWooz}
        title={t('social')}
        onPress={routeSocial}
      />
      {/* <MenuItem accessoryLeft={IconMap} title={t('marketplace')} />
        <MenuItem accessoryLeft={IconGift} title={t('charity')} /> */}
    </OverflowMenu>
  );
}
