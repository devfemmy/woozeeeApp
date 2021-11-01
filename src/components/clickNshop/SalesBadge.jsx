import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { BADGE_RED } from "../utils/colors";

const styles = StyleSheet.create({
  badge: {
    backgroundColor: BADGE_RED,
    width: 38,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    fontFamily: "ProductSans-Bold",
    fontSize: 13,
    textAlign: "center",
    color: "#FFF",
  },
});

export default function SalesBadge({ sale = 0 }) {
  return (
    <View style={styles.badge}>
      <Text style={styles.badgeText}>-{sale}%</Text>
    </View>
  );
}
