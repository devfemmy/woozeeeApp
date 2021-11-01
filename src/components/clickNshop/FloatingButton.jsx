import React from "react";
import { StyleSheet, TouchableOpacity, Platform, View } from "react-native";
import BackArrowIcon from "./icons/BackArrowIcon";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    zIndex: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    position: "absolute",
    bottom: 7,
    right: 7,
    justifyContent: "center",
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: "rgb(0, 0, 0)",
        shadowOpacity: 0.25,
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
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default function FloatingButton({ isDown = true, onPress }) {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={styles.container}
      onPress={onPress}
    >
      <View style={{ transform: [{ rotateZ: isDown ? "-90deg" : "90deg" }] }}>
        <BackArrowIcon />
      </View>
    </TouchableOpacity>
  );
}
