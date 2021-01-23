import React from 'react';

import { View, ScrollView } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { Layout } from '@ui-kitten/components';

import TopNavigationArea from '~src/components/TopNavigationArea';

import WithVideoPosts from '~src/components/VideoPosts/WithVideoPosts';

import { TrendingChallenges, UsersPosts } from '~src/components/VideoPosts';

import { trendingUrl, challengeUrl } from '~src/api/dummy';

// eslint-disable-next-line react/prop-types
export default function Explore({ navigation }) {
  // prettier-ignore
  const TrendingChallengesArea = () => WithVideoPosts(TrendingChallenges, trendingUrl, 2);

  const UserPostsArea = () => WithVideoPosts(UsersPosts, challengeUrl, 4);

  return (
    <Layout level="4" style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <TopNavigationArea
          title="woozeee"
          navigation={navigation}
          icon="logout"
          screen="search"
        />
        <ScrollView
          style={{ flex: 1, paddingVertical: 10 }}
          alwaysBounceVertical
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <View style={{ paddingBottom: 20 }}>
            <View>
              <TrendingChallengesArea />
            </View>
            <View>
              <UserPostsArea />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Layout>
  );
}
