import React from "react";
import { View, TouchableOpacity as Touchable, Platform } from "react-native";
// import { Images } from "../../assets/images";
import TouchableOpacity from "./TouchableOpacity";

const CloseButton = (props) => {
  const { onPress } = props;

  const Touches = Platform.OS === "ios" ? TouchableOpacity : Touchable;

  return (
    <Touches
      onPress={() => onPress && onPress()}
      containerStyle={{
        width: 24,
        height: 24,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          width: 12,
          height: 12,
        }}
      >
        {/* <Images.cancel /> */}
      </View>
    </Touches>
  );
};

export default CloseButton;
