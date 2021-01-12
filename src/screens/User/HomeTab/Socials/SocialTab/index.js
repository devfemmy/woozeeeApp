import React, { useMemo, useContext } from 'react';

import { ScrollView } from 'react-native';

import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { BlurView } from 'expo-blur';

// prettier-ignore
import {
  Layout, Text, List,
} from '@ui-kitten/components';

import TopNavigationArea from '~src/components/TopNavigationArea';

/* DATA */
import socialVideos from './data';

// eslint-disable-next-line react/prop-types
export default function Home({ navigation }) {
  const { width, height } = useWindowDimensions();

  const renderCard = (data) => (
    <View
      style={{
        height: 170,
        width: width <= 600 ? width / 3.1 : width / 3,
        paddingHorizontal: 5,
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}
      key={data.item.key}
    >
      <Image
        source={data.item.banner}
        style={{
          height: height <= 600 ? 70 : 160,
          width: '95%',
          borderRadius: 5,
        }}
        resizeMode="contain"
      />
    </View>
  );

  return (
    <Layout level="4" style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <TopNavigationArea
          title="woozeee"
          navigation={navigation}
          icon="logout"
          page="search"
        />
        <ScrollView style={{ flex: 1, paddingTop: 10 }}>
          {socialVideos.map((item) => (
            <View
              style={{
                flex: 1,
                marginVertical: 5,
                paddingVertical: 5,
                maxHeight: 210,
              }}
              key={item.user}
            >
              <View style={{ paddingHorizontal: 10 }}>
                <Text category="h6" style={{ marginBottom: 5 }}>
                  {item.user}
                </Text>
                {/* prettier-ignore */}
                <Text category="c2">
                  {item.content.length}
                  {' '}
                  Video(s)
                </Text>
              </View>
              <List
                style={{ backgroundColor: 'transparent' }}
                alwaysBounceHorizontal
                horizontal
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                data={item.content}
                renderItem={renderCard}
              />
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    </Layout>
  );
}
