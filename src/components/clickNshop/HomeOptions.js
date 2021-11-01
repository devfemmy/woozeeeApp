import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { BADGE_RED, MAIN_BLUE } from '../../utilities/colors';
import HomeOption from './HomeOption';
import CashIcon from './icons/CashIcon';
import ChristmasIcon from './icons/ChristmasIcon';
import EventsIcon from './icons/EventsIcon';
import HangoutIcon from './icons/HangoutIcon';
import HomeWhiteIcon from './icons/HomeWhiteIcon';
import PhoneIcon from './icons/PhoneIcon';
import VanIcon from './icons/VanIcon';
import WoozeeIcon from './icons/WoozeeIcon';

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    backgroundColor: '#FFF',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
});

const options = [
  {
    title: 'Christmas Sale',
    color: '#E41C26',
    icon: ChristmasIcon,
  },
  {
    title: 'Official Stores',
    color: BADGE_RED,
    icon: HomeWhiteIcon,
  },
  {
    title: 'Hangout',
    color: '#E2415E',
    icon: HangoutIcon,
  },
  {
    title: 'woozeee Express',
    color: MAIN_BLUE,
    icon: VanIcon,
  },
  {
    title: 'woozeee Events',
    color: '#0EE497',
    icon: EventsIcon,
  },
  {
    title: 'Social',
    color: MAIN_BLUE,
    icon: WoozeeIcon,
  },
  {
    title: 'woozeee Utilities',
    color: '#FCA804',
    icon: CashIcon,
  },
  {
    title: 'Call to Order',
    color: '#581EFF',
    icon: PhoneIcon,
  },
];

export default function HomeOptions() {
  return (
    <View style={styles.container}>
      {options.map((item) => (
        <HomeOption text={item.title} color={item.color} icon={item.icon} />
      ))}
    </View>
  );
}
