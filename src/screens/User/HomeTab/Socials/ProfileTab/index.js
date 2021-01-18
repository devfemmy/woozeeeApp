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
  Layout, Text, Button,
} from '@ui-kitten/components';

import { Get } from 'react-axios';

import { LoadingContext } from '~src/contexts';

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

  const { plWidth, plHeight } = useMemo(
    () => ({ plWidth: width / 2, plHeight: (height - 150) / 3 }),
    [width, height],
  );

  const [activeTab, setActiveTab] = useState(0);

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
        <Layout level="2" style={{ paddingHorizontal: 20 }}>
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
              accessibilityLabel="All"
              accessibilityLiveRegion="polite"
              accessoryLeft={IconBookmark}
              onPress={() => updateTab(1)}
            />
            <Button
              appearance="ghost"
              status={activeTab === 2 ? 'primary' : 'basic'}
              size="large"
              accessibilityLabel="All"
              accessibilityLiveRegion="polite"
              accessoryLeft={IconHeart}
              onPress={() => updateTab(2)}
            />
          </View>
        </Layout>
      ),
      [activeTab, updateTab],
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
        <ScrollView
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <View>
            <View
              style={{
                alignItems: 'center',
                paddingHorizontal: 20,
                marginBottom: 10,
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
                <Button status="primary" size="small">
                  <Text status="control" category="p2">
                    Edit Profile
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
                    Videos
                  </Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                  <Text category="h6">12.3K</Text>
                  <Text category="p2" appearance="hint">
                    Followers
                  </Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                  <Text category="h6">1.9k</Text>
                  <Text category="p2" appearance="hint">
                    Following
                  </Text>
                </View>
              </View>
            </View>
            <View>
              <View>
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
                              height: height / 3,
                            }}
                          >
                            <Text style={{ marginBottom: 10 }}>
                              Failed to fetch Videos, Please try again!
                            </Text>
                            <Button
                              /* prettier-ignore */
                              onPress={() => makeRequest({ params: { reload: true } })}
                            >
                              <Text status="control">Retry</Text>
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
                                height: height / 3,
                              }}
                            >
                              <Text style={{ marginBottom: 10 }}>
                                No Videos available!
                              </Text>
                              <Button
                                /* prettier-ignore */
                                onPress={() => makeRequest({ params: { refresh: true } })}
                              >
                                <Text status="control">Refresh</Text>
                              </Button>
                            </View>
                          </>
                        );
                      }
                      return (
                        <>
                          <TabsMenu makeRequest={makeRequest} />
                          <View
                            style={{
                              marginBottom: 20,
                              paddingVertical: 5,
                              flexDirection: 'row',
                              flexWrap: 'wrap',
                            }}
                          >
                            {response.data.map((item, index) => (
                              <VideoCard
                                data={item}
                                extraWidth={0}
                                key={index}
                              />
                            ))}
                          </View>
                        </>
                      );
                    }
                    return (
                      <>
                        <TabsMenu />
                        <View>
                          <FullPlaceholder
                            width={width - 10}
                            height={height / 3}
                          />
                        </View>
                      </>
                    );
                  }}
                </Get>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Layout>
  );
}
