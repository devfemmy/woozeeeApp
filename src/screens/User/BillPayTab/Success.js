import React, { useContext } from 'react';

import { View, ScrollView } from 'react-native';

// prettier-ignore
import {
  Layout, Button, Text,
} from '@ui-kitten/components';

import { LocaleContext } from 'src/contexts';

import TopNavigationArea from 'src/components/TopNavigationArea';

import {
  IconForward,
  IconDownload,
  IconShare,
} from 'src/components/CustomIcons';

export default function PictureUpload({ navigation }) {
  const t = useContext(LocaleContext);

  return (
    <Layout level="6" style={{ flex: 1 }}>
      <TopNavigationArea navigation={navigation} screen="default" />
      <ScrollView
        alwaysBounceVertical
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            flex: 1,
            paddingVertical: 20,
          }}
        >
          <View
            style={{
              paddingHorizontal: 20,
              paddingTop: 40,
              alignItems: 'center',
            }}
          >
            <Text category="h5">{t('transactionSuccess')}</Text>
          </View>
          <View style={{ paddingHorizontal: 20, paddingTop: 50 }}>
            <View style={{ paddingVertical: 10 }}>
              <Button status="danger" accessoryRight={IconForward}>
                <Text category="h6" status="control">
                  {t('continue')}
                </Text>
              </Button>
            </View>
            <View style={{ paddingVertical: 10 }}>
              <Button status="danger" accessoryRight={IconDownload}>
                <Text category="h6" status="control">
                  {t('downloadReceipt')}
                </Text>
              </Button>
            </View>
            <View style={{ paddingVertical: 10 }}>
              <Button status="danger" accessoryRight={IconShare}>
                <Text category="h6" status="control">
                  {t('shareReceipt')}
                </Text>
              </Button>
            </View>
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
}
