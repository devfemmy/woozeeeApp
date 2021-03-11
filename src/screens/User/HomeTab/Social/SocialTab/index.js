// prettier-ignore
import React, {
  useState, useCallback, useContext, useMemo,
} from 'react';

import { View, useWindowDimensions } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useInfiniteQuery } from 'react-query';

// prettier-ignore
import {
  Layout, List,
} from '@ui-kitten/components';

import Api from 'src/api';

import { LocaleContext } from 'src/contexts';

import useDisableAndroidExit from 'src/hooks/useDisableAndroidExit';

import TopNavigationArea from 'src/components/TopNavigationArea';

import WithDefaultFetch from 'src/components/DataFetch';

import FetchFailed from 'src/components/DataFetch/FetchFailed';

import Placeholders from 'src/components/Placeholders';

import { StoryPosts } from 'src/components/VideoPosts';

import VideoView from 'src/components/VideoView';

import MoviesSection from 'src/components/MoviesSection';

import { trendingUrl, socialUrl } from 'src/api/dummy';

const PLACEHOLDER_CONFIG1 = {
  count: 2,
  numColumns: 2,
  maxHeight: 180,
  mediaLeft: false,
};

// prettier-ignore
const StoryPostsArea = () => WithDefaultFetch(StoryPosts, trendingUrl, PLACEHOLDER_CONFIG1);

export default function Explore({ navigation }) {
  useDisableAndroidExit();

  const { width, height } = useWindowDimensions();

  const { bottom, top } = useSafeAreaInsets();

  const CONTENT_SPACE = 100;

  const INSETS = bottom + top;

  const LIST_HEIGHT = height - (CONTENT_SPACE + INSETS);

  const ITEM_HEIGHT = LIST_HEIGHT * 0.8;

  const t = useContext(LocaleContext);

  const VIEWABILITY_CONFIG = useMemo(
    () => ({
      minimumViewTime: 200,
      viewAreaCoveragePercentThreshold: 51,
    }),
    [],
  );

  const SocialPostsArea = () => {
    const [activeIndex, setActiveIndex] = useState(0);

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
        keepPreviousData: true,
        cacheTime: 1000 * 60 * 1,
      },
    );

    if (status === 'loading') {
      return (
        <Placeholders
          mediaLeft={false}
          count={1}
          numColumns={1}
          maxHeight={height * 0.8}
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
    if (
      // prettier-ignore
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
              }}
              alwaysBounceVertical
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              ListHeaderComponent={StoryPostsArea}
              ListHeaderComponentStyle={{
                paddingVertical: 10,
                borderBottomWidth: 1,
                borderColor: 'rgba(143, 155, 179, 0.08)',
              }}
              data={page.pageData.data}
              keyExtractor={(_, i) => i.toString()}
              // prettier-ignore
              renderItem={({ item, index }) => ((index + 1) < 12 && (index + 1) % 4 === 0 ? (
                <MoviesSection t={t} navigation={navigation} viewHeight={ITEM_HEIGHT} />
              ) : (
                <VideoView
                  data={{ item, index }}
                  activeIndex={activeIndex}
                  viewHeight={ITEM_HEIGHT}
                  navigation={navigation}
                  t={t}
                />
              ))}
              extraData={activeIndex}
              getItemLayout={(data, index) => ({
                length: ITEM_HEIGHT,
                offset: ITEM_HEIGHT * index + ITEM_HEIGHT / 2,
                index,
              })}
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
  };

  return (
    <Layout level="6" style={{ flex: 1 }}>
      <TopNavigationArea
        title="woozeee"
        navigation={navigation}
        screen="social"
      />
      <SocialPostsArea />
    </Layout>
  );
}
