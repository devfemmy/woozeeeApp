import React, { useMemo } from 'react';

import { Image, View } from 'react-native';

export default function Title(props) {
  return useMemo(
    () => (
      /* eslint-disable-next-line react/jsx-props-no-spreading */
      <View {...props}>
        <Image
          source={require('~assets/images/logo.png')}
          resizeMode="contain"
          style={{ width: 180 }}
        />
      </View>
    ),
    [props],
  );
}
