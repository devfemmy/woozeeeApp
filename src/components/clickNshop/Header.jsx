/* eslint-disable import/no-cycle */
import React, { useRef, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  StatusBar,
  Modal,
} from 'react-native';
import CartScreen from '../screens/CartScreen';
import SearchScreen from '../screens/SearchScreen';
import { BADGE_RED, BLACK } from '../utils/colors';
import { SCREEN_HEIGHT, STATUS_BAR_HEIGHT } from '../utils/constants';
import BackArrowIcon from './icons/BackArrowIcon';
import CartIcon from './icons/CartIcon';
import SearchIcon from './icons/SearchIcon';
import SearchInput from './SearchInput';
import SearchModal from './SearchModal';

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#fff',
    zIndex: 10,
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
    width: '100%',
    height: SCREEN_HEIGHT * 0.11,
    ...Platform.select({
      android: {
        height: SCREEN_HEIGHT * 0.1,
      },
    }),
  },
  status: {
    height: STATUS_BAR_HEIGHT,
  },
  details: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  text: {
    color: BLACK,
    fontSize: 18,
    fontFamily: 'ProductSans-Medium',
  },
  iconContainer: {
    width: '13%',
    height: '100%',
    flexDirection: 'row',
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  searchIcon: {
    position: 'absolute',
    right: 0,
    width: '13%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelText: {
    color: BADGE_RED,
    fontSize: 15,
    fontFamily: 'ProductSans-Medium',
  },
});

export default function Header({
  onBackPress,
  title = 'Home',
  isSearchShown = true,
  searchDisabled = false,
  cartDisabled = false,
}) {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchScreenOpen, setIsSearchScreenOpen] = useState(false);
  const searchRef = useRef(null);

  const onSearch = () => {
    setIsSearchScreenOpen(true);
  };

  return (
    <View style={[styles.header]}>
      <StatusBar
        barStyle={Platform.OS === 'android' ? 'light-content' : 'dark-content'}
      />
      <Modal
        animationType="slide"
        transparent={false}
        visible={isSearchScreenOpen}
        onRequestClose={() => {
          setIsSearchFocused(!isSearchFocused);
        }}
      >
        <SearchScreen
          close={() => {
            setIsSearchScreenOpen(false);
            searchRef.current.focus();
          }}
        />
      </Modal>
      <Modal
        animationType="slide"
        transparent={false}
        visible={isCartOpen}
        onRequestClose={() => {
          setIsCartOpen(!isCartOpen);
        }}
      >
        <CartScreen
          close={() => {
            setIsCartOpen(false);
          }}
        />
      </Modal>
      {isSearchFocused && <SearchModal onSearch={onSearch} />}
      {Platform.OS !== 'android' && <View style={styles.status} />}
      <View style={styles.details}>
        {!isSearchFocused && (
          <View style={styles.iconContainer}>
            <TouchableOpacity style={styles.icon} onPress={onBackPress}>
              <BackArrowIcon />
            </TouchableOpacity>
          </View>
        )}
        <View
          style={[
            styles.textContainer,
            isSearchFocused ? { marginLeft: 15 } : {},
          ]}
        >
          {!isSearchShown && !isSearchFocused && (
            <Text style={styles.text}>{title}</Text>
          )}
          {!isSearchShown && !isSearchFocused && (
            <TouchableOpacity
              style={styles.searchIcon}
              onPress={() => !searchDisabled && setIsSearchFocused(true)}
            >
              {!searchDisabled && <SearchIcon />}
            </TouchableOpacity>
          )}
          {(isSearchShown || isSearchFocused) && (
            <SearchInput
              setIsFocused={setIsSearchFocused}
              searchRef={searchRef}
              onSearch={onSearch}
            />
          )}
        </View>
        <View
          style={[
            styles.iconContainer,
            isSearchFocused ? { width: '20%' } : {},
          ]}
        >
          {!isSearchFocused && (
            <TouchableOpacity
              style={styles.icon}
              onPress={() => !cartDisabled && setIsCartOpen(true)}
            >
              {!cartDisabled && <CartIcon />}
            </TouchableOpacity>
          )}
          {isSearchFocused && (
            <TouchableOpacity
              style={styles.icon}
              onPress={() => {
                searchRef.current.blur();
                setIsSearchFocused(false);
              }}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}
