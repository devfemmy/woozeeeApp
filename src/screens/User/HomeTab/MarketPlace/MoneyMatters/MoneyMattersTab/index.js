import React, { useState, useContext } from 'react';

import { View, useWindowDimensions, StyleSheet } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  Layout,
  List,
  Image,
  Button,
  Text,
  Divider,
  TopNavigationAction,
} from '@ui-kitten/components';

import TopNavigationArea from 'src/components/TopNavigationArea';

import { LocaleContext, AppSettingsContext } from 'src/contexts';

import useDisableAndroidExit from 'src/hooks/useDisableAndroidExit';

import {
  IconCNotification,
  IconSearch,
  IconOptions,
  IconCVideo,
  IconCSearch,
  IconCPlus,
} from 'src/components/CustomIcons';

import BackButton from '../../../../../../components/TopNavigationArea/components/BackButton';

export default function MoneyMattersTab(props) {
  const { width, height } = useWindowDimensions();

  const IS_PORTRAIT = height > width;

  const CARD_HEIGHT = IS_PORTRAIT ? 160 : 120;

  // console.log(props);
  const { navigation } = props;
  useDisableAndroidExit();

  const { bottom, top } = useSafeAreaInsets();

  const SPACING = 57 + bottom + top;

  const VIEW_HEIGHT = height - SPACING;

  const ITEM_HEIGHT = VIEW_HEIGHT * 0.75;

  const t = useContext(LocaleContext);

  const { appState } = useContext(AppSettingsContext);

  const BG_THEME = appState.darkMode ? '#070A0F' : '#F7F9FC';
  /* DATA */
  const moneyMattersCards = [
    {
      id: 1,
      banner: require('assets/images/banner/woozeee-ad.jpg'),
    },
    {
      id: 2,
      banner: require('assets/images/banner/mega-sale.jpg'),
    },
    {
      id: 3,
      banner: require('assets/images/banner/valentine.jpg'),
    },
  ];

  const WoozeeeCardsAds = () => (
    <View
      style={{
        height: CARD_HEIGHT,
        width: IS_PORTRAIT ? width / 1.25 : width / 3,
        paddingHorizontal: 5,
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}
    >
      <Image
        source={require('assets/images/banner/valentine.jpg')}
        defaultSource={require('assets/images/banner/valentine.jpg')}
        style={{
          height: IS_PORTRAIT ? 150 : 110,
          width: '100%',
          borderRadius: 5,
        }}
        resizeMode="cover"
      />
    </View>
  );

  return (
    <>
      <Layout level="6" style={{ flex: 1 }}>
        <TopNavigationArea navigation={navigation} screen="notification" />
        {/* <List
          style={{ backgroundColor: 'transparent' }}
          contentContainerStyle={{ paddingHorizontal: 5 }}
          alwaysBounceHorizontal
          alwaysBounceVertical
          horizontal={IS_PORTRAIT}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={moneyMattersCards}
          keyExtractor={(_, i) => i.toString()}
          renderItem={WoozeeeCardsAds}
          getItemLayout={(data, index) => ({
            length: CARD_HEIGHT,
            offset: CARD_HEIGHT * index,
            index,
          })}
        /> */}
        {/* <View style={styles.headerContainer}></View> */}
      </Layout>
    </>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  headerContent: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
