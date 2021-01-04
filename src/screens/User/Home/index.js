import React from 'react';

import { View, ScrollView } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { Layout, Button, Text } from '@ui-kitten/components';

import TopNavigationArea from '~src/components/TopNavigationArea';

// eslint-disable-next-line react/prop-types
export default function Home({ navigation }) {
  return (
    <Layout level="2" style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <TopNavigationArea
          title="Account Verification"
          navigation={navigation}
          icon="false"
        />
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <View>
            <Text>Home</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Layout>
  );
}
