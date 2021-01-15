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
  Layout, Text, Button, List,
} from '@ui-kitten/components';

import Moment from 'react-moment';

import TopNavigationArea from '~src/components/TopNavigationArea';

import { IconForward } from '~src/components/CustomIcons';

/* DATA */
import socialVideos from './data';

const trendingData = [
  {
    banner: require('~assets/images/banner/back1.jpg'),
    userImg: require('~assets/images/user/user1.png'),
    tag: '#woozeeeChallenge',
    dateAdded: '2021-01-10',
  },
  {
    banner: require('~assets/images/banner/back2.jpg'),
    userImg: require('~assets/images/user/user2.png'),
    tag: '#woozeeeChallenge',
    dateAdded: '2021-01-11',
  },
  {
    banner: require('~assets/images/banner/back1.jpg'),
    userImg: require('~assets/images/user/user3.png'),
    tag: '#woozeeeChallenge',
    dateAdded: '2021-01-08',
  },
  {
    banner: require('~assets/images/banner/back3.jpg'),
    userImg: require('~assets/images/user/user1.png'),
    tag: '#woozeeeChallenge',
    dateAdded: '2021-01-10',
  },
  {
    banner: require('~assets/images/banner/back2.jpg'),
    userImg: require('~assets/images/user/user3.png'),
    tag: '#woozeeeChallenge',
    dateAdded: '2021-01-09',
  },
];

// eslint-disable-next-line react/prop-types
export default function Explore({ navigation }) {
  const { width, height } = useWindowDimensions();

  const isPortrait = height > width;

  const renderCard = (data) => (
    <TouchableOpacity
      style={{
        height: 170,
        width: isPortrait ? width / 2.5 : width / 3.5,
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
            borderWidth: 3,
            borderColor: 'white',
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
        <Text category="c1" style={{ color: 'white', marginBottom: 5 }}>
          {data.item.tag}
        </Text>
        <View style={{ marginBottom: 5 }}>
          <Moment
            fromNow
            element={(momentProps) => (
              // eslint-disable-next-line react/jsx-props-no-spreading
              <Text category="c1" {...momentProps} style={{ color: 'white' }} />
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
          screen="search"
        />
        <ScrollView
          style={{ flex: 1, paddingVertical: 10 }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <View style={{ marginBottom: 10, paddingVertical: 5 }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <View style={{ paddingHorizontal: 10 }}>
                <Text category="h6" style={{ marginBottom: 5 }}>
                  Trending Challenges
                </Text>
              </View>
            </View>
            <List
              style={{ backgroundColor: 'transparent' }}
              alwaysBounceHorizontal
              horizontal
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              data={trendingData}
              renderItem={renderCard}
            />
          </View>
          {socialVideos.map((item) => (
            <View
              style={{
                flex: 1,
                marginBottom: 10,
                paddingVertical: 5,
                height: 215,
              }}
              key={item.user}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <View style={{ paddingHorizontal: 10 }}>
                  <Text category="h6" style={{ marginBottom: 5 }}>
                    {item.user}
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
                    size="tiny"
                    accessoryRight={IconForward}
                  >
                    <Text status="primary" category="p2">
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
                renderItem={renderCard}
              />
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    </Layout>
  );
}
