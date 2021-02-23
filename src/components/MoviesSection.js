import React, { useMemo, useCallback } from 'react';

import { View, useWindowDimensions } from 'react-native';

import { useQuery } from 'react-query';

// prettier-ignore
import {
  List, Text, Divider, Button,
} from '@ui-kitten/components';

import Api from 'src/api';

import FetchFailed from 'src/components/DataFetch/FetchFailed';

import Placeholders from 'src/components/Placeholders';

import MovieSectionCard from 'src/components/VideoCard/MovieSectionCard';

import { trendingUrl } from 'src/api/dummy';

export default function MoviesSection(props) {
  const { t, navigation, viewHeight } = props;

  const { width } = useWindowDimensions();

  const routeMovies = useCallback(() => navigation.navigate('Movies'), [
    navigation,
  ]);

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
          <View
            style={{
              paddingHorizontal: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Text category="h6">{t('movies')}</Text>
            <Button appearance="ghost" size="tiny" onPress={routeMovies}>
              <Text status="primary" category="s2">
                {t('viewAll')}
              </Text>
            </Button>
          </View>
          <List
            style={{ backgroundColor: 'transparent', maxHeight: 360 }}
            contentContainerStyle={{
              alignItems: 'center',
              paddingVertical: 5,
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
              length: 360,
              offset: 360 * index,
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

  return useMemo(
    () => (
      <View style={{ flex: 1 }}>
        <MoviesSectionArea />
        <Divider />
      </View>
    ),
    [],
  );
}
