import React from 'react';

import { View } from 'react-native';

// prettier-ignore
import {
  Layout,
} from '@ui-kitten/components';

import TopNavigationArea from '~src/components/TopNavigationArea';

import WithVideoPosts from '~src/components/VideoPosts/WithVideoPosts';

import { AllPosts } from '~src/components/VideoPosts';

import { trendingUrl } from '~src/api/dummy';

const PLACEHOLDER_CONFIG = {
  count: 6,
  numColumns: 2,
  maxHeight: 180,
  mediaLeft: true,
};

// eslint-disable-next-line react/prop-types
export default function ViewAll({ navigation }) {
  // prettier-ignore
  const AllPostsArea = () => (
    WithVideoPosts(AllPosts, trendingUrl, PLACEHOLDER_CONFIG)
  );

  return (
    <Layout level="4" style={{ flex: 1 }}>
      <TopNavigationArea
        title="woozeee"
        navigation={navigation}
        icon="logout"
        screen="search"
      />
      <View style={{ paddingBottom: 20 }}>
        <AllPostsArea />
      </View>
    </Layout>
  );
}
