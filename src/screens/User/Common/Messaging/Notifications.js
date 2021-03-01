import React from 'react';

import { View, Image } from 'react-native';

import Moment from 'react-moment';

import { LinearGradient } from 'expo-linear-gradient';

// prettier-ignore
import {
  Layout, List, Text, Divider,
} from '@ui-kitten/components';

const MESSAGES = [
  {
    img: require('assets/images/user/user2.png'),
    title: 'Hello world',
    details: 'Notification from below',
    date: '2020-05-10',
  },
  {
    img: require('assets/images/user/user1.png'),
    title: 'Hello world',
    details: 'Notification from below and above',
    date: '2020-05-10',
  },
  {
    img: require('assets/images/user/user3.png'),
    title: 'Hello world',
    details: 'Notification from below and above and left and right and ok',
    date: '2020-05-10',
  },
];

const renderItem = ({ index, item }) => (
  <>
    <Layout
      level="5"
      style={{
        marginVertical: 5,
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'flex-start',
          paddingHorizontal: 5,
          paddingVertical: 5,
        }}
      >
        <LinearGradient
          colors={['#043F7C', '#FF5757']}
          style={{
            height: 34,
            width: 34,
            borderRadius: 17,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Image
            source={item.img}
            style={{
              height: 30,
              width: 30,
              borderRadius: 15,
              borderColor: 'white',
            }}
          />
        </LinearGradient>
        <View style={{ flex: 1, marginHorizontal: 10 }}>
          <Text category="s2">{item.title}</Text>
          <Text category="p2">{item.details}</Text>
        </View>
        <View style={{ width: 60 }}>
          <Moment
            fromNow
            element={(momentProps) => (
              <Text category="c1" {...momentProps} style={{ fontSize: 10 }} />
            )}
          >
            {item.date}
          </Moment>
        </View>
      </View>
    </Layout>
    <Divider />
  </>
);

export default function Notifications(props) {
  return (
    <List
      style={{ backgroundColor: 'transparent', paddingVertical: 10 }}
      alwaysBounceVertical
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      data={MESSAGES}
      keyExtractor={(_, i) => i.toString()}
      renderItem={renderItem}
      getItemLayout={(data, index) => ({
        length: 150,
        offset: 150 * index,
        index,
      })}
    />
  );
}
