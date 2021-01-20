import React, { useMemo } from 'react';

import { View, ScrollView, useWindowDimensions } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

// prettier-ignore
import {
  Layout, Text, List, Button,
} from '@ui-kitten/components';

import { Get } from 'react-axios';

import TopNavigationArea from '~src/components/TopNavigationArea';

import VideoCard from '~src/components/Socials/VideoCard';

import {
  CustomPlaceholder,
  FullPlaceholder,
} from '~src/components/CustomPlaceholder';

import { exploreUrl, trendingUrl } from '~src/api/dummy';

// eslint-disable-next-line react/prop-types
export default function Explore({ navigation }) {
  const { width, height } = useWindowDimensions();

  const { plWidth, plHeight } = useMemo(
    () => ({ plWidth: width / 2, plHeight: (height - 150) / 3 }),
    [width, height],
  );

  // eslint-disable-next-line react/prop-types
  const routeViewAll = () => navigation.navigate('ViewAll');

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
            <Get url={trendingUrl}>
              {(error, response, isLoading, makeRequest) => {
                if (error) {
                  return (
                    <View
                      style={{
                        flex: 1,
                        padding: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Text style={{ marginBottom: 10 }}>
                        Failed to fetch Challenges, Please try again!
                      </Text>
                      <Button
                        /* prettier-ignore */
                        onPress={() => makeRequest({ params: { reload: true } })}
                      >
                        <Text status="control">Retry</Text>
                      </Button>
                    </View>
                  );
                }
                if (isLoading) {
                  return (
                    <View
                      style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        paddingVertical: 10,
                        paddingBottom: 10,
                      }}
                    >
                      {[1, 2].map((val) => (
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
                      <View
                        style={{
                          flex: 1,
                          padding: 10,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Text style={{ marginBottom: 10 }}>
                          No Challenges available!
                        </Text>
                        <Button
                          /* prettier-ignore */
                          onPress={() => makeRequest({ params: { refresh: true } })}
                        >
                          <Text status="control">Refresh</Text>
                        </Button>
                      </View>
                    );
                  }
                  return (
                    <View style={{ marginBottom: 20, paddingVertical: 5 }}>
                      <View style={{ paddingHorizontal: 10 }}>
                        <Text category="h6" style={{ marginBottom: 5 }}>
                          Trending Challenges
                        </Text>
                      </View>
                      <List
                        style={{ backgroundColor: 'transparent' }}
                        alwaysBounceHorizontal
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        data={response.data}
                        renderItem={(renderData) => (
                          <VideoCard data={renderData.item} extraWidth={0.5} />
                        )}
                        getItemLayout={(data, index) => ({
                          length: 170,
                          offset: 170 * index,
                          index,
                        })}
                      />
                    </View>
                  );
                }
                return (
                  <View style={{ paddingBottom: 10 }}>
                    <FullPlaceholder
                      width={width - 10}
                      height={(height - 150) / 3}
                    />
                  </View>
                );
              }}
            </Get>
            <Get url={exploreUrl}>
              {(error, response, isLoading, makeRequest) => {
                if (error) {
                  return (
                    <View
                      style={{
                        flex: 1,
                        padding: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: height - 150,
                      }}
                    >
                      <Text style={{ marginBottom: 10 }}>
                        Failed to fetch Challenges, Please try again!
                      </Text>
                      <Button
                        /* prettier-ignore */
                        onPress={() => makeRequest({ params: { reload: true } })}
                      >
                        <Text status="control">Retry</Text>
                      </Button>
                    </View>
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
                      <View
                        style={{
                          flex: 1,
                          padding: 10,
                          alignItems: 'center',
                          justifyContent: 'center',
                          height: height - 150,
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
                    );
                  }
                  return response.data.map((item) => (
                    <View
                      style={{
                        flex: 1,
                        marginBottom: 10,
                        paddingVertical: 5,
                        maxHeight: 215,
                      }}
                      key={item.category}
                    >
                      <View
                        style={{
                          paddingHorizontal: 10,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <View>
                          <Text category="h6" style={{ marginBottom: 5 }}>
                            {item.category}
                          </Text>
                          {/* prettier-ignore */}
                          <Text category="c1" style={{ marginBottom: 5 }}>
                            {item.content.length}
                            {' '}
                            Video(s)
                          </Text>
                        </View>
                        <View>
                          <Button
                            appearance="ghost"
                            size="small"
                            onPress={routeViewAll}
                          >
                            <Text status="primary" category="label">
                              View all
                            </Text>
                          </Button>
                        </View>
                      </View>
                      <List
                        style={{ backgroundColor: 'transparent' }}
                        alwaysBounceHorizontal
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        data={item.content}
                        renderItem={(renderData) => (
                          <VideoCard data={renderData.item} extraWidth={0.5} />
                        )}
                        getItemLayout={(data, index) => ({
                          length: 170,
                          offset: 170 * index,
                          index,
                        })}
                      />
                    </View>
                  ));
                }
                return (
                  <View>
                    <FullPlaceholder
                      width={width - 10}
                      height={(height - 150) / 2}
                    />
                  </View>
                );
              }}
            </Get>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Layout>
  );
}
