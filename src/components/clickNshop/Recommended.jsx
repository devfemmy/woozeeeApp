import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Platform,
  TouchableOpacity,
} from 'react-native';
import Clothes from '../assets/clothes.png';
import { BADGE_RED, BLACK, LIGHT_GREY } from '../utils/colors';
import { SCREEN_WIDTH } from '../utils/constants';
import SalesBadge from './SalesBadge';

const data = [
  {
    price: 'N3,500',
    oldPrice: 'N6,000',
    title: 'Mens 2 In 1 Polo T-Shirt Sh...',
    image: Clothes,
    sale: 11,
  },
  {
    price: 'N3,500',
    oldPrice: 'N6,000',
    title: 'Mens 2 In 1 Polo T-Shirt Sh...',
    image: Clothes,
    sale: 11,
  },
  {
    price: 'N3,500',
    oldPrice: 'N6,000',
    title: 'Mens 2 In 1 Polo T-Shirt Sh...',
    image: Clothes,
    sale: 11,
  },
  {
    price: 'N3,500',
    oldPrice: 'N6,000',
    title: 'Mens 2 In 1 Polo T-Shirt Sh...',
    image: Clothes,
    sale: 11,
  },
  {
    price: 'N3,500',
    oldPrice: 'N6,000',
    title: 'Mens 2 In 1 Polo T-Shirt Sh...',
    image: Clothes,
    sale: 11,
  },
  {
    price: 'N3,500',
    oldPrice: 'N6,000',
    title: 'Mens 2 In 1 Polo T-Shirt Sh...',
    image: Clothes,
    sale: 11,
  },
];

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 15,
  },
  text: {
    fontFamily: 'ProductSans-Medium',
    fontSize: 13,
    color: BLACK,
    lineHeight: 17,
  },
  data: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  listItem: {
    width: SCREEN_WIDTH * 0.45,
    height: 240,
    backgroundColor: '#FFF',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    ...Platform.select({
      ios: {
        shadowColor: 'rgb(0, 0, 0)',
        shadowOpacity: 0.1,
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
  image: {
    width: '100%',
    height: 135,
  },
  listItemBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
  },
  line: {
    position: 'absolute',
    width: '100%',
    top: '45%',
    height: 1,
    backgroundColor: BADGE_RED,
  },
});

export default function Recommended() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>RECOMMENDED FOR YOU</Text>
      <View style={styles.data}>
        {data.map((item) => (
          <TouchableOpacity style={styles.listItem}>
            <Image
              resizeMode="contain"
              style={styles.image}
              source={item.image}
            />
            <Text style={[styles.text, { fontFamily: 'ProductSans-Regular' }]}>
              {item.title}
            </Text>
            <Text style={styles.text}>{item.price}</Text>
            <View style={styles.listItemBottom}>
              <Text
                style={[
                  styles.text,
                  {
                    color: LIGHT_GREY,
                    textDecorationColor: BADGE_RED,
                    textDecorationLine: 'line-through',
                    marginRight: 5,
                  },
                ]}
              >
                {item.oldPrice}
              </Text>
              <SalesBadge sale={item.sale} />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
