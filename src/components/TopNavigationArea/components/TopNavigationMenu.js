// prettier-ignore
import React, {
  useContext, useMemo, useState, useCallback,
} from 'react';

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

  const handleLogout = useCallback(async () => {
    try {
      closeMenu();
      setLoading(true);
      await logout();
    } catch (e) {
      const err = e;
    } finally {
      setLoading(false);
    }
  }, [logout, setLoading]);

  const routeSettings = useCallback(() => navigation.navigate('Settings'), [
    navigation,
  ]);

  const routeEditProfile = useCallback(
    () => navigation.navigate('EditProfile'),
    [navigation],
  );

  const TopNavigationMenuAnchor = useCallback(
    () => (
      <TopNavigationAction
        {...props}
        icon={IconMoreVertical}
        onPress={toggleMenu}
        accessibilityLiveRegion="polite"
        accessibilityLabel="open menu"
      />
    ),
    [props],
  );

  return useMemo(
    () => (
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
    ),
    [
      t,
      isNavigationMenuOpen,
      handleLogout,
      TopNavigationMenuAnchor,
      routeEditProfile,
      routeSettings,
    ],
  );
}
