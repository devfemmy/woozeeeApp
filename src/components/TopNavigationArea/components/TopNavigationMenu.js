import React, { useMemo, useState } from 'react';

import {
  TopNavigationAction,
  OverflowMenu,
  MenuItem,
} from '@ui-kitten/components';

import {
  IconMoreVertical,
  IconQuestionMarkCircle,
  IconAlertCircle,
} from '~src/components/CustomIcons';

export default function TopNavigationMenu(props) {
  const [isNavigationMenuOpen, setNavigationMenuOpen] = useState(false);

  return useMemo(() => {
    const toggleMenu = () => setNavigationMenuOpen((prevState) => !prevState);

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
        onBackdropPress={() => setNavigationMenuOpen(false)}
        backdropStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.15)' }}
        accessibilityLiveRegion="polite"
        accessibilityHint="Extras"
      >
        <MenuItem accessoryLeft={IconQuestionMarkCircle} title="F.A.Qs" />
        <MenuItem accessoryLeft={IconAlertCircle} title="About" />
      </OverflowMenu>
    );
  }, [isNavigationMenuOpen, props]);
}
