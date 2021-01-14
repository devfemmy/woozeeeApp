import React from 'react';

import {
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { BlurView } from 'expo-blur';

// prettier-ignore
import {
  Layout, Text, List,
} from '@ui-kitten/components';

import Moment from 'react-moment';

import TopNavigationArea from '~src/components/TopNavigationArea';

/* DATA */
import socialVideos from './data';

// eslint-disable-next-line react/prop-types
export default function Social({ navigation }) {
  const { width } = useWindowDimensions();

  const renderCard = (data) => (
    <TouchableOpacity
      style={{
        height: 170,
        width: width <= 600 ? width / 2.5 : width / 3,
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
          height: 160,
          width: '100%',
          borderRadius: 5,
        }}
        resizeMode="cover"
      />
      <Layout
        level="3"
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          height: 43,
          width: 43,
          left: 10,
          top: 5,
          borderRadius: 100,
        }}
      >
        <Image
          source={data.item.userImg}
          style={{
            height: 40,
            width: 40,
            borderRadius: 100,
          }}
        />
      </Layout>
      <BlurView
        intensity={75}
        tint="dark"
        style={{
          position: 'absolute',
          bottom: 10,
          borderBottomLeftRadius: 5,
          borderBottomRightRadius: 5,
          paddingHorizontal: 5,
          width: '100%',
        }}
      >
        <Text category="c2" style={{ color: 'white', marginBottom: 5 }}>
          {data.item.tag}
        </Text>
        <View style={{ marginBottom: 5 }}>
          <Moment
            fromNow
            element={(momentProps) => (
              // eslint-disable-next-line react/jsx-props-no-spreading
              <Text category="c2" {...momentProps} style={{ color: 'white' }} />
            )}
          >
            {data.item.dateAdded}
          </Moment>
        </View>
      </BlurView>
    </TouchableOpacity>
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
        <ScrollView
          style={{ flex: 1, paddingVertical: 10 }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          {socialVideos.map((item) => (
            <View
              style={{
                flex: 1,
                marginBottom: 10,
                paddingVertical: 5,
                maxHeight: 215,
              }}
              key={item.user}
            >
              <View style={{ paddingHorizontal: 10 }}>
                <Text category="h6" style={{ marginBottom: 5 }}>
                  {item.user}
                </Text>
                {/* prettier-ignore */}
                <Text category="c2" style={{ marginBottom: 5 }}>
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
