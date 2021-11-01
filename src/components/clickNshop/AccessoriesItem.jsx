import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import { BLACK } from '../utils/colors';
import { SCREEN_WIDTH } from '../utils/constants';

const styles = StyleSheet.create({
  tablets: {
    backgroundColor: '#FFF',
    paddingVertical: 12,
    marginBottom: 15,
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
  text: {
    color: BLACK,
    fontSize: 13,
    fontFamily: 'ProductSans-Medium',
    textAlign: 'center',
  },
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 10,
  },
  tabItem: {
    alignItems: 'center',
    width: SCREEN_WIDTH / 4.5,
    marginBottom: 10,
  },
  tabItemImage: {
    height: 97,
    width: SCREEN_WIDTH / 4.55,
    marginBottom: 7,
  },
});

export default function AccessoriesItem({
  items,
  title = 'BUDGET SMARTPHONES',
}) {
  return (
    <View style={styles.tablets}>
      <Text style={styles.text}>{title}</Text>
      <View style={styles.list}>
        {items.map((elem) => (
          <TouchableOpacity style={styles.tabItem}>
            <Image source={elem.image} style={styles.tabItemImage} />
            {elem.name && (
              <Text
                style={[
                  styles.text,
                  {
                    fontFamily: 'ProductSans-Regular',
                  },
                ]}
              >
                {elem.name}
              </Text>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
