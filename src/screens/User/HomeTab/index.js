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

import { LoadingContext, LocaleContext } from 'src/contexts';

import TopNavigationArea from 'src/components/TopNavigationArea';

import OverlayLoader from 'src/components/OverlayLoader';

import useDisableAndroidExit from 'src/hooks/useDisableAndroidExit';

import BackgroundVideo from 'src/components/BackgroundVideo';

/* DATA */
const woozeeeCards = [
  {
    balance: '150.25',
    banner: require('assets/images/card-insure.jpg'),
  },
  {
    balance: '350,152.83',
    banner: require('assets/images/card-wallet.jpg'),
  },
  {
    balance: '0.00',
    banner: require('assets/images/card-rewards.jpg'),
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

const Balance = (props) => {
  const { value, point } = props;
  const [wholeNum, decimalNum] = value.split('.');

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginBottom: 5,
      }}
    >
      <Text category="p2">{decimalNum ? 'N' : null}</Text>
      <Text category="h5" style={{ marginHorizontal: 5 }}>
        {wholeNum}
      </Text>
      <Text category="p2">{decimalNum ? `.${decimalNum}` : `${point}(s)`}</Text>
    </View>
  );
};

export default function Home({ navigation }) {
  useDisableAndroidExit();

  const { width, height } = useWindowDimensions();

  const IS_PORTRAIT = height > width;

  const CARD_HEIGHT = IS_PORTRAIT ? 170 : 140;

  const CATEGORY_HEIGHT = IS_PORTRAIT ? 250 : 220;

  const t = useContext(LocaleContext);

  const { isLoading } = useContext(LoadingContext);

  const routeTo = (route) => navigation.replace(route);

  const WoozeeeCards = (data) => (
    <View
      style={{
        height: CARD_HEIGHT,
        width: IS_PORTRAIT ? width / 1.75 : width / 3,
        paddingHorizontal: 5,
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}
    >
      <Balance value={data.item.balance} point={t('point')} />
      <Image
        source={data.item.banner}
        defaultSource={data.item.banner}
        style={{
          height: IS_PORTRAIT ? 125 : 95,
          width: '95%',
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

  const renderWoozeeeCards = () => (
    <View style={{ flex: 1, paddingTop: 15, Height: 180 }}>
      <List
        style={{ backgroundColor: 'transparent' }}
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
  );

  return (
    <Layout level="6" style={{ flex: 1 }}>
      <OverlayLoader isLoading={isLoading} />
      <TopNavigationArea
        title="woozeee"
        navigation={navigation}
        screen="user"
      />

      <View style={{ flex: 1 }}>
        <List
          ListHeaderComponent={renderWoozeeeCards}
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
