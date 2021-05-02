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
    banner: require('assets/images/banner/glo-ad.jpg'),
  },
  {
    id: 2,
    banner: require('assets/images/banner/mtn-ad.png'),
  },
  {
    id: 3,
    banner: require('assets/images/banner/airtel-ad.png'),
  },
];

const BILL_ITEMS = [
  {
    id: 1,
    icon: IconCMobileTopUp,
    content: 'buyAirtime',
    action: 'routeAirtime',
  },
  {
    id: 2,
    icon: IconCDataTopUp,
    content: 'buyData',
    action: 'routeData',
  },
  {
    id: 3,
    icon: IconCCableTv,
    content: 'payCable',
    action: 'routeTv',
  },
  {
    id: 4,
    icon: IconCElectricity,
    content: 'payElectricity',
    action: 'routeElectricity',
  },
];

const BILLS_HISTORY = [
  {
    id: 1,
    themeColor: '#FF5757',
    amount: '10000.00',
    description: 'Airtime-09093199685-9Mobile',
    date: '20/04/2021',
    time: '12:44 PM',
  },
  {
    id: 2,
    themeColor: '#FF5757',
    amount: '10000.00',
    description: 'Airtime-09093199685-9Mobile',
    date: '20/04/2021',
    time: '12:44 PM',
  },
  {
    id: 3,
    themeColor: '#FF5757',
    amount: '10000.00',
    description: 'Airtime-09093199685-9Mobile',
    date: '20/04/2021',
    time: '12:44 PM',
  },
];

export default function BillPay({ navigation }) {
  useDisableAndroidExit();

  const { width, height } = useWindowDimensions();

  const IS_PORTRAIT = height > width;

  const CARD_HEIGHT = IS_PORTRAIT ? 180 : 160;

  const t = useContext(LocaleContext);

  // const routePayment = () => navigation.navigate('BillPayment');

  const BILL_ACTIONS = {
    routeAirtime: () => navigation.navigate('BillAirtime'),
    routeData: () => navigation.navigate('BillMobileData'),
    routeTv: () => navigation.navigate('BillCableTv'),
    routeElectricity: () => navigation.navigate('BillElectricity'),
  };

  const BillPayItem = ({ data }) => (
    <TouchableOpacity
      activeOpacity={0.75}
      style={{
        padding: 5,
        width: '50%',
      }}
      onPress={BILL_ACTIONS[data.action]}
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
          {t(data.content)}
        </Text>
      </Layout>
    </TouchableOpacity>
  );

  const HistoryItem = ({ data }) => (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 5,
        borderWidth: 1,
        borderColor: '#E9E9E9',
        borderRadius: 5,
        padding: 10,
        borderLeftWidth: 6,
        borderLeftColor: '#EB5757',
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View>
          <Text category="h6" style={{ marginBottom: 5, maxWidth: 200 }}>
            {`₦ ${data.amount}`}
          </Text>
          <Text category="c1">{data.description}</Text>
        </View>
      </View>
      <View style={{ alignItems: 'flex-end' }}>
        <Text category="s2" style={{ marginBottom: 5 }}>
          {data.date}
        </Text>
        <Text category="c1">{data.time}</Text>
      </View>
    </View>
  );

  const WoozeeeCards = (data) => (
    <TouchableOpacity
      activeOpacity={0.75}
      style={{
        width: IS_PORTRAIT ? width / 1.25 : width / 3,
        paddingHorizontal: 5,
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}
    >
      <Image
        source={data.item.banner}
        defaultSource={data.item.banner}
        style={{
          height: IS_PORTRAIT ? 200 : 180,
          width: '100%',
          borderRadius: 10,
        }}
        resizeMode="cover"
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
        <Text category="s1">{t('serviceChoice')}</Text>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'flex-start',
          paddingVertical: 10,
          paddingHorizontal: 10,
        }}
      >
        {BILL_ITEMS.map((data) => (
          <BillPayItem data={data} key={data.id} />
        ))}
      </View>
      <View style={{ marginTop: 15, paddingHorizontal: 15 }}>
        <Text category="s1">{t('frequentTrans')}</Text>
      </View>
      <View style={{ marginVertical: 5, paddingHorizontal: 15 }}>
        {BILLS_HISTORY.map((data) => (
          <HistoryItem data={data} key={data.id} />
        ))}
      </View>
    </View>
  );

  return (
    <Layout level="6" style={{ flex: 1 }}>
      <TopNavigationArea
        title="woozeee"
        navigation={navigation}
        screen="billPay"
      />
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
