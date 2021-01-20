import React, { useMemo } from 'react';

import { View, useWindowDimensions } from 'react-native';

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

import { trendingUrl } from '~src/api/dummy';

// eslint-disable-next-line react/prop-types
export default function ViewAll({ navigation }) {
  const { width, height } = useWindowDimensions();

  const IS_PORTRAIT = height > width;

  const { plWidth, plHeight } = useMemo(
    () => ({ plWidth: width / 2, plHeight: (height - 150) / 3 }),
    [width, height],
  );

  const ListHeader = () => (
    <View style={{ padding: 10 }}>
      <Text category="h5">Summer Videos</Text>
    </View>
  );

  return (
    <Layout level="4" style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <TopNavigationArea
          title="woozeee"
          navigation={navigation}
          icon="logout"
          screen="search"
        />
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
                      height: height - 150,
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
                    {[1, 2, 3, 4, 5, 6].map((val) => (
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
                return (
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
                    ListHeaderComponent={ListHeader}
                    numColumns={IS_PORTRAIT ? 2 : 3}
                    key={IS_PORTRAIT ? 2 : 3}
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
                );
              }
              return (
                <View>
                  <FullPlaceholder width={width - 10} height={height - 150} />
                </View>
              );
            }}
          </Get>
        </View>
      </SafeAreaView>
    </Layout>
  );
}
