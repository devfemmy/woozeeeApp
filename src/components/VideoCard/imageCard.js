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
            height: 165,
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
                borderWidth: 2,
                borderColor: 'white',
              }}
            />
          </Layout>
        ) : null}
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
    [data, IS_PORTRAIT, width, extraWidth],
  );
}
