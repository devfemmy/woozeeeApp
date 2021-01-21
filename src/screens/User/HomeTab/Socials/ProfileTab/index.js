// prettier-ignore
import React, {
  useContext, useMemo, useState, useCallback,
} from 'react';

// prettier-ignore
import {
  View, Image, ScrollView, useWindowDimensions,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

// prettier-ignore
import {
  Layout, Text, Button, List,
} from '@ui-kitten/components';

import { Get } from 'react-axios';

import { LoadingContext, LocaleContext } from '~src/contexts';

import TopNavigationArea from '~src/components/TopNavigationArea';

import OverlayLoader from '~src/components/OverlayLoader';

import VideoCard from '~src/components/Socials/VideoCard';

import { IconHeart, IconBookmark, IconGrid } from '~src/components/CustomIcons';

import {
  CustomPlaceholder,
  FullPlaceholder,
} from '~src/components/CustomPlaceholder';

import { trendingUrl } from '~src/api/dummy';

// eslint-disable-next-line react/prop-types
export default function Profile({ navigation }) {
  const { width, height } = useWindowDimensions();

  const { isLoading: loading } = useContext(LoadingContext);

  const t = useContext(LocaleContext);

  const IS_PORTRAIT = height > width;

  const { plWidth, plHeight } = useMemo(
    () => ({
      plWidth: width / 2,
      plHeight: IS_PORTRAIT ? (height - 403) / 2 : (height - 200) / 3,
    }),
    [width, height, IS_PORTRAIT],
  );

  const [activeTab, setActiveTab] = useState(0);

  // eslint-disable-next-line react/prop-types
  const routeEditProfile = () => navigation.navigate('EditProfile');

  const TabsMenu = (props) => {
    // eslint-disable-next-line react/prop-types
    const { makeRequest } = props;

    const updateTab = useCallback(
      (index) => {
        setActiveTab(index);
        makeRequest({ params: { reload: true } });
      },
      [makeRequest],
    );

    return useMemo(
      () => (
        <Layout level="2" style={{ paddingHorizontal: 20, borderRadius: 5 }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Button
              appearance="ghost"
              status={activeTab === 0 ? 'primary' : 'basic'}
              size="large"
              accessibilityLabel="All"
              accessibilityLiveRegion="polite"
              accessoryLeft={IconGrid}
              onPress={() => updateTab(0)}
            />
            <Button
              appearance="ghost"
              status={activeTab === 1 ? 'primary' : 'basic'}
              size="large"
              accessibilityLabel="Saved"
              accessibilityLiveRegion="polite"
              accessoryLeft={IconBookmark}
              onPress={() => updateTab(1)}
            />
            <Button
              appearance="ghost"
              status={activeTab === 2 ? 'primary' : 'basic'}
              size="large"
              accessibilityLabel="Liked"
              accessibilityLiveRegion="polite"
              accessoryLeft={IconHeart}
              onPress={() => updateTab(2)}
            />
          </View>
        </Layout>
      ),
      [updateTab],
    );
  };

  return (
    <Layout level="4" style={{ flex: 1 }}>
      <OverlayLoader isLoading={loading} />
      <SafeAreaView style={{ flex: 1 }}>
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
                    Content writer with beautiful aesthetics, Face of woozeee
                    (It seems).
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

          <View
            style={{
              height: IS_PORTRAIT ? height - 403 : '100%',
              width: IS_PORTRAIT ? '100%' : '60%',
            }}
          >
            <Get url={trendingUrl}>
              {(error, response, isLoading, makeRequest) => {
                if (error) {
                  return (
                    <>
                      <TabsMenu makeRequest={makeRequest} />
                      <View
                        style={{
                          flex: 1,
                          padding: 10,
                          alignItems: 'center',
                          justifyContent: 'center',
                          height: IS_PORTRAIT ? height - 453 : height - 200,
                        }}
                      >
                        <Text style={{ marginBottom: 10 }}>
                          {t('networkError')}
                        </Text>
                        <Button
                          /* prettier-ignore */
                          onPress={() => makeRequest({ params: { reload: true } })}
                        >
                          <Text status="control">{t('retry')}</Text>
                        </Button>
                      </View>
                    </>
                  );
                }
                if (isLoading) {
                  return (
                    <View
                      style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        paddingVertical: 10,
                      }}
                    >
                      {[1, 2, 3, 4].map((val) => (
                        <CustomPlaceholder
                          width={plWidth}
                          height={plHeight}
                          key={val}
                        />
                      ))}
                    </View>
                  );
                }
                if (response !== null) {
                  if (response.data.length < 1) {
                    return (
                      <>
                        <TabsMenu makeRequest={makeRequest} />
                        <View
                          style={{
                            flex: 1,
                            padding: 10,
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: IS_PORTRAIT ? height - 453 : height - 200,
                          }}
                        >
                          <Text style={{ marginBottom: 10 }}>
                            {t('noVideos')}
                          </Text>
                          <Button
                            /* prettier-ignore */
                            onPress={() => makeRequest({ params: { refresh: true } })}
                          >
                            <Text status="control">{t('refresh')}</Text>
                          </Button>
                        </View>
                      </>
                    );
                  }
                  return (
                    <>
                      <TabsMenu makeRequest={makeRequest} />
                      <List
                        style={{
                          backgroundColor: 'transparent',
                        }}
                        contentContainerStyle={{
                          paddingTop: 5,
                          paddingBottom: 15,
                        }}
                        alwaysBounceVertical
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        numColumns={2}
                        data={response.data}
                        renderItem={(renderData) => (
                          <VideoCard data={renderData.item} extraWidth={0} />
                        )}
                        getItemLayout={(data, index) => ({
                          length: 170,
                          offset: 170 * index,
                          index,
                        })}
                      />
                    </>
                  );
                }
                return (
                  <>
                    <TabsMenu />
                    <View>
                      <FullPlaceholder
                        width={width - 10}
                        height={IS_PORTRAIT ? height - 453 : height - 200}
                      />
                    </View>
                  </>
                );
              }}
            </Get>
          </View>
        </View>
      </SafeAreaView>
    </Layout>
  );
}
