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

/* DATA */
const woozeeeCategories = [
  {
    title: 'Woozeee Socials',
    banner: require('~assets/images/woozeee-socials.jpg'),
  },
  {
    title: 'Woozeee Marketplace',
    banner: require('~assets/images/woozeee-marketplace.jpg'),
  },
  {
    title: 'Woozeee Charity',
    banner: require('~assets/images/woozeee-charity.jpg'),
  },
];

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

const styles = StyleSheet.create({
  cardContent: {
    height: '100%',
    width: '95%',
    maxWidth: 600,
    position: 'absolute',
    borderRadius: 10,
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

  const renderCard = (data) => (
    <View
      style={{
        height: 200,
        width: width <= 600 ? width / 1.25 : width / 3,
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
          borderRadius: 10,
          width: '95%',
          height: height <= 600 ? 70 : 170,
        }}
        resizeMode="contain"
      />
    </View>
  );

  const renderCategory = (data) => (
    <TouchableOpacity
      style={{
        height: 150,
        width,
        marginVertical: 5,
        position: 'relative',
        alignItems: 'center',
      }}
      key={data.item.key}
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
    <Layout level="2" style={{ flex: 1 }}>
      <OverlayLoader isLoading={isLoading} />
      <SafeAreaView style={{ flex: 1 }}>
        <TopNavigationArea
          title="Woozeee"
          navigation={navigation}
          icon="logout"
        />
        <View style={{ flex: 1, paddingVertical: 5, maxHeight: 220 }}>
          <List
            alwaysBounceHorizontal
            horizontal
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            data={woozeeeCards}
            renderItem={renderCard}
          />
        </View>

        <View style={{ flex: 1, paddingVertical: 5 }}>
          <List
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
