import React, { useMemo, useContext } from 'react';

import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { BlurView } from 'expo-blur';

// prettier-ignore
import {
  Layout, Text, List,
} from '@ui-kitten/components';

import { LoadingContext } from '~src/contexts';

import TopNavigationArea from '~src/components/TopNavigationArea';

import OverlayLoader from '~src/components/OverlayLoader';

import useToast from '~src/hooks/useToast';

import useMounted from '~src/hooks/useMounted';

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
    title: 'woozeee Socials',
    banner: require('~assets/images/banner/woozeee-socials.jpg'),
    video:
      'https://firebasestorage.googleapis.com/v0/b/woozeee-d7f6c.appspot.com/o/app-assets%2Fsocial.mp4?alt=media&token=afc818c3-7857-4368-88b9-3d2d16baea09',
    screen: 'SocialsRoute',
  },
  {
    title: 'woozeee Marketplace',
    banner: require('~assets/images/banner/woozeee-marketplace.jpg'),
    video:
      'https://firebasestorage.googleapis.com/v0/b/woozeee-d7f6c.appspot.com/o/app-assets%2Fmarket.mp4?alt=media&token=2709a1b4-8d3b-4d74-a364-63a276e94493',
    screen: 'SocialsRoute',
  },
  {
    title: 'woozeee Charity',
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
  const { value } = props;
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
          {decimalNum ? `.${decimalNum}` : 'point(s)' }
        </Text>
      </View>
    ),
    [wholeNum, decimalNum],
  );
};

// eslint-disable-next-line react/prop-types
export default function Home({ navigation }) {
  const { width, height } = useWindowDimensions();

  const isPortrait = height > width;

  const { isLoading } = useContext(LoadingContext);

  const isMounted = useMounted();

  // eslint-disable-next-line react/prop-types
  const routeSocialRoute = (route) => navigation.navigate(route);

  useToast('Click again to exit');

  const renderCard = (data) => (
    <View
      style={{
        height: isPortrait ? 170 : 140,
        width: isPortrait ? width / 1.6 : width / 3,
        paddingHorizontal: 5,
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}
      key={data.item.key}
    >
      <Balance value={data.item.balance} />
      <Image
        source={data.item.banner}
        style={{
          height: isPortrait ? 140 : 110,
          width: '95%',
          borderRadius: 5,
        }}
        resizeMode="contain"
      />
    </View>
  );

  const renderCategory = (data) => (
    <TouchableOpacity
      style={{
        height: isPortrait ? 250 : 220,
        width: isPortrait ? width : width / 2,
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
        {isMounted ? (
          <BackgroundVideo
            videoUri={data.item.video}
            thumbUri={data.item.banner}
            style={{ borderRadius: 5 }}
            isMuted
          />
        ) : null}
      </View>

      <BlurView intensity={25} tint="dark" style={styles.cardContent}>
        <Text category="h5" style={{ color: 'white' }}>
          {data.item.title}
        </Text>
      </BlurView>
    </TouchableOpacity>
  );

  const RenderCategoryHeader = () => (
    <View style={{ flex: 1, paddingTop: 10, Height: 180 }}>
      <List
        style={{ backgroundColor: 'transparent' }}
        alwaysBounceHorizontal
        alwaysBounceVertical
        horizontal={isPortrait}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={woozeeeCards}
        renderItem={renderCard}
      />
    </View>
  );

  return (
    <Layout level="4" style={{ flex: 1 }}>
      <OverlayLoader isLoading={isLoading} />
      <SafeAreaView style={{ flex: 1 }}>
        <TopNavigationArea
          title="woozeee"
          navigation={navigation}
          icon="logout"
          screen="user"
        />

        <View style={{ flex: 1, paddingVertical: 5 }}>
          <List
            ListHeaderComponent={RenderCategoryHeader}
            style={{ backgroundColor: 'transparent' }}
            horizontal={!isPortrait}
            alwaysBounceHorizontal
            alwaysBounceVertical
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={woozeeeCategories}
            renderItem={renderCategory}
          />
        </View>
      </SafeAreaView>
    </Layout>
  );
}
