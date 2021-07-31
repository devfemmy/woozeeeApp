import React, { useMemo, useCallback, useState } from 'react';

import { View } from 'react-native';

import { useQuery } from 'react-query';

// prettier-ignore
import {
  List, Text, Divider, Button,
} from '@ui-kitten/components';

import Api from 'src/api';

import FetchFailed from '../../components/DataFetch/FetchFailed';

import Placeholders from '../../components/Placeholders';

import TrendingChallengesCard from '../SocialCard/TrendingChallengesCard';

import MovieSectionCard from 'src/components/SocialCard/MovieSectionCard';

import { IconForwardIos } from '../../components/CustomIcons';

const TrendingSectionArea = (props) => {
  const { t, navigation, width, height } = props;

  const [challengeData, setChallengeData] = useState([]);

  const routeChallenges = useCallback(
    () => navigation.navigate('ChallengeTab'),
    [navigation],
  );

  const { status, data, refetch } = useQuery(
    ['challengesSection', 1],
    async () => {
      const promise = await Api.getTrendingChallenges();
      promise.cancel = () => Api.cancelRequest('Request aborted');
      return promise;
    },
    {
      cacheTime: 1000 * 60 * 1,
    },
  );

  //   console.log('data is', data.pageData.data[1].subs[0]);
  //   data.length &&
  //     data.pageData.data[0].subs[3].map((item) => {
  //       setChallengeData(...challengeData, item.mediaURL);
  //     });
  //   console.log('challengeData => ', challengeData);

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
          <Text category="h6" status="basic">
            Trending Challenges
          </Text>
          <Button
            size="tiny"
            appearance="ghost"
            accessoryRight={IconForwardIos}
            onPress={routeChallenges}
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
          data={data.pageData.data[1].subs[0].entries}
          keyExtractor={(_, i) => i.toString()}
          renderItem={(renderData) => (
            <TrendingChallengesCard
              //   pressed={() =>
              //     navigation.navigate('ViewMovies', { movie_data: renderData })
              //   }
              data={renderData.item}
              extraWidth={0.5}
            />
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

export default function TrendingChallenges(props) {
  return useMemo(
    () => (
      <View style={{ flex: 1 }}>
        <TrendingSectionArea {...props} />
        <Divider />
      </View>
    ),
    [props],
  );
}
