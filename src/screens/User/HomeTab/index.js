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
    balance: '0.00',
    banner: require('~assets/images/card-rewards.jpg'),
  },
];

const woozeeeCategories = [
  {
    title: 'woozeee Socials',
    banner: require('~assets/images/banner/woozeee-socials.jpg'),
    page: 'SocialsRoute',
  },
  {
    title: 'woozeee Marketplace',
    banner: require('~assets/images/banner/woozeee-marketplace.jpg'),
    page: 'SocialsRoute',
  },
  {
    title: 'woozeee Charity',
    banner: require('~assets/images/banner/woozeee-charity.jpg'),
    page: 'SocialsRoute',
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
        <Text category="p2">N</Text>
        <Text category="h6" style={{ marginHorizontal: 5 }}>
          {wholeNum}
        </Text>
        {/* prettier-ignore */}
        <Text category="p2">
          .
          {decimalNum}
        </Text>
      </View>
    ),
    [wholeNum, decimalNum],
  );
};

// eslint-disable-next-line react/prop-types
export default function Home({ navigation }) {
  const { width, height } = useWindowDimensions();

  const { isLoading } = useContext(LoadingContext);

  // eslint-disable-next-line react/prop-types
  const routeSocialRoute = (route) => navigation.navigate(route);

  useToast('Click again to exit');

  const renderCard = (data) => (
    <View
      style={{
        height: 170,
        width: width <= 600 ? width / 1.6 : width / 3,
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
          height: height <= 600 ? 70 : 140,
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
        height: 250,
        width,
        marginVertical: 5,
        position: 'relative',
        alignItems: 'center',
      }}
      key={data.item.title}
      /* eslint-disable-next-line react/prop-types */
      onPress={() => routeSocialRoute(data.item.page)}
    >
      <Image
        source={data.item.banner}
        style={styles.cardContent}
        resizeMode="cover"
      />
      <BlurView intensity={25} tint="dark" style={styles.cardContent}>
        <Text category="h5" style={{ color: 'white' }}>
          {data.item.title}
        </Text>
      </BlurView>
    </TouchableOpacity>
  );

  return (
    <Layout level="4" style={{ flex: 1 }}>
      <OverlayLoader isLoading={isLoading} />
      <SafeAreaView style={{ flex: 1 }}>
        <TopNavigationArea
          title="woozeee"
          navigation={navigation}
          icon="logout"
          page="user"
        />

        <View style={{ flex: 1, paddingTop: 5, maxHeight: 180 }}>
          <List
            style={{ backgroundColor: 'transparent' }}
            alwaysBounceHorizontal
            horizontal
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            data={woozeeeCards}
            renderItem={renderCard}
          />
        </View>

        <View style={{ flex: 1, paddingBottom: 5 }}>
          <List
            style={{ backgroundColor: 'transparent' }}
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
