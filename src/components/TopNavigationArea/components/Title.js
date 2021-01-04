import React, { useMemo } from 'react';

import { Text } from '@ui-kitten/components';

export default function Title(props) {
  // eslint-disable-next-line react/prop-types
  const { title, ...otherProps } = props;

  return useMemo(
    () => (
      /* eslint-disable-next-line react/jsx-props-no-spreading */
      <Text category="h6" {...otherProps}>
        {title}
      </Text>
    ),
    [title, otherProps],
  );
}
