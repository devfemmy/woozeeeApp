import React, { useMemo } from 'react';

import {
  View,
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';

import { BlurView } from 'expo-blur';

import { Layout, Text } from '@ui-kitten/components';

import Moment from 'react-moment';

export default function VideoCard(props) {
  const { data, extraWidth } = props;

  const { width, height } = useWindowDimensions();

  const IS_PORTRAIT = height > width;

  return useMemo(
    () => (
      <TouchableOpacity
        activeOpacity={0.75}
        style={{
          height: 170,
          width: IS_PORTRAIT
            ? width / (2 + extraWidth)
            : width / (3 + extraWidth),
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
            height: 160,
            width: '100%',
            borderRadius: 5,
          }}
          resizeMode="cover"
        />
        {data.ownerImg ? (
          <Layout
            level="3"
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              height: 43,
              width: 43,
              left: 10,
              top: 5,
              borderRadius: 100,
            }}
          >
            <Image
              source={{ uri: `https://i.postimg.cc/${data.ownerImg}` }}
              style={{
                height: 40,
                width: 40,
                borderRadius: 100,
                borderWidth: 3,
                borderColor: 'white',
              }}
            />
          </Layout>
        ) : null}
        <BlurView
          intensity={75}
          tint="dark"
          style={{
            position: 'absolute',
            bottom: 10,
            borderBottomLeftRadius: 5,
            borderBottomRightRadius: 5,
            paddingHorizontal: 5,
            width: '100%',
          }}
        >
          <Text category="c1" style={{ color: 'white', marginBottom: 5 }}>
            {data.tag}
          </Text>
          <View style={{ marginBottom: 5 }}>
            <Moment
              fromNow
              element={(momentProps) => (
                // eslint-disable-next-line react/jsx-props-no-spreading
                <Text
                  category="c1"
                  /* eslint-disable-next-line react/jsx-props-no-spreading */
                  {...momentProps}
                  style={{ color: 'white' }}
                />
              )}
            >
              {data.dateAdded}
            </Moment>
          </View>
        </BlurView>
      </TouchableOpacity>
    ),
    [
      data.banner,
      data.dateAdded,
      data.tag,
      data.ownerImg,
      data.index,
      IS_PORTRAIT,
      width,
      extraWidth,
    ],
  );
}
