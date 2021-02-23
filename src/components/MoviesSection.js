import React from 'react';

import { View, useWindowDimensions } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useQuery } from 'react-query';

import { List, Text, Divider } from '@ui-kitten/components';

import Api from 'src/api';

import FetchFailed from 'src/components/DataFetch/FetchFailed';

import Placeholders from 'src/components/Placeholders';

import MovieSectionCard from 'src/components/VideoCard/MovieSectionCard';

import { trendingUrl } from 'src/api/dummy';

export default function MoviesSection(props) {
  const { t, navigation, viewHeight } = props;

  const { width, height } = useWindowDimensions();

  const { bottom, top } = useSafeAreaInsets();

  const CONTENT_SPACE = bottom + top + 100;

  const LIST_HEIGHT = 200;

  const ITEM_HEIGHT = LIST_HEIGHT * 0.85;

  const MoviesSectionArea = () => {
    const { status, data, refetch } = useQuery(
      ['moviesSection', 1],
      async ({ pageParam = 1 }) => {
        const promise = await Api.getVideos(trendingUrl, 1, pageParam);
        promise.cancel = () => Api.cancelRequest('Request aborted');
        return promise;
      },
    );

    if (status === 'loading') {
      return (
        <Placeholders
          mediaLeft
          count={2}
          numColumns={2}
          maxHeight={200}
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
      && data.pageData.data.length > 0
    ) {
      return (
        <View
          style={{
            paddingVertical: 5,
            height: viewHeight,
            justifyContent: 'center',
          }}
        >
          <View style={{ paddingHorizontal: 10 }}>
            <Text category="h6" style={{ marginBottom: 5 }}>
              {t('movies')}
            </Text>
          </View>
          <List
            style={{ backgroundColor: 'red', height: viewHeight - 200 }}
            contentContainerStyle={{
              alignItems: 'center',
            }}
            alwaysBounceHorizontal
            horizontal
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            data={data.pageData.data}
            renderItem={(renderData) => (
              <MovieSectionCard data={renderData.item} extraWidth={0.5} />
            )}
            getItemLayout={(data, index) => ({
              length: 200,
              offset: 200 * index,
              index,
            })}
          />
        </View>
      );
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
    <View style={{ flex: 1 }}>
      <MoviesSectionArea />
      <Divider />
    </View>
  );
}
