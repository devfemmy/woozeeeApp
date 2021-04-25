import React, { useContext, useState } from 'react';

import {
  View,
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';

// prettier-ignore
import {
  Layout, Text, List, Button,
} from '@ui-kitten/components';

import TopNavigationArea from 'src/components/TopNavigationArea';

import { LocaleContext } from 'src/contexts';

import useDisableAndroidExit from 'src/hooks/useDisableAndroidExit';

import {
  IconCCard,
  IconCPlus,
  IconCArrowUp,
  IconCSnow,
  IconCMobileTopUp,
  IconCDataTopUp,
  IconCCableTv,
  IconCElectricity,
} from 'src/components/CustomIcons';

/* DATA */
const woozeeeCards = [
  {
    id: 1,
    banner: require('assets/images/card/mtn.png'),
  },
  {
    id: 2,
    banner: require('assets/images/card/airtel.png'),
  },
  {
    id: 3,
    banner: require('assets/images/card/glo.png'),
  },
  {
    id: 4,
    banner: require('assets/images/card/9mobile.png'),
  },
];

const WALLET_ITEMS = [
  {
    id: 1,
    icon: IconCMobileTopUp,
    content: 'Buy Airtime',
  },
  {
    id: 2,
    icon: IconCDataTopUp,
    content: 'Buy Mobile Data',
  },
  {
    id: 3,
    icon: IconCCableTv,
    content: 'Pay Cable Tv',
  },
  {
    id: 4,
    icon: IconCElectricity,
    content: 'Pay Electricity',
  },
];

export default function BillPay({ navigation }) {
  useDisableAndroidExit();

  const { width, height } = useWindowDimensions();

  const IS_PORTRAIT = height > width;

  const CARD_HEIGHT = IS_PORTRAIT ? 180 : 160;

  const t = useContext(LocaleContext);

  const BillPayItem = ({ data }) => (
    <TouchableOpacity
      activeOpacity={0.75}
      style={{
        padding: 5,
        width: '50%',
      }}
    >
      <Layout
        level="1"
        style={{
          paddingVertical: 20,
          paddingHorizontal: 5,
          alignItems: 'center',
          shadowColor: '#000',
          borderRadius: 5,
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.1,
          shadowRadius: 3,
          elevation: 2,
        }}
      >
        <View>
          <data.icon style={{ height: 40, width: 40 }} />
        </View>
        <Text status="primary" style={{ textAlign: 'center', marginTop: 20 }}>
          {data.content}
        </Text>
      </Layout>
    </TouchableOpacity>
  );

  const WoozeeeCards = (data) => (
    <TouchableOpacity
      activeOpacity={0.75}
      style={{
        width: width / 4.1,
        paddingHorizontal: 5,
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}
    >
      <Image
        source={data.item.banner}
        defaultSource={data.item.banner}
        style={{
          width: '100%',
          borderRadius: 10,
        }}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );

  const renderHeaderArea = () => (
    <View style={{ flex: 1, paddingTop: 10, paddingBottom: 10 }}>
      <View style={{ flex: 1 }}>
        <List
          style={{ backgroundColor: 'transparent' }}
          contentContainerStyle={{ paddingHorizontal: 5 }}
          alwaysBounceHorizontal
          alwaysBounceVertical
          horizontal={IS_PORTRAIT}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={woozeeeCards}
          keyExtractor={(_, i) => i.toString()}
          renderItem={WoozeeeCards}
          getItemLayout={(data, index) => ({
            length: CARD_HEIGHT,
            offset: CARD_HEIGHT * index,
            index,
          })}
        />
      </View>
      <View style={{ marginTop: 40, paddingHorizontal: 15 }}>
        <Text category="s1">What service would you like?</Text>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'flex-start',
          paddingVertical: 20,
          paddingHorizontal: 10,
        }}
      >
        {WALLET_ITEMS.map((data) => (
          <BillPayItem data={data} key={data.id} />
        ))}
      </View>
    </View>
  );

  return (
    <Layout level="6" style={{ flex: 1 }}>
      <TopNavigationArea title="" navigation={navigation} screen="default" />
      <View style={{ flex: 1 }}>
        <List
          style={{ backgroundColor: 'transparent' }}
          ListHeaderComponent={renderHeaderArea}
          horizontal={!IS_PORTRAIT}
          alwaysBounceHorizontal
          alwaysBounceVertical
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </Layout>
  );
}
