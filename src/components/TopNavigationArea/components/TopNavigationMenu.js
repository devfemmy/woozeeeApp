import React, { useContext, useMemo, useState } from 'react';

import {
  TopNavigationAction,
  OverflowMenu,
  MenuItem,
} from '@ui-kitten/components';

import { AuthContext, LoadingContext } from '~src/contexts';

import {
  IconMoreVertical,
  IconSettings,
  IconEdit,
  IconLogout,
} from '~src/components/CustomIcons';

export default function TopNavigationMenu(props) {
  const { navigation } = props;

  const [isNavigationMenuOpen, setNavigationMenuOpen] = useState(false);

  const { authOptions } = useContext(AuthContext);

  const { logout } = authOptions;

  const { setLoading } = useContext(LoadingContext);

  return useMemo(() => {
    const toggleMenu = () => setNavigationMenuOpen((prevState) => !prevState);

    const closeMenu = () => setNavigationMenuOpen(false);

    const routeSettings = () => navigation.navigate('Settings');

    const routeEditProfile = () => navigation.navigate('EditProfile');

    // eslint-disable-next-line react/prop-types
    const logoutUser = async () => {
      try {
        closeMenu();
        await setLoading(true);
        await logout();
      } catch (e) {
        const err = e;
      } finally {
        await setLoading(false);
      }
    };

    const TopNavigationMenuIcon = () => (
      <TopNavigationAction
        /* eslint-disable-next-line react/jsx-props-no-spreading */
        {...props}
        icon={IconMoreVertical}
        onPress={toggleMenu}
        accessibilityLiveRegion="polite"
        accessibilityLabel="Open Menu"
        accessibilityActions={['onPress']}
      />
    );

    return (
      <OverflowMenu
        anchor={TopNavigationMenuIcon}
        visible={isNavigationMenuOpen}
        onBackdropPress={closeMenu}
        onTouchEnd={closeMenu}
        backdropStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.15)' }}
        accessibilityLiveRegion="polite"
        accessibilityHint="Navigation Menu"
      >
        <MenuItem
          accessoryLeft={IconEdit}
          title="Edit Profile"
          onPress={routeEditProfile}
        />
        <MenuItem
          accessoryLeft={IconSettings}
          title="Settings"
          onPress={routeSettings}
        />
        <MenuItem
          accessoryLeft={IconLogout}
          title="Logout"
          onPress={logoutUser}
        />
      </OverflowMenu>
    );
  }, [navigation, isNavigationMenuOpen, logout, setLoading, props]);
}
