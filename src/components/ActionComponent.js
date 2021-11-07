import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../theme";
import TouchableOpacity from "./TouchableOpacity";

const ActionComponent = (props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={props.onPress}>
        <View style={styles.circle}>{props.icon}</View>
        <View>
          <Text style={styles.text}>{props.title}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    width: 46,
    height: 46,
    borderRadius: 46,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: Colors.divider,
    marginBottom: 10,
  },
  text: {
    alignSelf: "center",
    fontSize: 12,
    fontWeight: "500",
    lineHeight: 15.26,
    color: Colors.blackText,
  },
});

export default ActionComponent;
