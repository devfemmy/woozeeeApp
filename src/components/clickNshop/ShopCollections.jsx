import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from "react-native";
import christmasImg from "../assets/christmas.png";
import decorationsImg from "../assets/decorations.png";
import groceriesImg from "../assets/groceries.png";
import kitchenImg from "../assets/kitchen.png";
import androidImg from "../assets/android.png";
import iosPhonesImg from "../assets/ios-phones.png";
import shoesImg from "../assets/shoes.png";
import bagsImg from "../assets/bags.png";
import { BLACK } from "../utils/colors";
import { SCREEN_WIDTH } from "../utils/constants";

const data = [
  {
    name: "Christmas Tree",
    image: christmasImg,
  },
  {
    name: "Decorations",
    image: decorationsImg,
  },
  {
    name: "Groceries",
    image: groceriesImg,
  },
  {
    name: "Kitchen Bundles",
    image: kitchenImg,
  },
  {
    name: "Android Phones",
    image: androidImg,
  },
  {
    name: "iOS Phones",
    image: iosPhonesImg,
  },
  {
    name: "Men's Shoes",
    image: shoesImg,
  },
  {
    name: "Women Handbags",
    image: bagsImg,
  },
];

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    paddingHorizontal: 10,
  },
  text: {
    fontFamily: "ProductSans-Bold",
    fontSize: 13,
    color: BLACK,
    marginBottom: 10,
  },
  list: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    backgroundColor: "#FFF",
    borderRadius: 5,
    ...Platform.select({
      ios: {
        shadowColor: "rgb(0, 0, 0)",
        shadowOpacity: 0.02,
        shadowOffset: {
          width: 0,
          height: 4,
        },
      },
      android: {
        elevation: 5,
      },
    }),
  },
  listItem: {
    alignItems: "center",
    justifyContent: "center",
    height: 100,
    width: SCREEN_WIDTH * 0.215,
  },
  listImage: {
    height: 65,
    width: SCREEN_WIDTH * 0.21,
  },
  listText: {
    fontFamily: "ProductSans-Regular",
    fontSize: 11,
    color: BLACK,
  },
});

export default function ShopCollections() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>SHOP OUR COLLECTIONS</Text>
      <View style={styles.list}>
        {data.map((item) => (
          <TouchableOpacity style={styles.listItem}>
            <Image
              resizeMode="contain"
              source={item.image}
              style={styles.listImage}
            />
            <Text style={styles.listText}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
