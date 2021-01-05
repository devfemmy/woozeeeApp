import React, { useMemo, useContext } from 'react';

import { TopNavigationAction } from '@ui-kitten/components';

import { IconLogout } from '~src/components/CustomIcons';

import { AuthContext, LoadingContext } from '~src/contexts';

export default function LogoutAction(props) {
  // eslint-disable-next-line react/prop-types
  const { navigation, icon, ...otherProps } = props;

  const { authOptions } = useContext(AuthContext);

  const { logout } = authOptions;

  const { setLoading } = useContext(LoadingContext);

  return useMemo(() => {
    // eslint-disable-next-line react/prop-types
    const logoutUser = async () => {
      try {
        await setLoading(true);
        await logout();
      } catch (e) {
        const err = e;
      } finally {
        await setLoading(false);
      }
    };

    return (
      <TopNavigationAction
        /* eslint-disable-next-line react/jsx-props-no-spreading */
        {...otherProps}
        icon={IconLogout}
        onPress={logoutUser}
        accessibilityLiveRegion="polite"
        accessibilityLabel="Logout"
        accessibilityActions={['onPress']}
      />
    );
  }, [setLoading, logout, otherProps]);
}
