import React from 'react';

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

import TopNavigationArea from '~src/components/TopNavigationArea';

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

// eslint-disable-next-line react/prop-types
export default function Home({ navigation }) {
  const { width } = useWindowDimensions();

  const renderCard = (data) => (
    <TouchableOpacity
      style={{
        height: 150,
        width,
        marginVertical: 5,
        position: 'relative',
        alignItems: 'center',
      }}
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
      <SafeAreaView style={{ flex: 1 }}>
        <TopNavigationArea
          title="Account Verification"
          navigation={navigation}
          icon="false"
        />

        <View style={{ flex: 1, paddingVertical: 5 }}>
          <List
            alwaysBounceVertical
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={woozeeeCategories}
            renderItem={renderCard}
          />
        </View>
      </SafeAreaView>
    </Layout>
  );
}
