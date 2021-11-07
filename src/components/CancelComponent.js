import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../theme";
import { Images } from "../../assets/images";
import TouchableOpacity from "./TouchableOpacity";

const CancelComponent = (props) => {
  return (
    <View style={styles.cancelReason}>
      <TouchableOpacity
        onPress={props.onPress}
        containerStyle={[
          styles.checkBoxConainer,
          props.active ? { backgroundColor: Colors.green } : null,
        ]}
      >
        {props.active ? <Images.checkmark width={13} height={13} /> : null}
      </TouchableOpacity>
      <TouchableOpacity onPress={props.onPress}>
        <Text style={styles.cancelText}>{props.title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cancelText: {
    marginLeft: 8,
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 18,
    color: Colors.black,
    opacity: 0.8,
  },
  cancelReason: {
    flexDirection: "row",
    width: "100%",
    height: 67,
    backgroundColor: Colors.white,
    alignItems: "center",
  },
  checkBoxConainer: {
    marginHorizontal: 16,
    width: 20,
    height: 20,
    borderRadius: 5,
    borderColor: Colors.divider,
    borderWidth: 1,
    backgroundColor: Colors.ash,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CancelComponent;
