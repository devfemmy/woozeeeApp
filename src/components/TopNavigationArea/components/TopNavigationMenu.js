import React, { useContext, useState } from 'react';

import {
  TopNavigationAction,
  OverflowMenu,
  MenuItem,
} from '@ui-kitten/components';

import { AuthContext, LoadingContext, LocaleContext } from 'src/contexts';

import {
  IconMoreVertical,
  IconSettings,
  IconEdit,
  IconLogout,
} from 'src/components/CustomIcons';

export default function TopNavigationMenu(props) {
  const { navigation } = props;

  const [isNavigationMenuOpen, setNavigationMenuOpen] = useState(false);

  const { authOptions } = useContext(AuthContext);

  const { logout } = authOptions;

  const { setLoading } = useContext(LoadingContext);

  const t = useContext(LocaleContext);

  const toggleMenu = () => setNavigationMenuOpen((prevState) => !prevState);

  const closeMenu = () => setNavigationMenuOpen(false);

  const handleLogout = async () => {
    try {
      closeMenu();
      setLoading(true);
      await logout();
    } catch (e) {
      const err = e;
    } finally {
      setLoading(false);
    }
  };

  const routeSettings = () => navigation.navigate('Settings');

  const routeEditProfile = () => navigation.navigate('EditProfile');

  const TopNavigationMenuAnchor = () => (
    <TopNavigationAction
      {...props}
      icon={IconMoreVertical}
      onPress={toggleMenu}
      accessibilityLiveRegion="polite"
      accessibilityLabel="open menu"
    />
  );

  return (
    <OverflowMenu
      anchor={TopNavigationMenuAnchor}
      visible={isNavigationMenuOpen}
      onBackdropPress={closeMenu}
      onTouchEnd={closeMenu}
      backdropStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.15)' }}
      accessibilityLiveRegion="polite"
      accessibilityHint="Navigation Menu"
    >
      <MenuItem
        accessoryLeft={IconEdit}
        title={`${t('edit')} ${t('profile')}`}
        onPress={routeEditProfile}
      />
      <MenuItem
        accessoryLeft={IconSettings}
        title={t('settings')}
        onPress={routeSettings}
      />
      <MenuItem
        accessoryLeft={IconLogout}
        title={t('logout')}
        onPress={handleLogout}
      />
    </OverflowMenu>
  );
}
