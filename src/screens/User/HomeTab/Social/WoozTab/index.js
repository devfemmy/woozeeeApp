import React from 'react';

import { View, TouchableOpacity } from 'react-native';

import { Layout } from '@ui-kitten/components';

import useModifiedAndroidBackAction from 'src/hooks/useModifiedAndroidBackAction';

import WithInfiniteFetch from 'src/components/DataFetch/WithInfiniteFetch';

import { WoozPosts } from 'src/components/VideoPosts';

import { socialUrl } from 'src/api/dummy';

import { IconCMovie } from 'src/components/CustomIcons';

const PLACEHOLDER_CONFIG = {
  count: 1,
  numColumns: 1,
  maxHeight: 0.75,
  mediaLeft: false,
};

// prettier-ignore
const WoozPostsArea = () => WithInfiniteFetch(WoozPosts, socialUrl, PLACEHOLDER_CONFIG);

export default function Wooz({ navigation }) {
  useModifiedAndroidBackAction(navigation, 'SocialRoute');

  const routeMovies = () => navigation.navigate('Movies');

  return (
    <Layout level="6" style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          backgroundColor: '#04070C',
        }}
      >
        <View
          style={{
            paddingHorizontal: 15,
            paddingVertical: 25,
            zIndex: 19,
            position: 'absolute',
            top: 0,
            right: 0,
          }}
        >
          <TouchableOpacity activeOpacity={0.75} onPress={routeMovies}>
            <IconCMovie style={{ height: 28, width: 28 }} />
          </TouchableOpacity>
        </View>
        <WoozPostsArea />
      </View>
    </Layout>
  );
}
