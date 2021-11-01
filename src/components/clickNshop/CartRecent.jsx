import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { BLACK } from '../utils/colors';
import CartRecentItem from './CartRecentItem';
import Android from '../assets/android3.png';

const recentData = [
  {
    title: 'Samsung Galaxy A5...',
    price: 'N124,000',
    oldPrice: 'N150,000',
    image: Android,
  },
  {
    title: 'Samsung Galaxy A5...',
    price: 'N124,000',
    oldPrice: 'N150,000',
    image: Android,
  },
  {
    title: 'Samsung Galaxy A5...',
    price: 'N124,000',
    oldPrice: 'N150,000',
    image: Android,
  },
];

const styles = StyleSheet.create({
  text: {
    fontFamily: 'ProductSans-Medium',
    fontSize: 14,
    color: BLACK,
  },
  recent: {
    padding: 10,
    marginVertical: 10,
  },

  horizontalScroll: {
    paddingVertical: 10,
    marginBottom: 20,
  },
});

export default function CartRecent({ title = 'RECENTLY VIEWED' }) {
  return (
    <View style={styles.recent}>
      <Text style={styles.text}>{title}</Text>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal
        style={styles.horizontalScroll}
      >
        {recentData.map((item) => (
          <CartRecentItem
            image={item.image}
            title={item.title}
            price={item.price}
            oldPrice={item.oldPrice}
          />
        ))}
      </ScrollView>
    </View>
  );
}
