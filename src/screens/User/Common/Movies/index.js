import React, { useContext } from 'react';

import { View, useWindowDimensions, TouchableOpacity } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useInfiniteQuery } from 'react-query';

import { Layout, List, Text } from '@ui-kitten/components';

import Api from 'src/api';

import { LocaleContext } from 'src/contexts';

import useDisableAndroidExit from 'src/hooks/useDisableAndroidExit';

import TopNavigationArea from 'src/components/TopNavigationArea';

import FetchFailed from 'src/components/DataFetch/FetchFailed';

import Placeholders from 'src/components/Placeholders';

import MovieCard from 'src/components/VideoCard/MovieCard';

import { trendingUrl } from 'src/api/dummy';

const MOVIE_CATEGORIES = [
  {
    id: 1,
    title: 'All',
  },
  {
    id: 2,
    title: 'Trending',
  },
  {
    id: 3,
    title: 'woozeee Originals',
  },
  {
    id: 4,
    title: 'Classics',
  },
  {
    id: 5,
    title: 'Anime',
  },
  {
    id: 6,
    title: 'Romance',
  },
  {
    id: 7,
    title: 'Triller',
  },
];

// const StoryPostsArea = () => WithDefaultFetch(StoryPosts, trendingUrl, PLACEHOLDER_CONFIG1);

const MovieCategory = (props) => {
  const { data } = props;
  return (
    <Layout
      level="2"
      style={{
        height: 40,
        marginHorizontal: 5,
        borderRadius: 20,
      }}
    >
      <TouchableOpacity
        activeOpacity={0.75}
        style={{
          backgroundColor: 'transparent',
          borderColor: 'transparent',
          borderRadius: 0,
          borderBottomWidth: 3,
          paddingHorizontal: 15,
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <Text status="basic">{data.item.title}</Text>
      </TouchableOpacity>
    </Layout>
  );
};

const renderMovieCategories = () => (
  <View style={{ marginBottom: 20, height: 45 }}>
    <List
      style={{
        flex: 1,
        backgroundColor: 'transparent',
      }}
      contentContainerStyle={{
        paddingHorizontal: 10,
      }}
      alwaysBounceHorizontal
      horizontal
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      data={MOVIE_CATEGORIES}
      renderItem={(renderData) => <MovieCategory data={renderData} />}
      getItemLayout={(data, index) => ({
        length: 50,
        offset: 50 * index,
        index,
      })}
    />
  </View>
);

export default function Explore({ navigation }) {
  useDisableAndroidExit();

  const { width, height } = useWindowDimensions();

  const { bottom, top } = useSafeAreaInsets();

  const t = useContext(LocaleContext);

  const SocialPostsArea = () => {
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
      ['infiniteMovies', 1],
      async ({ pageParam = 1 }) => {
        const promise = await Api.getVideos(trendingUrl, 1, pageParam);
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
          mediaLeft
          row
          count={4}
          numColumns={2}
          maxHeight={270}
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
                backgroundColor: 'transparent',
              }}
              contentContainerStyle={{
                paddingVertical: 20,
                alignItems: 'center',
              }}
              ListHeaderComponent={renderMovieCategories}
              alwaysBounceVertical
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              numColumns={2}
              data={page.pageData.data}
              renderItem={(renderData) => (
                <MovieCard data={renderData.item} extraWidth={0} />
              )}
              getItemLayout={(data, index) => ({
                length: 270,
                offset: 270 * index,
                index,
              })}
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
        icon="logout"
        screen="search"
      />
      <SocialPostsArea />
    </Layout>
  );
}
