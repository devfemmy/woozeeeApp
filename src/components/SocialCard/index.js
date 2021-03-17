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
  const { data, extraWidth, numColumns } = props;

  const { width, height } = useWindowDimensions();

  const IS_PORTRAIT = height > width;

  const COLOUMN_COUNT = numColumns ?? (IS_PORTRAIT ? 3 : 5);

  return useMemo(
    () => (
      <TouchableOpacity
        activeOpacity={0.75}
        style={{
          height: 160,
          width: IS_PORTRAIT
            ? width / (COLOUMN_COUNT + extraWidth)
            : width / (COLOUMN_COUNT + extraWidth),
          paddingHorizontal: 3,
          position: 'relative',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}
      >
        <Image
          source={{ uri: `https://i.postimg.cc/${data.banner}` }}
          defaultSource={require('assets/images/banner/placeholder-image.png')}
          style={{
            height: 155,
            width: '100%',
            borderRadius: 5,
          }}
          resizeMode="cover"
        />
        {data.ownerImg ? (
          <LinearGradient
            colors={['#043F7C', '#FF5757']}
            style={{
              height: 36,
              width: 36,
              borderRadius: 18,
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
              left: 10,
              top: 5,
            }}
          >
            <Image
              source={{ uri: `https://i.postimg.cc/${data.ownerImg}` }}
              defaultSource={require('assets/images/banner/placeholder-image.png')}
              style={{
                height: 32,
                width: 32,
                borderRadius: 16,
                borderColor: 'white',
              }}
              resizeMode="cover"
            />
          </LinearGradient>
        ) : null}
        {data.tag ? (
          <View
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              position: 'absolute',
              bottom: 5,
              borderBottomLeftRadius: 5,
              borderBottomRightRadius: 5,
              padding: 5,
              width: '100%',
            }}
          >
            <Text category="c2" style={{ color: 'white', marginBottom: 5 }}>
              {data.tag}
            </Text>
            <View>
              <Text category="c1" status="control">
                12.5 Entries
              </Text>
            </View>
          </View>
        ) : null}
      </TouchableOpacity>
    ),
    [COLOUMN_COUNT, IS_PORTRAIT, extraWidth, width, data],
  );
}
