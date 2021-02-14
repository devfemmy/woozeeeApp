import React from 'react';

import { Text } from '@ui-kitten/components';

export default function Title(props) {
  const { title, ...otherProps } = props;

  return (
    <Text category="h6" {...otherProps}>
      {title}
    </Text>
  );
}
