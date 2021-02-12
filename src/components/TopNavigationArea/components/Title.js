import React, { useMemo } from 'react';

import { Text } from '@ui-kitten/components';

export default function Title(props) {
  const { title, ...otherProps } = props;

  return useMemo(
    () => (
      <Text category="h6" {...otherProps}>
        {title}
      </Text>
    ),
    [title, otherProps],
  );
}
