import React from 'react';
import { View, StyleSheet } from 'react-native';
import { DARK_GREY, GOLD } from '../utils/colors';
import StarIcon from './icons/StarIcon';

const styles = StyleSheet.create({
  star: {
    marginRight: 2,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
});

export default function Stars({ rating, size }) {
  return (
    <View style={styles.rating}>
      {[0, 0, 0, 0, 0].map((_, idx) => (
        <View style={styles.star}>
          <StarIcon size={size} color={idx < rating ? GOLD : DARK_GREY} />
        </View>
      ))}
    </View>
  );
}
