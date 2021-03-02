import React from 'react';

import { View, ScrollView } from 'react-native';

import RBSheet from 'react-native-raw-bottom-sheet';

import { Button, Layout, Text } from '@ui-kitten/components';

import TopNavigationArea from 'src/components/TopNavigationArea';

export default function VideoUpload({ navigation }) {
  const sheetRef = React.useRef(null);

  return (
    <>
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
              style={{
                paddingTop: 10,
                paddingHorizontal: 15,
                marginBottom: 20,
              }}
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
                <Text status="control" onPress={() => sheetRef.current.open()}>
                  Choose from library
                </Text>
              </Button>
            </View>
            <View style={{ padding: 15 }}>
              <Button status="primary">
                <Text status="control">Record something fresh</Text>
              </Button>
            </View>
          </View>
        </ScrollView>
        <RBSheet
          ref={sheetRef}
          height={300}
          closeOnDragDown
          customStyles={{
            container: {
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'blue',
            },
          }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: 'red',
            }}
          >
            <Text>Swipe down to close</Text>
          </View>
        </RBSheet>
      </Layout>
    </>
  );
}
