import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { BADGE_RED, BLACK, DARK_GREY, LIGHT_GREY } from '../utils/colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    marginTop: 10,
    width: '100%',
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
    padding: 10,
  },
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  text: {
    fontFamily: 'ProductSans-Medium',
    fontSize: 15,
    color: BLACK,
  },
  boldText: {
    fontFamily: 'ProductSans-Bold',
    fontSize: 16,
    color: BLACK,
  },
  mid: {
    alignItems: 'flex-end',
    marginVertical: 7,
  },
  button: {
    backgroundColor: BADGE_RED,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    height: 40,
  },
});

export default function SubTotal() {
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.head,
          { borderBottomWidth: 1, borderBottomColor: LIGHT_GREY },
        ]}
      >
        <Text style={styles.text}>Subtotal</Text>
        <Text style={styles.boldText}>N148,000</Text>
      </View>
      <View style={styles.head}>
        <Text style={styles.text}>Total</Text>
        <Text style={[styles.boldText, { color: BADGE_RED, fontSize: 18 }]}>
          N148,000
        </Text>
      </View>
      <View style={styles.mid}>
        <Text style={[styles.text, { color: DARK_GREY, fontSize: 13 }]}>
          International shipping and Customs fee not included yet
        </Text>
        <Text style={[styles.text, { color: DARK_GREY, fontSize: 13 }]}>
          (NON-REFUNDABLE in case of a return)
        </Text>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={[styles.text, { color: '#FFF' }]}>
          Complete your Order
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: '#FFF', borderWidth: 1, borderColor: BADGE_RED },
        ]}
      >
        <Text style={[styles.text, { color: BADGE_RED }]}>Call to Order</Text>
      </TouchableOpacity>
    </View>
  );
}
