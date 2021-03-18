import React, { useCallback, useContext, useRef } from 'react';

import { View, useWindowDimensions } from 'react-native';

import { useInfiniteQuery } from 'react-query';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

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

import { StoryPosts } from 'src/components/SocialPosts';

import VideoView from 'src/components/VideoView';

import MoviesSection from 'src/components/MoviesSection';

import { trendingUrl, socialUrl } from 'src/api/dummy';

const PLACEHOLDER_CONFIG1 = {
  count: 2,
  numColumns: 2,
  maxHeight: 147,
  mediaLeft: false,
};

// prettier-ignore
const StoryPostsArea = () => WithDefaultFetch(StoryPosts, trendingUrl, PLACEHOLDER_CONFIG1);

const VIEWABILITY_CONFIG = {
  minimumViewTime: 250,
  itemVisiblePercentThreshold: 65,
};

export default function Social({ navigation }) {
  useDisableAndroidExit();

  const { width, height } = useWindowDimensions();

  const { bottom, top } = useSafeAreaInsets();

  const SPACING = 57 + bottom + top;

  const VIEW_HEIGHT = height - SPACING;

  const ITEM_HEIGHT = VIEW_HEIGHT * 0.75;

  const t = useContext(LocaleContext);

  const SocialPostsArea = () => {
    const cellRefs = useRef({});

    const handleOnViewableItemsChanged = useCallback((props) => {
      const { changed } = props;

      changed.forEach((item) => {
        const cell = cellRefs.current[item.key];
        if (cell) {
          if (item.isViewable) {
            cell.play();
          } else {
            cell.pause();
          }
        }
      });
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
              }}
              initialNumToRender={3}
              maxToRenderPerBatch={3}
              windowSize={5}
              alwaysBounceVertical
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              removeClippedSubviews
              onViewableItemsChanged={handleOnViewableItemsChanged}
              viewabilityConfig={VIEWABILITY_CONFIG}
              ListHeaderComponent={StoryPostsArea}
              ListHeaderComponentStyle={{
                paddingVertical: 10,
                borderBottomWidth: 1,
                borderColor: 'rgba(143, 155, 179, 0.08)',
              }}
              data={page.pageData.data}
              keyExtractor={(_, i) => i.toString()}
              renderItem={({ item, index }) => (
                <>
                  <VideoView
                    ref={(ref) => {
                      cellRefs.current[index.toString()] = ref;
                    }}
                    data={{ item, index }}
                    viewHeight={ITEM_HEIGHT}
                    navigation={navigation}
                    t={t}
                  />
                  {index + 1 < 12 && (index + 1) % 4 === 0 ? (
                    <MoviesSection
                      t={t}
                      navigation={navigation}
                      width={width}
                      height={ITEM_HEIGHT}
                    />
                  ) : null}
                </>
              )}
              // getItemLayout={(data, index) => ({
              //   length: ITEM_HEIGHT,
              //   offset: ITEM_HEIGHT * index,
              //   index,
              // })}
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
