import React, { useMemo } from 'react';

import { Image, View } from 'react-native';

export default function Logo(props) {
  return useMemo(
    () => (
      <View {...props}>
        <Image
          source={require('assets/images/drawable/logo.png')}
          resizeMode="contain"
          style={{ maxWidth: 150 }}
        />
      </View>
    ),
    [props],
  );
}
