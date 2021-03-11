import React, { useContext } from 'react';

import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';

// prettier-ignore
import {
  Layout, Text, List,
} from '@ui-kitten/components';

import { LocaleContext } from 'src/contexts';

import TopNavigationArea from 'src/components/TopNavigationArea';

import useDisableAndroidExit from 'src/hooks/useDisableAndroidExit';

import BackgroundVideo from 'src/components/BackgroundVideo';

/* DATA */
const woozeeeCards = [
  {
    banner: require('assets/images/banner/mega-sale.jpg'),
  },
  {
    banner: require('assets/images/banner/valentine.jpg'),
  },
  {
    banner: require('assets/images/banner/woozeee-ad.jpg'),
  },
];

const marketPlaceItems = [
  {
    id: 1,
    title: 'moneyMatters',
    icon: require('assets/images/icon/atm-filled.png'),
  },
  {
    id: 2,
    title: 'moneyMatters',
    icon: require('assets/images/icon/atm-filled.png'),
  },
  {
    id: 3,
    title: 'moneyMatters',
    icon: require('assets/images/icon/atm-filled.png'),
  },
  {
    id: 4,
    title: 'moneyMatters',
    icon: require('assets/images/icon/atm-filled.png'),
  },
  {
    id: 5,
    title: 'moneyMatters',
    icon: require('assets/images/icon/atm-filled.png'),
  },
  {
    id: 6,
    title: 'moneyMatters',
    icon: require('assets/images/icon/atm-filled.png'),
  },
  {
    id: 7,
    title: 'moneyMatters',
    icon: require('assets/images/icon/atm-filled.png'),
  },
  {
    id: 8,
    title: 'moneyMatters',
    icon: require('assets/images/icon/atm-filled.png'),
  },
];

const woozeeeCategories = [
  {
    title: 'social',
    banner: require('assets/images/banner/woozeee-socials.jpg'),
    video:
      'https://firebasestorage.googleapis.com/v0/b/woozeee-d7f6c.appspot.com/o/app-assets%2Fsocial.mp4?alt=media&token=afc818c3-7857-4368-88b9-3d2d16baea09',
    screen: 'SocialRoute',
  },
  {
    title: 'marketplace',
    banner: require('assets/images/banner/woozeee-marketplace.jpg'),
    video:
      'https://firebasestorage.googleapis.com/v0/b/woozeee-d7f6c.appspot.com/o/app-assets%2Fmarket.mp4?alt=media&token=2709a1b4-8d3b-4d74-a364-63a276e94493',
    screen: 'MarketPlaceRoute',
  },
  {
    title: 'charity',
    banner: require('assets/images/banner/woozeee-charity.jpg'),
    video:
      'https://firebasestorage.googleapis.com/v0/b/woozeee-d7f6c.appspot.com/o/app-assets%2Fcharity.mp4?alt=media&token=c837385b-fef5-4df3-ad36-c36560fe0ee0',
    screen: 'SocialRoute',
  },
];

const styles = StyleSheet.create({
  cardContent: {
    height: '100%',
    width: '95%',
    maxWidth: 600,
    position: 'absolute',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function MarketPlace({ navigation }) {
  useDisableAndroidExit();

  const { width, height } = useWindowDimensions();

  const IS_PORTRAIT = height > width;

  const CARD_HEIGHT = IS_PORTRAIT ? 160 : 120;

  const CATEGORY_HEIGHT = IS_PORTRAIT ? 250 : 220;

  const t = useContext(LocaleContext);

  const routeTo = (route) => navigation.replace(route);

  const MarketplaceItem = ({ data }) => (
    <TouchableOpacity
      activeOpacity={0.75}
      style={{
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 5,
        width: '25%',
      }}
    >
      <Layout
        level="5"
        style={{
          paddingVertical: 10,
          paddingHorizontal: 15,
          marginBottom: 5,
        }}
      >
        <Image
          source={data.icon}
          defaultSource={data.icon}
          resizeMode="cover"
          style={{ height: 40, width: 40 }}
        />
      </Layout>
      <Text category="c2">{t(data.title)}</Text>
    </TouchableOpacity>
  );

  const WoozeeeCards = (data) => (
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
        source={data.item.banner}
        defaultSource={data.item.banner}
        style={{
          height: IS_PORTRAIT ? 140 : 100,
          width: '100%',
          borderRadius: 5,
        }}
        resizeMode="cover"
      />
    </View>
  );

  const renderWoozeeeCategory = (data) => (
    <TouchableOpacity
      activeOpacity={0.75}
      style={{
        height: IS_PORTRAIT ? 250 : 220,
        width: IS_PORTRAIT ? width : width / 2,
        marginVertical: 5,
        position: 'relative',
        alignItems: 'center',
        alignSelf: 'center',
      }}
      onPress={() => routeTo(data.item.screen)}
    >
      <View style={styles.cardContent}>
        <BackgroundVideo
          videoUri={data.item.video}
          thumbUri={data.item.banner}
          style={{ borderRadius: 5 }}
          isMuted
        />
      </View>

      <View
        style={[
          styles.cardContent,
          { backgroundColor: 'rgba(0, 0, 0, 0, 0.25' },
        ]}
      >
        <Text category="h4" style={{ color: 'white' }}>
          {` woozeee ${t(data.item.title)} `}
        </Text>
      </View>
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
          ListHeaderComponent={renderHeaderArea}
          style={{ backgroundColor: 'transparent' }}
          horizontal={!IS_PORTRAIT}
          alwaysBounceHorizontal
          alwaysBounceVertical
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={woozeeeCategories}
          keyExtractor={(_, i) => i.toString()}
          renderItem={renderWoozeeeCategory}
          getItemLayout={(data, index) => ({
            length: CATEGORY_HEIGHT,
            offset: CATEGORY_HEIGHT * index,
            index,
          })}
        />
      </View>
    </Layout>
  );
}
