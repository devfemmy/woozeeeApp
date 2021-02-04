import React, { useMemo, useContext, useCallback } from 'react';

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

import { LoadingContext, LocaleContext } from '~src/contexts';

import TopNavigationArea from '~src/components/TopNavigationArea';

import OverlayLoader from '~src/components/OverlayLoader';

import useToast from '~src/hooks/useToast';

import BackgroundVideo from '~src/components/BackgroundVideo';

/* DATA */
const woozeeeCards = [
  {
    balance: '150.25',
    banner: require('~assets/images/card-insure.jpg'),
  },
  {
    balance: '350,152.83',
    banner: require('~assets/images/card-wallet.jpg'),
  },
  {
    balance: '0',
    banner: require('~assets/images/card-rewards.jpg'),
  },
];

const woozeeeCategories = [
  {
    title: 'socials',
    banner: require('~assets/images/banner/woozeee-socials.jpg'),
    video:
      'https://firebasestorage.googleapis.com/v0/b/woozeee-d7f6c.appspot.com/o/app-assets%2Fsocial.mp4?alt=media&token=afc818c3-7857-4368-88b9-3d2d16baea09',
    screen: 'SocialsRoute',
  },
  {
    title: 'marketplace',
    banner: require('~assets/images/banner/woozeee-marketplace.jpg'),
    video:
      'https://firebasestorage.googleapis.com/v0/b/woozeee-d7f6c.appspot.com/o/app-assets%2Fmarket.mp4?alt=media&token=2709a1b4-8d3b-4d74-a364-63a276e94493',
    screen: 'SocialsRoute',
  },
  {
    title: 'charity',
    banner: require('~assets/images/banner/woozeee-charity.jpg'),
    video:
      'https://firebasestorage.googleapis.com/v0/b/woozeee-d7f6c.appspot.com/o/app-assets%2Fcharity.mp4?alt=media&token=c837385b-fef5-4df3-ad36-c36560fe0ee0',
    screen: 'SocialsRoute',
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
  // eslint-disable-next-line react/prop-types
  const { value, point } = props;
  // eslint-disable-next-line react/prop-types
  const [wholeNum, decimalNum] = value.split('.');

  return useMemo(
    () => (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-end',
          marginBottom: 5,
        }}
      >
        <Text category="p2">{decimalNum ? 'N' : null}</Text>
        <Text category="h6" style={{ marginHorizontal: 5 }}>
          {wholeNum}
        </Text>
        {/* prettier-ignore */}
        <Text category="p2">
          {decimalNum ? `.${decimalNum}` : `${point}(s)` }
        </Text>
      </View>
    ),
    [wholeNum, decimalNum, point],
  );
};

// eslint-disable-next-line react/prop-types
export default function Home({ navigation }) {
  useToast('Click again to exit');

  const { width, height } = useWindowDimensions();

  const IS_PORTRAIT = height > width;

  const CARD_HEIGHT = IS_PORTRAIT ? 170 : 140;

  const CATEGORY_HEIGHT = IS_PORTRAIT ? 250 : 220;

  const t = useContext(LocaleContext);

  const { isLoading } = useContext(LoadingContext);

  // eslint-disable-next-line react/prop-types
  const routeSocialRoute = useCallback((route) => navigation.navigate(route), [
    navigation,
  ]);

  const renderCard = useCallback(
    (data) => (
      <View
        style={{
          height: CARD_HEIGHT,
          width: IS_PORTRAIT ? width / 1.6 : width / 3,
          paddingHorizontal: 5,
          position: 'relative',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}
        key={data.item.key}
      >
        <Balance value={data.item.balance} point={t('point')} />
        <Image
          source={data.item.banner}
          style={{
            height: IS_PORTRAIT ? 140 : 110,
            width: '95%',
            borderRadius: 5,
          }}
          resizeMode="contain"
        />
      </View>
    ),
    [t, CARD_HEIGHT, IS_PORTRAIT, width],
  );

  const renderCategory = useCallback(
    (data) => (
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
        key={data.item.title}
        /* eslint-disable-next-line react/prop-types */
        onPress={() => routeSocialRoute(data.item.screen)}
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
    ),
    [t, IS_PORTRAIT, routeSocialRoute, width],
  );

  const RenderCategoryHeader = useMemo(
    () => (
      <View style={{ flex: 1, paddingTop: 10, Height: 180 }}>
        <List
          style={{ backgroundColor: 'transparent' }}
          alwaysBounceHorizontal
          alwaysBounceVertical
          horizontal={IS_PORTRAIT}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={woozeeeCards}
          renderItem={renderCard}
          getItemLayout={(data, index) => ({
            length: CARD_HEIGHT,
            offset: CARD_HEIGHT * index,
            index,
          })}
        />
      </View>
    ),
    [CARD_HEIGHT, IS_PORTRAIT, renderCard],
  );

  return useMemo(
    () => (
      <Layout level="6" style={{ flex: 1 }}>
        <OverlayLoader isLoading={isLoading} />
        <TopNavigationArea
          title="woozeee"
          navigation={navigation}
          screen="user"
        />

        <View style={{ flex: 1 }}>
          <List
            ListHeaderComponent={RenderCategoryHeader}
            style={{ backgroundColor: 'transparent' }}
            horizontal={!IS_PORTRAIT}
            alwaysBounceHorizontal
            alwaysBounceVertical
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={woozeeeCategories}
            renderItem={renderCategory}
            getItemLayout={(data, index) => ({
              length: CATEGORY_HEIGHT,
              offset: CATEGORY_HEIGHT * index,
              index,
            })}
          />
        </View>
      </Layout>
    ),
    [
      CATEGORY_HEIGHT,
      IS_PORTRAIT,
      isLoading,
      navigation,
      RenderCategoryHeader,
      renderCategory,
    ],
  );
}
