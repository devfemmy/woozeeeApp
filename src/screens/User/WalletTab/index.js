import React, { useContext } from 'react';

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

import { LocaleContext } from 'src/contexts';

import useDisableAndroidExit from 'src/hooks/useDisableAndroidExit';

import WithDefaultFetch from 'src/components/DataFetch';

import { DealsPosts } from 'src/components/MarketPosts';

import {
  IconCCard,
  IconCPlus,
  IconCArrowUp,
  IconCSnow,
  IconCEye,
} from 'src/components/CustomIcons';

import { marketDealsUrl } from 'src/api/dummy';

/* DATA */
const woozeeeCards = [
  {
    id: 1,
    banner: require('assets/images/card/insure.jpg'),
    action: 'openCare',
  },
  {
    id: 2,
    banner: require('assets/images/card/wallet.jpg'),
    action: 'openWallet',
  },
  {
    id: 3,
    banner: require('assets/images/card/rewards.jpg'),
    action: 'openRewards',
  },
];

const WALLET_ITEMS = [
  {
    id: 1,
    icon: IconCCard,
    content: 'Accounts',
  },
  {
    id: 2,
    icon: IconCPlus,
    content: 'Add Money',
  },
  {
    id: 3,
    icon: IconCArrowUp,
    content: 'Transfer Money',
  },
  {
    id: 4,
    icon: IconCSnow,
    content: 'Freeze',
  },
  {
    id: 5,
    icon: IconCEye,
    content: 'Hide Balance',
  },
];

const PLACEHOLDER_CONFIG = {
  count: 4,
  numColumns: 2,
  maxHeight: 180,
  mediaLeft: true,
};

// prettier-ignore
const DealsPostsArea = () => WithDefaultFetch(DealsPosts, marketDealsUrl, PLACEHOLDER_CONFIG);

export default function WalletTab({ navigation }) {
  useDisableAndroidExit();

  const { width, height } = useWindowDimensions();

  const IS_PORTRAIT = height > width;

  const CARD_HEIGHT = IS_PORTRAIT ? 180 : 160;

  const t = useContext(LocaleContext);

  const routeTo = (route) => navigation.replace(route);

  const WalletItem = ({ data }) => (
    <View style={{ padding: 10, width: '20%', alignItems: 'center' }}>
      <Button
        accessoryLeft={data.icon}
        style={{ borderRadius: 15, height: 60, width: 60 }}
      />
      <Text
        status="primary"
        category="c2"
        style={{ fontSize: 11, textAlign: 'center', marginTop: 5 }}
      >
        {data.content}
      </Text>
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
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'flex-start',
          paddingVertical: 20,
          paddingHorizontal: 5,
        }}
      >
        {WALLET_ITEMS.map((data) => (
          <WalletItem data={data} key={data.id} />
        ))}
      </View>
    </View>
  );

  return (
    <Layout level="6" style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 15,
          paddingVertical: 10,
        }}
      >
        <View>
          <Text category="c1">Balance</Text>
          <Text category="h5" status="primary">
            N 249,238,134.34
          </Text>
        </View>
        <View>
          <Image
            source={require('assets/images/user/user2.png')}
            style={{
              height: 60,
              width: 60,
              borderRadius: 30,
              borderWidth: 3,
              borderColor: 'white',
            }}
          />
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <List
          style={{ backgroundColor: 'transparent' }}
          ListHeaderComponent={renderHeaderArea}
          ListFooterComponent={DealsPostsArea}
          ListFooterComponentStyle={{ paddingBottom: 10 }}
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
