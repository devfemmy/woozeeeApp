import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Platform,
} from 'react-native';
import { BADGE_RED, BLACK, DARK_GREY } from '../utils/colors';
import SalesBadge from './SalesBadge';

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
    fontSize: 15,
    fontFamily: 'ProductSans-Medium',
    alignSelf: 'flex-start',
  },
  tabTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  tabItem: {
    marginHorizontal: 10,
    alignItems: 'center',
  },
  tabItemImage: {
    height: 97,
    width: 90,
    marginBottom: 7,
  },
  saleBadge: {
    position: 'absolute',
    right: 0,
  },
});

export default function BudgetSmartPhones({
  items,
  title = 'BUDGET SMARTPHONES',
  seeAll = true,
}) {
  return (
    <View style={styles.tablets}>
      <View
        style={[styles.tabTitle, seeAll ? {} : { justifyContent: 'center' }]}
      >
        <Text style={[styles.text, seeAll ? { fontSize: 13 } : {}]}>
          {title}
        </Text>
        {seeAll && (
          <TouchableOpacity>
            <Text style={[styles.text, { fontSize: 13, color: BADGE_RED }]}>
              SEE ALL
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {items.map((elem) => (
          <TouchableOpacity
            style={[styles.tabItem, seeAll ? { width: 140 } : {}]}
          >
            <Image
              source={elem.image}
              style={[styles.tabItemImage, seeAll ? { width: 120 } : {}]}
            />
            <Text
              style={[
                styles.text,
                {
                  fontSize: 12,
                  textAlign: 'center',
                },
              ]}
            >
              {elem.name}
            </Text>
            {seeAll && (
              <Text
                style={[
                  styles.text,
                  {
                    fontFamily: 'ProductSans-Bold',
                    fontSize: 14,
                  },
                ]}
              >
                {elem.price}
              </Text>
            )}
            {seeAll && (
              <Text
                style={[
                  styles.text,
                  {
                    fontSize: 11,
                    color: DARK_GREY,
                    textDecorationLine: 'line-through',
                  },
                ]}
              >
                {elem.oldPrice}
              </Text>
            )}
            {seeAll && (
              <View style={styles.saleBadge}>
                <SalesBadge sale={elem.sale} />
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
