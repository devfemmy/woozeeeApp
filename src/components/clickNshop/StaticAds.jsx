import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  ad5: {
    marginTop: 15,
    flexDirection: 'row',
    width: '100%',
  },
  image: {
    width: '50%',
    height: 120,
  },
});

export default function StaticAds({ images }) {
  return (
    <View style={styles.ad5}>
      <Image resizeMode="cover" source={images[0]} style={styles.image} />
      <Image resizeMode="cover" source={images[1]} style={styles.image} />
    </View>
  );
}
