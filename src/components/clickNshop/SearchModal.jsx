import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { DARK_GREY, LIGHT_GREY } from '../utils/colors';
import { SCREEN_HEIGHT } from '../utils/constants';
import Clock from './icons/Clock';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: '#FFF',
    width: '100%',
    height: SCREEN_HEIGHT * 0.88,
    marginTop: SCREEN_HEIGHT * 0.11,
    ...Platform.select({
      android: {
        marginTop: SCREEN_HEIGHT * 0.1,
      },
    }),
    zIndex: 1,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
    paddingVertical: 7,
    borderBottomWidth: 1,
    borderBottomColor: LIGHT_GREY,
  },
  text: {
    fontFamily: 'ProductSans-Regular',
    fontSize: 15,
    marginLeft: 10,
    color: DARK_GREY,
  },
});

const example = ['Phone', 'Microwave', 'Chair', 'Electric Blender'];

export default function SearchModal({ onSearch }) {
  return (
    <View style={styles.container}>
      {example.map((val) => (
        <TouchableOpacity onPress={() => onSearch(val)} style={styles.listItem}>
          <Clock />
          <Text style={styles.text}>{val}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
