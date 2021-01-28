import React, { useMemo } from 'react';

import { TopNavigationAction } from '@ui-kitten/components';

import { IconQuestionMarkCircle } from '~src/components/CustomIcons';

export default function HelpButton(props) {
  // eslint-disable-next-line react/prop-types
  const { navigation, icon, ...otherProps } = props;

  return useMemo(() => {
    // eslint-disable-next-line react/prop-types
    const routeHelp = () => navigation.navigate('FAQs');

    return (
      <TopNavigationAction
        /* eslint-disable-next-line react/jsx-props-no-spreading */
        {...otherProps}
        icon={IconQuestionMarkCircle}
        onPress={routeHelp}
        accessibilityLiveRegion="polite"
        accessibilityLabel="Open Help"
      />
    );
  }, [navigation, otherProps]);
}
