import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { BADGE_RED, BLACK, DARK_GREY, LIGHT_GREY } from '../utils/colors';
import AddIcon from './icons/AddIcon';
import HeartIcon from './icons/HeartIcon';
import MinusIcon from './icons/MinusIcon';
import TrashIcon from './icons/TrashIcon';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    borderRadius: 3,
    marginBottom: 15,
    width: '95%',
    alignSelf: 'center',
    flexDirection: 'column',
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
  body: {
    flexDirection: 'row',
    padding: 10,
  },
  image: {
    width: 120,
    height: 140,
    marginRight: 5,
  },
  details: {
    flex: 1,
    flexDirection: 'column',
    paddingVertical: 5,
  },
  text: {
    fontFamily: 'ProductSans-Medium',
    fontSize: 13,
    color: BLACK,
  },
  price: {
    width: '100%',
    paddingVertical: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceText: {
    fontSize: 16,
    fontFamily: 'ProductSans-Bold',
    color: BADGE_RED,
    marginRight: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopColor: LIGHT_GREY,
    borderTopWidth: 1,
  },
  left: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  heart: {
    padding: 10,
    borderRightWidth: 1,
    borderRightColor: LIGHT_GREY,
  },
  trash: {
    padding: 10,
  },
  right: {
    flexDirection: 'row',
    marginRight: 10,
    alignItems: 'center',
  },
  number: {
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  numberLine: {
    backgroundColor: LIGHT_GREY,
    position: 'relative',
    width: '100%',
    height: 1,
  },
});

export default function CartItem({ image, price, title, oldPrice }) {
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Image style={styles.image} source={image} resizeMode="contain" />
        <View style={styles.details}>
          <Text style={styles.text}>{title}</Text>
          <View style={styles.price}>
            <Text style={styles.priceText}>{price}</Text>
            <Text
              style={[
                styles.text,
                { color: DARK_GREY, textDecorationLine: 'line-through' },
              ]}
            >
              {oldPrice}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.footer}>
        <View style={styles.left}>
          <TouchableOpacity style={styles.heart}>
            <HeartIcon color={BADGE_RED} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.trash}>
            <TrashIcon />
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={[styles.text, { color: BADGE_RED }]}>REMOVE</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.right}>
          <TouchableOpacity>
            <MinusIcon color="#FF9F9F" />
          </TouchableOpacity>
          <View style={styles.number}>
            <Text style={[styles.text, { fontSize: 17, paddingHorizontal: 7 }]}>
              1
            </Text>
            <View style={styles.numberLine} />
          </View>
          <TouchableOpacity>
            <AddIcon />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
