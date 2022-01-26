import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { BADGE_RED, BLACK, DARK_GREY } from '../utils/colors';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#FFF',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  text: {
    fontFamily: 'ProductSans-Regular',
    fontSize: 17,
    color: BLACK,
  },
  image: {
    height: 130,
    width: '100%',
    marginVertical: 7,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
});

export default function FeedItem({ title, description, date, image }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
      <Image source={image} style={styles.image} resizeMode="cover" />
      <Text style={[styles.text, { fontSize: 14 }]}>{description}</Text>
      <View style={styles.footer}>
        <Text style={[styles.text, { fontSize: 13, color: DARK_GREY }]}>
          {date}
        </Text>
        <TouchableOpacity>
          <Text style={[styles.text, { fontSize: 13, color: BADGE_RED }]}>
            SHARE
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
