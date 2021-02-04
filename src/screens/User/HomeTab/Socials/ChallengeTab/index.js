import React from 'react';

import { View, ScrollView } from 'react-native';

import { Layout } from '@ui-kitten/components';

import TopNavigationArea from '~src/components/TopNavigationArea';

import WithDefaultFetch from '~src/components/DataFetch';

import { UsersPosts } from '~src/components/VideoPosts';

import { challengeUrl } from '~src/api/dummy';

const PLACEHOLDER_CONFIG = {
  count: 6,
  numColumns: 2,
  maxHeight: 180,
  mediaLeft: true,
};

// eslint-disable-next-line react/prop-types
export default function Challenge({ navigation }) {
  // prettier-ignore
  const UserPostsArea = () => WithDefaultFetch(UsersPosts, challengeUrl, PLACEHOLDER_CONFIG);

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
            <UserPostsArea />
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
}
