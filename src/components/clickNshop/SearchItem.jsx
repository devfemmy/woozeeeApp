import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { BADGE_RED, BLACK, DARK_GREY } from '../utils/colors';
import { SCREEN_WIDTH } from '../utils/constants';
import HeartIcon from './icons/HeartIcon';
import SalesBadge from './SalesBadge';
import Stars from './Stars';

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH * 0.45,
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 3,
    marginBottom: 15,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: 'rgb(0, 0, 0)',
        shadowOpacity: 0.1,
        shadowOffset: {
          width: 0,
          height: 2,
        },
      },
      android: {
        elevation: 5,
      },
    }),
  },
  containerList: {
    flexDirection: 'row',
    width: '100%',
  },
  image: {
    width: 120,
    height: 140,
  },
  body: {
    width: '100%',
  },
  heart: {
    alignSelf: 'flex-start',
    marginBottom: 5,
  },
  text: {
    fontFamily: 'ProductSans-Medium',
    fontSize: 13,
    color: BLACK,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    width: '100%',
    paddingVertical: 3,
  },
  oldPriceCont: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  line: {
    backgroundColor: DARK_GREY,
    position: 'absolute',
    width: '100%',
    height: 1,
    top: '45%',
  },
  button: {
    width: '100%',
    backgroundColor: BADGE_RED,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    height: 35,
  },
  buttonText: {
    fontFamily: 'ProductSans-Regular',
    fontSize: 13,
    color: '#FFF',
  },
});

export default function SearchItem({
  image,
  price,
  title,
  oldPrice,
  sale,
  rating,
  raters,
  isTiles,
}) {
  return (
    <TouchableOpacity
      style={[styles.container, isTiles ? {} : styles.containerList]}
    >
      <View style={[styles.body, isTiles ? {} : { width: '40%' }]}>
        <Image style={styles.image} source={image} resizeMode="contain" />
        <TouchableOpacity style={styles.heart}>
          <HeartIcon color={BADGE_RED} />
        </TouchableOpacity>
      </View>
      <View style={[styles.body, isTiles ? {} : { width: '60%' }]}>
        <Text style={styles.text}>{title}</Text>
        <View style={styles.price}>
          <Text style={[styles.text, { fontSize: 18 }]}>{price}</Text>
        </View>
        <View style={styles.oldPriceCont}>
          <Text
            style={[
              styles.text,
              {
                fontSize: 15,
                color: DARK_GREY,
                textDecorationLine: 'line-through',
              },
            ]}
          >
            {oldPrice}
          </Text>
          <SalesBadge sale={sale} />
        </View>
        <View style={styles.rating}>
          <Stars rating={rating} />
          <Text style={[styles.text, { color: DARK_GREY, fontSize: 11 }]}>
            ({raters})
          </Text>
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}
