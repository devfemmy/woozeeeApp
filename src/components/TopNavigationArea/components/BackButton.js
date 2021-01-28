import React, { useMemo } from 'react';

import { TopNavigationAction } from '@ui-kitten/components';

import { IconBack, IconClose } from '~src/components/CustomIcons';

export default function BackButton(props) {
  // eslint-disable-next-line react/prop-types
  const { navigation, icon, ...otherProps } = props;

  return useMemo(() => {
    // eslint-disable-next-line react/prop-types
    const routeBack = () => navigation.goBack();

    const ICON = {
      close: IconClose,
      back: IconBack,
    };

    return (
      <TopNavigationAction
        /* eslint-disable-next-line react/jsx-props-no-spreading */
        {...otherProps}
        icon={icon ? ICON[icon] : ICON.back}
        onPress={routeBack}
        accessibilityLiveRegion="polite"
        accessibilityLabel="Go back"
      />
    );
  }, [navigation, icon, otherProps]);
}
