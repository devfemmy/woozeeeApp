import React from "react";
import { View, StyleSheet } from "react-native";
import { BADGE_RED, LIGHT_GREY } from "../utils/colors";

const styles = StyleSheet.create({
  container: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 3,
  },
});

export default function Circle({ active }) {
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: active ? BADGE_RED : LIGHT_GREY },
      ]}
    />
  );
}
