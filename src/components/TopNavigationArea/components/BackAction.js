import React, { useMemo } from 'react';

import { TopNavigationAction } from '@ui-kitten/components';

import { IconBack, IconClose } from '~src/components/CustomIcons';

export default function BackAction(props) {
  // eslint-disable-next-line react/prop-types
  const { navigation, icon, ...otherProps } = props;

  return useMemo(() => {
    // eslint-disable-next-line react/prop-types
    const routeBack = () => navigation.goBack();

    const renderIcon = () => {
      switch (icon) {
        case 'false':
          return null;
        case 'close':
          return IconClose;
        default:
          return IconBack;
      }
    };

    return (
      <TopNavigationAction
        /* eslint-disable-next-line react/jsx-props-no-spreading */
        {...otherProps}
        icon={renderIcon()}
        onPress={routeBack}
        accessibilityLiveRegion="polite"
        accessibilityLabel="Go back"
        accessibilityActions={['onPress']}
      />
    );
  }, [navigation, icon, otherProps]);
}
