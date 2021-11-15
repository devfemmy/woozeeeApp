import React from "react";
import { Image, View } from "react-native";
// import { Images } from "../../assets/images";
import TouchableOpacity from "./TouchableOpacity";

const BacKButton = (props) => {
  const { onPress } = props;
  return (
    <TouchableOpacity
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
          width: 14,
          height: 14,
        }}
      >
        <Image source={require('../assets/images/askALawyer/arrow-left.png')}  />
        {/* <Images.backButton /> */}
      </View>
    </TouchableOpacity>
  );
};

export default BacKButton;
