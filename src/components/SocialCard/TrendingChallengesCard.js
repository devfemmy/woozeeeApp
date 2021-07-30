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
import { Video } from 'expo-av';

export default function TrendingChallengesCard(props) {
  const { data, extraWidth, navigation } = props;

  console.log('from tcc => ', data);

  const { width, height } = useWindowDimensions();

  const IS_PORTRAIT = height > width;

  return (
    <View
      style={{
        width: IS_PORTRAIT
          ? width / (2 + extraWidth)
          : width / (4 + extraWidth),
        paddingHorizontal: 5,
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}
    >
      <TouchableOpacity
        //   onPress={props.pressed}
        activeOpacity={0.75}
        style={{
          width: '100%',
          position: 'relative',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}
      >
        <Video
          source={{ uri: data.mediaURL }}
          shouldPlay={true}
          isLooping={true}
          volume={0}
          style={{
            height: 200,
            width: '100%',
            borderRadius: 5,
          }}
          resizeMode="cover"
        />
        {/* <View
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
              {data.totalViews}
            </Text>
          </View> */}
      </TouchableOpacity>
    </View>
  );
}
