import React from 'react';

import { View, ScrollView } from 'react-native';

import { Layout } from '@ui-kitten/components';

import useDisableAndroidBackAction from 'src/hooks/useDisableAndroidBackAction';

import TopNavigationArea from 'src/components/TopNavigationArea';

import WithDefaultFetch from 'src/components/DataFetch';

import { UsersPosts } from 'src/components/VideoPosts';

import { challengeUrl } from 'src/api/dummy';

const PLACEHOLDER_CONFIG = {
  count: 6,
  numColumns: 2,
  maxHeight: 180,
  mediaLeft: true,
};

// prettier-ignore
const UserPostsArea = () => WithDefaultFetch(UsersPosts, challengeUrl, PLACEHOLDER_CONFIG);

export default function Versus({ navigation }) {
  useDisableAndroidBackAction(navigation, 'SocialRoute');

  return (
    <Layout level="6" style={{ flex: 1 }}>
      <TopNavigationArea
        title="woozeee"
        navigation={navigation}
        screen="toolbar"
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
