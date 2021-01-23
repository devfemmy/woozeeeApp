import React, { useMemo } from 'react';

import { View } from 'react-native';

import { List, Text } from '@ui-kitten/components';

import VideoCard from '~src/components/Socials/VideoCard';

// prettier-ignore
export const TrendingChallenges = ({ info }) => useMemo(
  () => (
    <View style={{ marginBottom: 20, paddingVertical: 5 }}>
      <View style={{ paddingHorizontal: 10 }}>
        <Text category="h6" style={{ marginBottom: 5 }}>
          Trending Challenges
        </Text>
      </View>
      <List
        style={{ backgroundColor: 'transparent' }}
        alwaysBounceHorizontal
        horizontal
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={info}
        renderItem={(renderData) => (
          <VideoCard data={renderData.item} extraWidth={0.5} />
        )}
        getItemLayout={(data, index) => ({
          length: 170,
          offset: 170 * index,
          index,
        })}
      />
    </View>
  ),
  [info],
);

// prettier-ignore
export const UsersPosts = ({ info, tVideo }) => useMemo(
  // prettier-ignore
  () => info.map((item) => (
    <View
      style={{
        flex: 1,
        marginBottom: 10,
        paddingVertical: 5,
        maxHeight: 215,
      }}
      key={item.category}
    >
      <View style={{ paddingHorizontal: 10 }}>
        <Text category="h6" style={{ marginBottom: 5 }}>
          {item.category}
        </Text>
        {/* prettier-ignore */}
        <Text category="c1" style={{ marginBottom: 5 }}>
          {`${item.content.length} ${tVideo}(s)`}
        </Text>
      </View>
      <List
        style={{ backgroundColor: 'transparent' }}
        alwaysBounceHorizontal
        horizontal
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={item.content}
        renderItem={(renderData) => (
          <VideoCard data={renderData.item} extraWidth={0.5} />
        )}
        getItemLayout={(data, index) => ({
          length: 170,
          offset: 170 * index,
          index,
        })}
      />
    </View>
  )),
  [info, tVideo],
);

// prettier-ignore
export const ProfilePosts = ({ info }) => useMemo(
  () => (
    <List
      style={{
        backgroundColor: 'transparent',
      }}
      contentContainerStyle={{
        paddingTop: 5,
        paddingBottom: 20,
      }}
      alwaysBounceVertical
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      numColumns={2}
      data={info}
      renderItem={(renderData) => (
        <VideoCard data={renderData.item} extraWidth={0} />
      )}
      getItemLayout={(data, index) => ({
        length: 170,
        offset: 170 * index,
        index,
      })}
    />
  ),
  [info],
);
