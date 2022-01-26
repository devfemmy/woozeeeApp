import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SCREEN_WIDTH } from '../utils/constants';
import DealsItem from './DealsItem';

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    backgroundColor: '#FFF',
  },
  gradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SCREEN_WIDTH * 0.05,
    height: 50,
  },
  text: {
    fontFamily: 'ProductSans-Medium',
    fontSize: 13,
    color: '#FFF',
    lineHeight: 17,
  },
  data: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default function DealsOfDay({
  title = 'DEALS OF THE DAY',
  description = 'Up to 60% Off',
  gradientColors = ['#FE0500', '#DD0101'],
  data = [],
}) {
  return (
    <View style={styles.container}>
      <LinearGradient colors={gradientColors} style={styles.gradient}>
        <View style={styles.left}>
          <Text style={styles.text}>{title}</Text>
          <Text style={[styles.text, { fontFamily: 'ProductSans-Regular' }]}>
            {description}
          </Text>
        </View>
        <TouchableOpacity style={styles.right}>
          <Text style={styles.text}>SEE ALL</Text>
        </TouchableOpacity>
      </LinearGradient>
      <View style={styles.data}>
        {data.map((item) => (
          <DealsItem
            image={item.image}
            price={item.price}
            title={item.title}
            sale={item.sale}
          />
        ))}
      </View>
    </View>
  );
}
