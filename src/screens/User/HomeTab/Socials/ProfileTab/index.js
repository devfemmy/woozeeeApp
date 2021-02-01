import React, { useContext } from 'react';

// prettier-ignore
import {
  View, Image, ScrollView, useWindowDimensions,
} from 'react-native';

// prettier-ignore
import {
  Layout, Text, Button,
} from '@ui-kitten/components';

import { LoadingContext, LocaleContext } from '~src/contexts';

import TopNavigationArea from '~src/components/TopNavigationArea';

import OverlayLoader from '~src/components/OverlayLoader';

import WithPaginatedVideoPosts from '~src/components/VideoPosts/WithPaginatedVideoPosts';

import { ProfilePosts } from '~src/components/VideoPosts';

import { IconGrid, IconBookmark, IconHeart } from '~src/components/CustomIcons';

import { trendingUrl } from '~src/api/dummy';

const TABS = [
  { title: 'default', icon: IconGrid },
  { title: 'saved', icon: IconBookmark },
  { title: 'liked', icon: IconHeart },
];

const PLACEHOLDER_CONFIG = {
  count: 4,
  numColumns: 2,
  maxHeight: 150,
  mediaLeft: true,
};

// eslint-disable-next-line react/prop-types
export default function Profile({ navigation }) {
  const { width, height } = useWindowDimensions();

  const { isLoading } = useContext(LoadingContext);

  const t = useContext(LocaleContext);

  const IS_PORTRAIT = height > width;

  // prettier-ignore
  const ProfilePostsArea = () => (
    WithPaginatedVideoPosts(ProfilePosts, trendingUrl, PLACEHOLDER_CONFIG, TABS)
  );

  // eslint-disable-next-line react/prop-types
  const routeEditProfile = () => navigation.navigate('EditProfile');

  return (
    <Layout level="4" style={{ flex: 1 }}>
      <OverlayLoader isLoading={isLoading} />
      <TopNavigationArea
        title="woozeee"
        navigation={navigation}
        icon="logout"
        screen="profile"
      />
      <View
        style={{
          flex: 1,
          flexDirection: IS_PORTRAIT ? 'column' : 'row',
          width: '100%',
        }}
      >
        <View
          style={{
            height: IS_PORTRAIT ? 290 : '100%',
            width: IS_PORTRAIT ? '100%' : '40%',
          }}
        >
          <ScrollView
            style={{ flex: 1 }}
            alwaysBounceVertical
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            <View
              style={{
                alignItems: 'center',
                paddingHorizontal: 20,
                paddingBottom: 10,
              }}
            >
              <View style={{ marginBottom: 5, position: 'relative' }}>
                <Image
                  source={require('~assets/images/user/user2.png')}
                  style={{
                    height: 100,
                    width: 100,
                    borderRadius: 100,
                    borderWidth: 3,
                    borderColor: 'white',
                  }}
                />
                <Image
                  source={require('~assets/images/icon/verified.png')}
                  style={{
                    height: 20,
                    width: 20,
                    borderRadius: 100,
                    position: 'absolute',
                    right: 7,
                    bottom: 7,
                  }}
                />
              </View>
              <View style={{ marginBottom: 10, alignItems: 'center' }}>
                <Text category="h5">Bukola Daniel</Text>
                <Text category="p2" appearance="hint">
                  @Bukka101Official
                </Text>
              </View>
              <View
                style={{
                  maxWidth: 300,
                  marginBottom: 10,
                }}
              >
                <Text
                  category="c2"
                  style={{
                    textAlign: 'center',
                    lineHeight: 15,
                  }}
                >
                  Content writer with beautiful aesthetics, Face of woozeee (It
                  seems).
                </Text>
              </View>
              <View style={{ marginBottom: 10 }}>
                <Button
                  status="primary"
                  size="small"
                  onPress={routeEditProfile}
                >
                  <Text status="control" category="p2">
                    {`${t('edit')} ${t('profile')}`}
                  </Text>
                </Button>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                <View style={{ alignItems: 'center' }}>
                  <Text category="h6">1.2m</Text>
                  <Text category="p2" appearance="hint">
                    {`${t('video')}s`}
                  </Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                  <Text category="h6">12.3K</Text>
                  <Text category="p2" appearance="hint">
                    {t('followers')}
                  </Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                  <Text category="h6">1.9k</Text>
                  <Text category="p2" appearance="hint">
                    {t('following')}
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
        <View style={{ flex: 1 }}>
          <ProfilePostsArea />
        </View>
      </View>
    </Layout>
  );
}
