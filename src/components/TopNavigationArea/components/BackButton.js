import React, { useMemo } from 'react';

import { TopNavigationAction } from '@ui-kitten/components';

import { IconBack, IconClose } from 'src/components/CustomIcons';

export default function BackButton(props) {
  const { navigation, icon, ...otherProps } = props;

  return useMemo(() => {
    const routeBack = () => navigation.goBack();

    const ICON = {
      close: IconClose,
      back: IconBack,
    };

    return (
      <TopNavigationAction
        {...otherProps}
        icon={icon ? ICON[icon] : ICON.back}
        onPress={routeBack}
        accessibilityLiveRegion="polite"
        accessibilityLabel="Go back"
      />
    );
  }, [navigation, icon, otherProps]);
}
