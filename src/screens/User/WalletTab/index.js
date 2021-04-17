import React, { useContext } from 'react';

import {
  View,
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';

// prettier-ignore
import {
  Layout, Text, List,
} from '@ui-kitten/components';

import { LocaleContext } from 'src/contexts';

import TopNavigationArea from 'src/components/TopNavigationArea';

import useDisableAndroidExit from 'src/hooks/useDisableAndroidExit';

import WithDefaultFetch from 'src/components/DataFetch';

import { DealsPosts } from 'src/components/MarketPosts';

import { marketDealsUrl } from 'src/api/dummy';

import marketPlaceItems from './data';

/* DATA */
const woozeeeCards = [
  {
    balance: '150.25',
    banner: require('assets/images/card/insure.jpg'),
    action: 'openCare',
  },
  {
    balance: '350,152.83',
    banner: require('assets/images/card/wallet.jpg'),
    action: 'openWallet',
  },
  {
    balance: '0.00',
    banner: require('assets/images/card/rewards.jpg'),
    action: 'openRewards',
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

  const CARD_HEIGHT = IS_PORTRAIT ? 160 : 120;

  const t = useContext(LocaleContext);

  const routeTo = (route) => navigation.replace(route);

  const MarketplaceItem = ({ data }) => (
    <TouchableOpacity
      activeOpacity={0.75}
      style={{
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 3,
        marginVertical: 10,
        width: '25%',
      }}
    >
      <Layout
        level="1"
        style={{
          borderRadius: 5,
          paddingVertical: 15,
          paddingHorizontal: 20,
          marginBottom: 10,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.05,
          shadowRadius: 3,
          elevation: 2,
        }}
      >
        <Image
          source={data.icon}
          defaultSource={data.icon}
          resizeMode="cover"
          style={{ height: 30, width: 30 }}
        />
      </Layout>
      <Text category="c2" style={{ textAlign: 'center' }}>
        {t(data.title)}
      </Text>
    </TouchableOpacity>
  );

  const WoozeeeCards = (data) => (
    <TouchableOpacity
      activeOpacity={0.75}
      style={{
        height: CARD_HEIGHT,
        width: IS_PORTRAIT ? width / 1.75 : width / 3,
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
          height: IS_PORTRAIT ? 140 : 120,
          width: '100%',
          borderRadius: 5,
        }}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );

  const renderHeaderArea = () => (
    <View style={{ flex: 1, paddingTop: 10, paddingBottom: 10 }}>
      <View style={{ flex: 1, Height: 180 }}>
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
          paddingVertical: 10,
          paddingHorizontal: 5,
        }}
      >
        {marketPlaceItems.map((data) => (
          <MarketplaceItem data={data} key={data.id} />
        ))}
      </View>
    </View>
  );

  return (
    <Layout level="6" style={{ flex: 1 }}>
      <TopNavigationArea
        title="woozeee"
        navigation={navigation}
        screen="marketPlace"
      />

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
