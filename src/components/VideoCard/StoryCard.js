import React, { useMemo } from 'react';

import {
  View,
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

import { Text } from '@ui-kitten/components';

export default function VideoCard(props) {
  const { data, extraWidth } = props;

  const { width, height } = useWindowDimensions();

  const IS_PORTRAIT = height > width;

  return useMemo(
    () => (
      <TouchableOpacity
        activeOpacity={0.75}
        style={{
          width: IS_PORTRAIT
            ? width / (3 + extraWidth)
            : width / (5 + extraWidth),
          paddingHorizontal: 10,
        }}
        key={data.index}
      >
        <View style={{ alignItems: 'center' }}>
          <LinearGradient
            colors={['#043F7C', '#FF5757']}
            style={{
              height: 104,
              width: 104,
              borderRadius: 52,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Image
              source={{ uri: `https://i.postimg.cc/${data.banner}` }}
              style={{
                height: 100,
                width: 100,
                borderRadius: 100,
              }}
            />
          </LinearGradient>
          <Text category="c2" style={{ marginTop: 10 }}>
            {data.tag}
          </Text>
        </View>
      </TouchableOpacity>
    ),
    [data, IS_PORTRAIT, width, extraWidth],
  );
}
