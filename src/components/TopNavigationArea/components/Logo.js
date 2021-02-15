import React from 'react';

import { Image, View } from 'react-native';

export default function Logo(props) {
  return (
    <View {...props}>
      <Image
        source={require('assets/images/drawable/logo.png')}
        resizeMode="cover"
        style={{ maxWidth: 150, height: 25 }}
      />
    </View>
  );
}
