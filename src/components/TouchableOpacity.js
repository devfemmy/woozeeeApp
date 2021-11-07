import React from "react";
import { TouchableOpacity as Touchable, Platform } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const MyTouchable = (props) => {
  return Platform.OS === "ios" ? (
    <TouchableOpacity {...props} />
  ) : (
    <Touchable {...{ ...props, style: props.containerStyle }} />
  );
};

export default MyTouchable;
