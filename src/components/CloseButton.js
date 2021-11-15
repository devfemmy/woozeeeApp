import React from "react";
import { View, TouchableOpacity as Touchable, Platform, Image } from "react-native";
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
        <Image source={require('../assets/images/askALawyer/clear.png')}/>
        {/* <Images.cancel /> */}
      </View>
    </Touches>
  );
};

export default CloseButton;
