import React from 'react';

import { View, ScrollView } from 'react-native';

import { Layout, Text } from '@ui-kitten/components';

import TopNavigationArea from 'src/components/TopNavigationArea';

// import WithDefaultFetch from 'src/components/DataFetch';

// import { UsersPosts } from 'src/components/VideoPosts';

// import { challengeUrl } from 'src/api/dummy';

// const PLACEHOLDER_CONFIG = {
//   count: 6,
//   numColumns: 2,
//   maxHeight: 180,
//   mediaLeft: true,
// };

// eslint-disable-next-line react/prop-types
export default function Search({ navigation }) {
  // prettier-ignore
  // const UserPostsArea = () => WithDefaultFetch(UsersPosts, challengeUrl, PLACEHOLDER_CONFIG);

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
          <View style={{ paddingTop: 10, paddingHorizontal: 15 }}>
            <Text category="h4" appearance="hint" style={{ textAlign: 'center' }}>Search available content</Text>
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
}
