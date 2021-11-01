import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import Sneakers from '../assets/sneakers.png';
import RingLight from '../assets/ring-light.png';
import Phone from '../assets/iphone-11.png';
import Bag from '../assets/bags.png';
import DealsItem from './DealsItem';
import { BADGE_RED, BLACK, LIGHT_GREY } from '../utils/colors';

const data = [
  {
    price: 'N10,500',
    title: 'Men Casual Shoes Fashion',
    image: Sneakers,
    sale: 11,
  },
  {
    price: 'N10,500',
    title: '10-inch Selfie Ring Light ...',
    image: RingLight,
    sale: 11,
  },
  {
    price: 'N10,500',
    title: 'Apple IPhone 11 6.1-Inch...',
    image: Phone,
    sale: 11,
  },
  {
    price: 'N10,500',
    title: 'Red Textured Bag',
    image: Bag,
    sale: 11,
  },
];

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginTop: 15,
    backgroundColor: '#FFF',
    borderRadius: 5,
    ...Platform.select({
      ios: {
        shadowColor: 'rgb(0, 0, 0)',
        shadowOpacity: 0.08,
        shadowOffset: {
          width: 0,
          height: 4,
        },
      },
      android: {
        elevation: 5,
      },
    }),
  },
  head: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomColor: LIGHT_GREY,
    borderBottomWidth: 1,
  },
  text: {
    fontFamily: 'ProductSans-Medium',
    fontSize: 13,
    color: BLACK,
  },
  data: {
    padding: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default function RecentlyViewed() {
  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <Text style={styles.text}>RECENTLY VIEWED</Text>
        <TouchableOpacity>
          <Text style={[styles.text, { color: BADGE_RED }]}>SEE ALL</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.data}>
        {data.map((item) => (
          <DealsItem
            image={item.image}
            price={item.price}
            title={item.title}
            sale={item.sale}
            borders
          />
        ))}
      </View>
    </View>
  );
}
