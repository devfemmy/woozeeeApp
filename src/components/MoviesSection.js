import React, { useMemo, useCallback } from 'react';

import { View } from 'react-native';

import { useQuery } from 'react-query';

// prettier-ignore
import {
  List, Text, Divider, Button,
} from '@ui-kitten/components';

import Api from 'src/api';

import FetchFailed from 'src/components/DataFetch/FetchFailed';

import Placeholders from 'src/components/Placeholders';

import MovieSectionCard from 'src/components/SocialCard/MovieSectionCard';

import { trendingUrl } from 'src/api/dummy';

import { IconForwardIos } from 'src/components/CustomIcons';

const MoviesSectionArea = (props) => {
  const { t, navigation, width, height } = props;

  const routeMovies = useCallback(() => navigation.navigate('Movies'), [
    navigation,
  ]);

  const { status, data, refetch } = useQuery(
    ['moviesSection', 1],
    async ({ pageParam = 1 }) => {
      const promise = await Api.getVideos(trendingUrl, 1, pageParam);
      promise.cancel = () => Api.cancelRequest('Request aborted');
      return promise;
    },
    {
      cacheTime: 1000 * 60 * 1,
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
          justifyContent: 'center',
        }}
      >
        <View
          style={{
            paddingLeft: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Text category="h6">{t('movies')}</Text>
          <Button
            size="tiny"
            appearance="ghost"
            accessoryRight={IconForwardIos}
            onPress={routeMovies}
          >
            <Text status="primary" category="s2">
              {t('viewAll')}
            </Text>
          </Button>
        </View>
        <List
          style={{ backgroundColor: 'transparent', maxHeight: 260 }}
          contentContainerStyle={{
            alignItems: 'center',
            padding: 5,
          }}
          alwaysBounceHorizontal
          horizontal
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={data.pageData.data}
          keyExtractor={(_, i) => i.toString()}
          renderItem={(renderData) => (
            <MovieSectionCard pressed={() => navigation.navigate('ViewMovies', {movie_data: renderData})}  data={renderData.item} extraWidth={0.5} />
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
    <FetchFailed onPress={refetch} info={t('noVideos')} retry={t('refresh')} />
  );
};

export default function MoviesSection(props) {
  return useMemo(
    () => (
      <View style={{ flex: 1 }}>
        <MoviesSectionArea {...props} />
        <Divider />
      </View>
    ),
    [props],
  );
}
