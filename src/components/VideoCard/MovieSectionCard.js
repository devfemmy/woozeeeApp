import React, { useMemo } from 'react';

import {
  Image,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';

import { Text } from '@ui-kitten/components';

import { LinearGradient } from 'expo-linear-gradient';

import { IconEye } from 'src/components/CustomIcons';

export default function MovieCard(props) {
  const { data, extraWidth } = props;

  const { width, height } = useWindowDimensions();

  const IS_PORTRAIT = height > width;

  return useMemo(
    () => (
      <View
        style={{
          width: IS_PORTRAIT
            ? width / (2 + extraWidth)
            : width / (3 + extraWidth),
          paddingHorizontal: 5,
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}
      >
        <TouchableOpacity
          activeOpacity={0.75}
          style={{
            width: '100%',
            position: 'relative',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}
        >
          <Image
            source={{ uri: `https://i.postimg.cc/${data.banner}` }}
            defaultSource={require('assets/images/banner/placeholder-image.png')}
            style={{
              height: 245,
              width: '100%',
              borderRadius: 5,
            }}
            resizeMode="cover"
          />
          <View
            style={{
              position: 'absolute',
              top: 10,
              right: 10,
              backgroundColor: 'rgba(0, 0, 0, 0.25)',
              paddingHorizontal: 6,
              paddingVertical: 3,
              borderRadius: 10,
              flexDirection: 'row',
            }}
          >
            <IconEye
              style={{ height: 20, width: 20, marginRight: 5 }}
              fill="white"
            />
            <Text category="c2" status="control">
              11.5k
            </Text>
          </View>
          {data.ownerImg ? (
            <LinearGradient
              colors={['#043F7C', '#FF5757']}
              style={{
                height: 60,
                width: 60,
                borderRadius: 30,
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                bottom: -30,
              }}
            >
              <Image
                source={{ uri: `https://i.postimg.cc/${data.ownerImg}` }}
                style={{
                  height: 56,
                  width: 56,
                  borderRadius: 28,
                  borderColor: 'white',
                }}
              />
            </LinearGradient>
          ) : null}
        </TouchableOpacity>
        <View style={{ marginTop: 40 }}>
          <Text category="p2" style={{ textAlign: 'center', lineHeight: 20 }}>
            My name is Tayo, The best of the best
          </Text>
        </View>
      </View>
    ),
    [IS_PORTRAIT, data, extraWidth, width],
  );
}
