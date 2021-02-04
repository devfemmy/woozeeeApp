// prettier-ignore
import React, {
  useCallback, useMemo, useState, useContext,
} from 'react';

import {
  View,
  useWindowDimensions,
  Image,
  TouchableOpacity,
} from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { List, Text } from '@ui-kitten/components';

import { LocaleContext } from '~src/contexts';

import VideoCard from '~src/components/VideoCard';

import StoryCard from '~src/components/VideoCard/StoryCard';

import VideoFullscreen from '~src/components/VideoFullscreen';

// import VideoView from '~src/components/VideoView';

import { IconPlusCircle } from '~src/components/CustomIcons';

export const TrendingPosts = ({ info }) => {
  const t = useContext(LocaleContext);
  return useMemo(
    () => (
      <View style={{ marginBottom: 20, paddingVertical: 5 }}>
        <View style={{ paddingHorizontal: 10 }}>
          <Text category="h6" style={{ marginBottom: 5 }}>
            {t('trendingChallenges')}
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
    [t, info],
  );
};

export const StoryPosts = ({ info }) => {
  const t = useContext(LocaleContext);

  const RenderCategoryHeader = useMemo(
    () => (
      <View style={{ paddingHorizontal: 10, alignItems: 'center' }}>
        <TouchableOpacity activeOpacity={0.75} style={{ position: 'relative' }}>
          <Image
            source={require('~assets/images/user/user2.png')}
            style={{
              height: 100,
              width: 100,
              borderRadius: 100,
            }}
          />
          <View
            style={{
              minHeight: 20,
              minWidth: 20,
              borderRadius: 100,
              position: 'absolute',
              backgroundColor: 'white',
              right: 3,
              bottom: 3,
            }}
          >
            <IconPlusCircle height={28} width={28} fill="#043F7C" />
          </View>
        </TouchableOpacity>
        <Text category="s2" style={{ marginTop: 10 }}>
          {t('yourStory')}
        </Text>
      </View>
    ),
    [t],
  );

  return useMemo(
    () => (
      <View style={{ paddingVertical: 5 }}>
        <View style={{ paddingHorizontal: 10, paddingBottom: 10 }}>
          <Text category="h6">{t('recentStories')}</Text>
        </View>
        <List
          style={{ backgroundColor: 'transparent' }}
          contentContainerStyle={{ alignItems: 'center' }}
          alwaysBounceHorizontal
          horizontal
          ListHeaderComponent={RenderCategoryHeader}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={info}
          renderItem={(renderData) => (
            <StoryCard data={renderData.item} extraWidth={0.5} />
          )}
          getItemLayout={(data, index) => ({
            length: 175,
            offset: 175 * index,
            index,
          })}
        />
      </View>
    ),
    [t, info, RenderCategoryHeader],
  );
};

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
        paddingTop: 10,
        paddingBottom: 20,
        alignItems: 'center',
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

// export const SocialPosts = ({ info }) => {
//   const { height } = useWindowDimensions();

//   const [activeIndex, setActiveIndex] = useState(0);

//   const ITEM_HEIGHT = height / 2;

//   const VIEWABILITY_CONFIG = useMemo(
//     () => ({
//       minimumViewTime: 100,
//       viewAreaCoveragePercentThreshold: 50,
//     }),
//     [],
//   );

//   // show currently viewing video
//   const handleViewItemsChanged = useCallback((data) => {
//     setActiveIndex(data.changed[0].index);
//   }, []);

//   return useMemo(
//     () => (
//       <List
//         style={{
//           flex: 1,
//           backgroundColor: 'transparent',
//           height: ITEM_HEIGHT,
//         }}
//         alwaysBounceVertical
//         showsHorizontalScrollIndicator={false}
//         showsVerticalScrollIndicator={false}
//         data={info}
//         renderItem={(renderData) => (
//           <VideoView
//             data={renderData}
//             activeIndex={activeIndex}
//             viewHeight={ITEM_HEIGHT}
//           />
//         )}
//         extraData={activeIndex}
//         snapToAlignment="start"
//         decelerationRate="fast"
//         snapToInterval={ITEM_HEIGHT}
//         getItemLayout={(data, index) => ({
//           length: ITEM_HEIGHT,
//           offset: ITEM_HEIGHT * index,
//           index,
//         })}
//         initialNumToRender={4}
//         onViewableItemsChanged={handleViewItemsChanged}
//         viewabilityConfig={VIEWABILITY_CONFIG}
//       />
//     ),
//     [
//       info,
//       activeIndex,
//       handleViewItemsChanged,
//       VIEWABILITY_CONFIG,
//       ITEM_HEIGHT,
//     ],
//   );
// };

export const WoozPosts = ({ info }) => {
  const { bottom, top } = useSafeAreaInsets();

  const { height } = useWindowDimensions();

  const [activeIndex, setActiveIndex] = useState(0);

  const CONTENT_SPACE = bottom + top + 56;

  const ITEM_HEIGHT = height - CONTENT_SPACE;

  const VIEWABILITY_CONFIG = useMemo(
    () => ({
      minimumViewTime: 200,
      viewAreaCoveragePercentThreshold: 60,
    }),
    [],
  );

  // show currently viewing video
  const handleViewItemsChanged = useCallback((data) => {
    setActiveIndex(data.changed[0].index);
  }, []);

  const renderPost = useCallback(
    (renderData) => (
      <VideoFullscreen
        data={renderData}
        extraWidth={0.5}
        activeIndex={activeIndex}
        viewHeight={ITEM_HEIGHT}
      />
    ),
    [ITEM_HEIGHT, activeIndex],
  );

  return useMemo(
    () => (
      <List
        style={{
          backgroundColor: 'transparent',
          height: ITEM_HEIGHT,
        }}
        alwaysBounceVertical
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={info}
        renderItem={renderPost}
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
      renderPost,
      VIEWABILITY_CONFIG,
      ITEM_HEIGHT,
    ],
  );
};

// export const AllPosts = ({ info }) => {
//   const { width, height } = useWindowDimensions();

//   const IS_PORTRAIT = height > width;

//   const ListHeader = () => (
//     <View style={{ padding: 10 }}>
//       <Text category="h5">Summer Videos</Text>
//     </View>
//   );

//   return useMemo(
//     () => (
//       <List
//         style={{
//           backgroundColor: 'transparent',
//         }}
//         contentContainerStyle={{
//           paddingTop: 5,
//           paddingBottom: 15,
//         }}
//         alwaysBounceVertical
//         showsHorizontalScrollIndicator={false}
//         showsVerticalScrollIndicator={false}
//         ListHeaderComponent={ListHeader}
//         numColumns={IS_PORTRAIT ? 2 : 3}
//         key={IS_PORTRAIT ? 2 : 3}
//         data={info}
//         renderItem={(renderData) => (
//           <VideoCard data={renderData.item} extraWidth={0} />
//         )}
//         getItemLayout={(data, index) => ({
//           length: 175,
//           offset: 175 * index,
//           index,
//         })}
//       />
//     ),
//     [info, IS_PORTRAIT],
//   );
// };
