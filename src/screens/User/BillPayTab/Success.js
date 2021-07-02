import React, { useContext } from 'react';

import { View, ScrollView, Image, StyleSheet } from 'react-native';

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
import { ProfilePosts } from 'src/components/SocialPosts/index';

export default function PictureUpload({ navigation, route }) {
  const {success} = route.params
  const t = useContext(LocaleContext);
  const styles = StyleSheet.create({
    successText: {
      opacity: 0.7,
      textAlign: 'center',
      marginVertical: 10
    }
  })
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
            <Image 
            style= {{width: 120, height: 120, resizeMode: 'contain'}}
            source= {require('../../../assets/images/askADoc/success.png')} />
            <Text category="h5">{t('transactionSuccess')}</Text>
            <Text style= {styles.successText}  category= "c1">{success}</Text>
          </View>
          <View style={{ paddingHorizontal: 20, paddingTop: 50 }}>
            <View style={{ paddingVertical: 10 }}>
              <Button onPress= {() => navigation.popToTop()} status="danger" accessoryRight={IconForward}>
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
