import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from "react-native";
import televisionImg from "../assets/television.png";
import laptopImg from "../assets/laptop.png";
import wigImg from "../assets/wig.png";
import kitchenImg from "../assets/kitchen.png";
import androidImg from "../assets/android2.png";
import iosPhonesImg from "../assets/ios-phones2.png";
import watchImg from "../assets/smart-watch.png";
import toastersImg from "../assets/toasters.png";
import { BLACK } from "../utils/colors";
import { SCREEN_WIDTH } from "../utils/constants";

const data = [
  {
    name: "Android Phones",
    image: androidImg,
  },
  {
    name: "iOS Phones",
    image: iosPhonesImg,
  },
  {
    name: "Televisions",
    image: televisionImg,
  },
  {
    name: "Laptop",
    image: laptopImg,
  },
  {
    name: "Kitchen Bundles",
    image: kitchenImg,
  },
  {
    name: "Wigs",
    image: wigImg,
  },
  {
    name: "Smart Watches",
    image: watchImg,
  },
  {
    name: "Toasters",
    image: toastersImg,
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
    justifyContent: "space-between",
  },
  listItem: {
    backgroundColor: "#FFF",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    height: 90,
    width: SCREEN_WIDTH * 0.215,
    marginBottom: 10,
    ...Platform.select({
      ios: {
        shadowColor: "rgb(0, 0, 0)",
        shadowOpacity: 0.1,
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
  listImage: {
    height: 60,
    width: SCREEN_WIDTH * 0.21,
  },
  listText: {
    textAlign: "center",
    fontFamily: "ProductSans-Regular",
    fontSize: 12,
    color: BLACK,
  },
});

export default function TopCategories() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>TOP CATEGORIES</Text>
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
