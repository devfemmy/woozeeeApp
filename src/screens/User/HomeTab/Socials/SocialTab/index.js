// prettier-ignore
import React, {
  useState, useMemo, useCallback, useContext,
} from 'react';

import { View, useWindowDimensions } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useInfiniteQuery } from 'react-query';

import { Layout, List } from '@ui-kitten/components';

import Api from '~src/api';

import { LocaleContext } from '~src/contexts';

import TopNavigationArea from '~src/components/TopNavigationArea';

import WithDefaultFetch from '~src/components/DataFetch';

import FetchFailed from '~src/components/DataFetch/FetchFailed';

import Placeholders from '~src/components/Placeholders';

import { StoryPosts } from '~src/components/VideoPosts';

import VideoView from '~src/components/VideoView';

import { trendingUrl, socialUrl } from '~src/api/dummy';

const PLACEHOLDER_CONFIG1 = {
  count: 2,
  numColumns: 2,
  maxHeight: 180,
  mediaLeft: false,
};

// eslint-disable-next-line react/prop-types
export default function Explore({ navigation }) {
  const { width, height } = useWindowDimensions();

  const { bottom, top } = useSafeAreaInsets();

  const CONTENT_SPACE = bottom + top + 100;

  const LIST_HEIGHT = height - CONTENT_SPACE;

  const ITEM_HEIGHT = LIST_HEIGHT;

  const t = useContext(LocaleContext);

  // prettier-ignore
  const StoryPostsArea = () => WithDefaultFetch(StoryPosts, trendingUrl, PLACEHOLDER_CONFIG1);

  const SocialPostsArea = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const VIEWABILITY_CONFIG = useMemo(
      () => ({
        minimumViewTime: 100,
        viewAreaCoveragePercentThreshold: 60,
      }),
      [],
    );

    const handleViewItemsChanged = useCallback((data) => {
      setActiveIndex(data.changed[0].index);
    }, []);

    const {
      status,
      data,
      error,
      isFetching,
      isFetchingNextPage,
      isFetchingPreviousPage,
      fetchNextPage,
      fetchPreviousPage,
      refetch,
      hasNextPage,
      hasPreviousPage,
    } = useInfiniteQuery(
      ['inFiniteSocialVideos', 1],
      async ({ pageParam = 1 }) => {
        const promise = await Api.getVideos(socialUrl, 1, pageParam);
        promise.cancel = () => Api.cancelRequest('Request aborted');
        return promise;
      },
      {
        getPreviousPageParam: (firstPage) => firstPage.previousID ?? false,
        getNextPageParam: (lastPage) => lastPage.nextID ?? false,
        // keepPreviousData: true,
        cacheTime: 1000 * 60 * 1,
      },
    );

    return useMemo(() => {
      if (status === 'loading') {
        return (
          <Placeholders
            mediaLeft={false}
            count={1}
            numColumns={1}
            maxHeight={height * 0.65}
            maxWidth={width}
          />
        );
      }
      if (status === 'error') {
        return (
          <FetchFailed
            onPress={refetch}
            info={t('networkError')}
            retry={t('retry')}
          />
        );
      }
      // prettier-ignore
      if (
        status !== 'loading'
        && status !== 'error'
        && data.pages[0].pageData.data.length > 0
      ) {
        return data.pages.map((page) => (
          <React.Fragment key={page.nextID}>
            <View style={{ flex: 1 }}>
              <List
                style={{
                  flex: 1,
                  backgroundColor: 'transparent',
                  height: LIST_HEIGHT,
                  paddingBottom: 20,
                  paddingTop: 10,
                }}
                alwaysBounceVertical
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={StoryPostsArea}
                ListHeaderComponentStyle={{
                  paddingBottom: 10,
                  borderBottomWidth: 1,
                  borderColor: 'rgba(0, 0, 0, 0.05)',
                }}
                data={page.pageData.data}
                renderItem={(renderData) => (
                  <VideoView
                    data={renderData}
                    activeIndex={activeIndex}
                    viewHeight={ITEM_HEIGHT}
                  />
                )}
                snapToAlignment="start"
                decelerationRate="fast"
                snapToInterval={ITEM_HEIGHT}
                extraData={activeIndex}
                getItemLayout={(data, index) => ({
                  length: ITEM_HEIGHT,
                  offset: ITEM_HEIGHT * index,
                  index,
                })}
                initialNumToRender={4}
                onViewableItemsChanged={handleViewItemsChanged}
                viewabilityConfig={VIEWABILITY_CONFIG}
              />
            </View>
          </React.Fragment>
        ));
      }
      return (
        <FetchFailed
          onPress={refetch}
          info={t('noVideos')}
          retry={t('refresh')}
        />
      );
    }, [
      refetch,
      status,
      data,
      handleViewItemsChanged,
      activeIndex,
      VIEWABILITY_CONFIG,
    ]);
  };

  return useMemo(
    () => (
      <Layout level="4" style={{ flex: 1 }}>
        <TopNavigationArea
          title="woozeee"
          navigation={navigation}
          screen="social"
        />
        <SocialPostsArea />
      </Layout>
    ),
    [navigation],
  );
}
