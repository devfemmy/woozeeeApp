import React from "react";
import { Text, StyleSheet } from "react-native";
import { Colors } from "../theme";
import TouchableOpacity from "./TouchableOpacity";

const Button = (props) => {
  const { title, onPress, style, textStyle } = props;

  return (
    <TouchableOpacity
      containerStyle={[styles.container, style]}
      onPress={onPress}
    >
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 40,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 23,
    backgroundColor: Colors.pink,
    shadowColor: "#FF0000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  text: {
    fontWeight: "700",
    fontSize: 14,
    lineHeight: 18,
    color: Colors.white,
    fontFamily: 'montserrat-medium',
  },
});

export default Button;
