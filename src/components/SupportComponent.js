import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { Colors } from "../theme";
import { Images } from "../../assets/images";

const SupportComponent = (props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
      <Text style={styles.title}>{props.title}</Text>
      <View style={styles.chevron}>
        <Images.chevron />
      </View>
    </TouchableOpacity>
  );
};

export default SupportComponent;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    height: 37,
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 18,
    paddingRight: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  title: {
    fontSize: 12,
    fontWeight: "500",
    color: Colors.black,
  },
  chevron: {
    flexDirection: "row",
    alignItems: "center",
    width: 16,
    height: 16,
  },
});
