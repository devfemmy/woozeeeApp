import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { BLACK } from '../../utilities/colors';
import { SCREEN_WIDTH } from '../../constants/dimension';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH * 0.215,
    height: 100,
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    // fontFamily: 'ProductSans-Regular',
    fontSize: 12,
    color: BLACK,
    paddingTop: 5,
    textAlign: 'center',
  },
});

export default function HomeOption({ icon, color, text }) {
  const Icon = icon;
  return (
    <TouchableOpacity style={styles.container}>
      <View style={[styles.circle, { backgroundColor: color }]}>
        <Icon />
      </View>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
}
