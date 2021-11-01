import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from 'react-native';
import DetailsScreen from '../screens/DetailsScreen';
import { BLACK, LIGHT_GREY } from '../utils/colors';
import { SCREEN_WIDTH } from '../utils/constants';
import SalesBadge from './SalesBadge';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    marginVertical: 15,
  },
  bordersContainer: {
    borderWidth: 1,
    borderColor: LIGHT_GREY,
    borderRadius: 5,
    width: '45%',
  },
  image: {
    height: 120,
    width: SCREEN_WIDTH * 0.38,
  },
  text: {
    fontFamily: 'ProductSans-Regular',
    fontSize: 13,
    textAlign: 'center',
    color: BLACK,
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 10,
    zIndex: 10,
  },
  line: {
    backgroundColor: LIGHT_GREY,
    width: '100%',
    height: 1,
    marginVertical: 5,
    marginHorizontal: -5,
  },
});

export default function DealsItem({
  image,
  title,
  price,
  sale,
  borders = false,
}) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  return (
    <TouchableOpacity
      style={[styles.container, borders ? styles.bordersContainer : {}]}
      onPress={() => setIsDetailsOpen(true)}
    >
      <Modal
        onRequestClose={() => {}}
        animationType="slide"
        transparent={false}
        visible={isDetailsOpen}
      >
        <DetailsScreen close={() => setIsDetailsOpen(false)} />
      </Modal>
      <View style={styles.badge}>
        <SalesBadge sale={sale} />
      </View>
      <Image
        resizeMode="contain"
        style={[styles.image, borders ? { marginTop: 5 } : {}]}
        source={image}
      />
      {borders && <View style={styles.line} />}
      <Text style={styles.text}>{title}</Text>
      <Text
        style={[
          styles.text,
          { fontFamily: 'ProductSans-Medium' },
          borders ? { marginBottom: 5 } : {},
        ]}
      >
        {price}
      </Text>
    </TouchableOpacity>
  );
}
