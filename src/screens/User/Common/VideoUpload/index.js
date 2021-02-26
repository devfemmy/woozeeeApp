import React from 'react';

import { View, ScrollView } from 'react-native';

import { Button, Layout, Text } from '@ui-kitten/components';

import TopNavigationArea from 'src/components/TopNavigationArea';

export default function VideoUpload({ navigation }) {
  return (
    <Layout level="6" style={{ flex: 1 }}>
      <TopNavigationArea
        title="woozeee"
        navigation={navigation}
        icon="logout"
        screen="social"
      />
      <ScrollView
        style={{ flex: 1, paddingVertical: 10 }}
        alwaysBounceVertical
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={{ paddingBottom: 20 }}>
          <View
            style={{ paddingTop: 10, paddingHorizontal: 15, marginBottom: 20 }}
          >
            <Text
              category="h4"
              appearance="hint"
              style={{ textAlign: 'center' }}
            >
              Choose video upload method
            </Text>
          </View>
          <View style={{ padding: 15 }}>
            <Button status="danger">
              <Text>Choose from library</Text>
            </Button>
          </View>
          <View style={{ padding: 15 }}>
            <Button status="primary">
              <Text>Record something fresh</Text>
            </Button>
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
}
