import React from 'react';

import { Image, TouchableOpacity, useWindowDimensions } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

export default function MovieCard(props) {
  const { data, extraWidth } = props;

  const { width, height } = useWindowDimensions();

  const IS_PORTRAIT = height > width;

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      style={{
        height: 275,
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
        style={{
          height: 265,
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
            left: 15,
            bottom: 20,
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
    </TouchableOpacity>
  );
}
