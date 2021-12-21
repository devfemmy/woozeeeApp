import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { BLACK, DARK_GREY, LIGHT_GREY } from '../utils/colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    borderRadius: 3,
    marginRight: 15,
    width: 150,
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
    padding: 8,
  },
  imageCont: {
    paddingBottom: 3,
    marginBottom: 3,
    borderBottomWidth: 1,
    borderBottomColor: LIGHT_GREY,
  },
  image: {
    width: 120,
    height: 140,
    marginRight: 5,
  },
  text: {
    color: BLACK,
    fontFamily: 'ProductSans-Bold',
    fontSize: 16,
  },
  oldPrice: {},
  line: {
    backgroundColor: DARK_GREY,
    position: 'absolute',
    width: '100%',
    height: 1,
    top: '45%',
  },
  placeholder: {
    flexGrow: 1,
  },
});

export default function CartRecentItem({ image, oldPrice, price, title }) {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.imageCont}>
        <Image style={styles.image} source={image} resizeMode="contain" />
      </View>
      <Text
        style={[
          styles.text,
          { fontFamily: 'ProductSans-Regular', fontSize: 13 },
        ]}
      >
        {title}
      </Text>
      <Text style={styles.text}>{price}</Text>
      <Text
        style={[
          styles.text,
          {
            fontSize: 13,
            color: DARK_GREY,
            textDecorationLine: 'line-through',
          },
        ]}
      >
        {oldPrice}
      </Text>
    </TouchableOpacity>
  );
}
