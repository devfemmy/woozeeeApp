import React, { useCallback, useMemo, useState } from 'react';

import { View, useWindowDimensions } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { List, Text } from '@ui-kitten/components';

import VideoCard from '~src/components/Socials/VideoCard';

import VideoView from '~src/components/VideoView';

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
          length: 175,
          offset: 175 * index,
          index,
        })}
      />
    </View>
  ),
  [info],
);

// prettier-ignore
export const UsersPosts = ({ info }) => useMemo(
  // prettier-ignore
  () => info.map((item) => (
    <View
      style={{
        flex: 1,
        marginBottom: 10,
        paddingVertical: 5,
        maxHeight: 225,
      }}
      key={item.category}
    >
      <View style={{ paddingHorizontal: 10 }}>
        <Text category="h6" style={{ marginBottom: 5 }}>
          {item.category}
        </Text>
        {/* prettier-ignore */}
        <Text category="c1" style={{ marginBottom: 5 }}>
          {`${item.content.length} Videos(s)`}
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
          length: 175,
          offset: 175 * index,
          index,
        })}
      />
    </View>
  )),
  [info],
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
        length: 175,
        offset: 175 * index,
        index,
      })}
    />
  ),
  [info],
);

// prettier-ignore
export const SocialPosts = ({ info }) => {
  const { bottom, top } = useSafeAreaInsets();

  const { height } = useWindowDimensions();
  
  const [activeIndex, setActiveIndex] = useState(0);

  const CONTENT_SPACE = bottom + top + 56;

  const ITEM_HEIGHT = height - CONTENT_SPACE;

  const VIEWABILITY_CONFIG = useMemo(() => ({
    minimumViewTime: 100,
    viewAreaCoveragePercentThreshold: 50,
  }), []);

  // show currently viewing video
  const handleViewItemsChanged = useCallback((data) => {
    setActiveIndex(data.changed[0].index);
  }, []);

  return useMemo(
    () => (
      <List
        style={{
          flex: 1,
          backgroundColor: 'transparent',
          position: 'absolute',
          height: ITEM_HEIGHT,
        }}
        alwaysBounceVertical
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={info}
        renderItem={(renderData) => (
          <VideoView
            data={renderData}
            extraWidth={0.5}
            activeIndex={activeIndex}
            viewHeight={ITEM_HEIGHT}
          />
        )}
        extraData={activeIndex}
        snapToAlignment="start"
        decelerationRate="fast"
        snapToInterval={ITEM_HEIGHT}
        getItemLayout={(data, index) => ({
          length: ITEM_HEIGHT,
          offset: ITEM_HEIGHT * index,
          index,
        })}
        initialNumToRender={4}
        onViewableItemsChanged={handleViewItemsChanged}
        viewabilityConfig={VIEWABILITY_CONFIG}
      />
    ),
    [
      info,
      activeIndex,
      handleViewItemsChanged,
      VIEWABILITY_CONFIG,
      ITEM_HEIGHT,
    ],
  );
};

// prettier-ignore
export const AllPosts = ({ info }) => {
  const { width, height } = useWindowDimensions();

  const IS_PORTRAIT = height > width;

  const ListHeader = () => (
    <View style={{ padding: 10 }}>
      <Text category="h5">Summer Videos</Text>
    </View>
  );

  return useMemo(
    () => (
      <List
        style={{
          backgroundColor: 'transparent',
        }}
        contentContainerStyle={{
          paddingTop: 5,
          paddingBottom: 15,
        }}
        alwaysBounceVertical
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={ListHeader}
        numColumns={IS_PORTRAIT ? 2 : 3}
        key={IS_PORTRAIT ? 2 : 3}
        data={info}
        renderItem={(renderData) => (
          <VideoCard data={renderData.item} extraWidth={0} />
        )}
        getItemLayout={(data, index) => ({
          length: 175,
          offset: 175 * index,
          index,
        })}
      />
    ),
    [info, IS_PORTRAIT],
  );
};
