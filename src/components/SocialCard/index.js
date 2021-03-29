import React, { useMemo, useCallback } from 'react';

import {
  View,
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { LinearGradient } from 'expo-linear-gradient';

import { Text } from '@ui-kitten/components';

export default function VideoCard(props) {
  // prettier-ignore
  const {
    data, extraWidth, numColumns,
  } = props;

  const navigation = useNavigation();

  const { width, height } = useWindowDimensions();

  const IS_PORTRAIT = height > width;

  const COLUMN_COUNT = numColumns ?? (IS_PORTRAIT ? 3 : 5);

  const routeChallengeWooz = useCallback(
    () => navigation.navigate('ChallengeWooz'),
    [navigation],
  );

  return useMemo(
    () => (
      <TouchableOpacity
        activeOpacity={0.75}
        style={{
          height: 180,
          width: IS_PORTRAIT
            ? width / (COLUMN_COUNT + extraWidth)
            : width / (COLUMN_COUNT + extraWidth),
          paddingHorizontal: 3,
          position: 'relative',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}
        onPress={routeChallengeWooz}
      >
        <Image
          source={{ uri: `https://i.postimg.cc/${data.banner}` }}
          defaultSource={require('assets/images/banner/placeholder-image.png')}
          style={{
            height: 175,
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
            <Text
              category="c2"
              style={{ color: 'white', marginBottom: 5 }}
              numberOfLines={1}
            >
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
    [COLUMN_COUNT, IS_PORTRAIT, extraWidth, width, data, routeChallengeWooz],
  );
}
