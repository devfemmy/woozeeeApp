import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { DARK_GREY, LIGHTER_GREY } from '../utils/colors';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../utils/constants';
import SearchIcon from './icons/SearchIcon';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: LIGHTER_GREY,
    alignItems: 'center',
    borderRadius: 6,
  },
  icon: {
    paddingHorizontal: SCREEN_WIDTH * 0.02,
  },
  input: {
    paddingVertical: SCREEN_HEIGHT * 0.01,
    paddingRight: SCREEN_WIDTH * 0.02,
    fontSize: 14,
    flex: 1,
    fontFamily: 'ProductSans-Regular',
  },
});

export default function SearchInput({ setIsFocused, searchRef }) {
  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <SearchIcon color={DARK_GREY} />
      </View>
      <TextInput
        style={styles.input}
        placeholder="Search for Products & Brands..."
        placeholderTextColor={DARK_GREY}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        ref={searchRef}
      />
    </View>
  );
}
