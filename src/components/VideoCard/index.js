import React from 'react';

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

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      style={{
        height: 175,
        width: IS_PORTRAIT
          ? (width - 10) / (2 + extraWidth)
          : width - 10 / (3 + extraWidth),
        paddingHorizontal: 5,
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}
      key={data.index}
    >
      <Image
        source={{ uri: `https://i.postimg.cc/${data.banner}` }}
        defaultSource={require('assets/images/banner/placeholder-image.png')}
        style={{
          height: 165,
          width: '100%',
          borderRadius: 5,
        }}
        resizeMode="cover"
      />
      {data.ownerImg ? (
        <LinearGradient
          colors={['#043F7C', '#FF5757']}
          style={{
            height: 44,
            width: 44,
            borderRadius: 22,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            left: 10,
            top: 5,
          }}
        >
          <Image
            source={{ uri: `https://i.postimg.cc/${data.ownerImg}` }}
            style={{
              height: 40,
              width: 40,
              borderRadius: 100,
              borderColor: 'white',
            }}
          />
        </LinearGradient>
      ) : null}
      {data.tag ? (
        <View
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            position: 'absolute',
            bottom: 10,
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
  );
}
