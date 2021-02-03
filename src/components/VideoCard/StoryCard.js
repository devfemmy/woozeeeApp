import React, { useMemo } from 'react';

import {
  View,
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';

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
          height: 175,
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
            height: 165,
            width: '100%',
            borderRadius: 5,
          }}
          resizeMode="cover"
        />
        <View
          tint="dark"
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
          <Text category="c1" style={{ color: 'white', marginBottom: 5 }}>
            {data.tag}
          </Text>
          <View>
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
        </View>
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
