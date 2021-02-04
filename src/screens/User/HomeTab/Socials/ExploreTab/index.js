import React from 'react';

import { View, ScrollView } from 'react-native';

import { Layout } from '@ui-kitten/components';

import TopNavigationArea from '~src/components/TopNavigationArea';

import WithDefaultFetch from '~src/components/DataFetch';

import { TrendingPosts, UsersPosts } from '~src/components/VideoPosts';

import { trendingUrl, challengeUrl } from '~src/api/dummy';

const PLACEHOLDER_CONFIG1 = {
  count: 2,
  numColumns: 2,
  maxHeight: 180,
  mediaLeft: true,
};

const PLACEHOLDER_CONFIG2 = {
  ...PLACEHOLDER_CONFIG1,
  count: 4,
};

// eslint-disable-next-line react/prop-types
export default function Explore({ navigation }) {
  // prettier-ignore
  const TrendingPostsArea = () => (
    WithDefaultFetch(TrendingPosts, trendingUrl, PLACEHOLDER_CONFIG1)
  );

  // prettier-ignore
  const UserPostsArea = () => WithDefaultFetch(UsersPosts, challengeUrl, PLACEHOLDER_CONFIG2);

  return (
    <Layout level="6" style={{ flex: 1 }}>
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
            <TrendingPostsArea />
          </View>
          <View>
            <UserPostsArea />
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
}
