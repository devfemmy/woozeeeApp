import React from 'react';

import { View } from 'react-native';

import Swiper from 'react-native-swiper';

import { Layout, Text } from '@ui-kitten/components';

export default function Onboarding({ navigation }) {
  return (
    <Layout level="6" style={{ flex: 1 }}>
      <Swiper loop={false}>
        <View style={{ flex: 1 }}>
          <Text>Hello world 1</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text>Hello world 2</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text>Hello world 3</Text>
        </View>
      </Swiper>
    </Layout>
  );
}
