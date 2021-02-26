import React, { useMemo } from 'react';

import {
  Image,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

import { Text, Button } from '@ui-kitten/components';

import { IconEye } from 'src/components/CustomIcons';

export default function MovieCard(props) {
  const { data, extraWidth } = props;

  const { width, height } = useWindowDimensions();

  const IS_PORTRAIT = height > width;

  const cardWith = IS_PORTRAIT
    ? width / (2 + extraWidth)
    : width / (3 + extraWidth);

  return useMemo(
    () => (
      <TouchableOpacity
        activeOpacity={0.75}
        style={{
          height: 270,
          width: cardWith,
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
            height: 265,
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
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Button
            status="danger"
            size="tiny"
            style={{ paddingHorizontal: 0, paddingVertical: 0, marginRight: 5 }}
          >
            <Text status="control" category="s2">
              Live
            </Text>
          </Button>
          <View
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.25)',
              paddingHorizontal: 6,
              paddingVertical: 3,
              borderRadius: 10,
              flexDirection: 'row',
              alignItems: 'center',
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
        </View>
        <View
          style={{
            alignItems: 'center',
            position: 'absolute',
            left: 10,
            bottom: 15,
            flexDirection: 'row',
            width: cardWith - 75,
          }}
        >
          <LinearGradient
            colors={['#043F7C', '#FF5757']}
            style={{
              height: 44,
              width: 44,
              borderRadius: 22,
              marginRight: 5,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Image
              source={{ uri: `https://i.postimg.cc/${data.ownerImg}` }}
              style={{
                height: 40,
                width: 40,
                borderRadius: 20,
                borderColor: 'white',
              }}
            />
          </LinearGradient>
          <Text category="s2" status="control">
            My name is Tayo, the best of the best
          </Text>
        </View>
      </TouchableOpacity>
    ),
    [cardWith, data],
  );
}
