import React from 'react';

import { View, ScrollView } from 'react-native';

import RBSheet from 'react-native-raw-bottom-sheet';

// prettier-ignore
import {
  Button, Layout, Text, Divider,
} from '@ui-kitten/components';

import TopNavigationArea from 'src/components/TopNavigationArea';

import {
  IconVideoOutline,
  IconCloudUploadOutline,
} from 'src/components/CustomIcons';

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
          height={170}
          closeOnDragDown
          animationType="fade"
          customStyles={{
            container: {
              justifyContent: 'center',
              alignItems: 'center',
            },
          }}
        >
          <View
            style={{
              flex: 1,
              width: '100%',
              alignItems: 'flex-start',
              justifyContent: 'flex-end',
              paddingBottom: 10,
            }}
          >
            <Button
              appearance="ghost"
              accessoryLeft={(evaProps) => (
                <IconVideoOutline {...evaProps} height={36} width={36} />
              )}
              style={{
                width: '100%',
                justifyContent: 'flex-start',
              }}
            >
              <Text style={{ fontSize: 18 }} status="primary">
                Record with camera
              </Text>
            </Button>
            <Divider style={{ marginVertical: 2, width: '100%' }} />
            <Button
              appearance="ghost"
              accessoryLeft={(evaProps) => (
                <IconCloudUploadOutline {...evaProps} height={36} width={36} />
              )}
              style={{
                width: '100%',
                justifyContent: 'flex-start',
              }}
            >
              <Text style={{ fontSize: 18 }} status="primary">
                Upload from device
              </Text>
            </Button>
          </View>
        </RBSheet>
      </Layout>
    </>
  );
}
