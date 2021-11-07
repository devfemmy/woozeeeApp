import React from "react";
import { View, StyleSheet, Text } from "react-native";
// import { Images } from "../../assets/images";
import { Colors } from "../theme";
import TouchableOpacity from "./TouchableOpacity";

const AddressComponent = (props) => {
  const { address, message, onPress, disabled } = props;

  return (
    <View style={styles.container}>
      <View style={styles.greenCircle}>
        {/* <Images.addressCircle /> */}
      </View>
      <View style={styles.divider} />
      <View style={styles.addressContainer}>
        <TouchableOpacity onPress={onPress} disabled={disabled}>
          <Text numberOfLines={1} style={styles.addressText}>
            {message ? message : !!address ? address : "Loading..."}
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity containerStyle={styles.cancelButton}>
        {/* <Images.cancel width={10} height={10} /> */}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    height: 44,
    borderRadius: 5,
    backgroundColor: Colors.ash,
    alignItems: "center",
  },
  greenCircle: {
    width: 15,
    height: 15,
    marginLeft: 10,
  },
  divider: {
    height: 40,
    width: 1,
    marginLeft: 10,
    backgroundColor: Colors.divider,
  },
  addressContainer: {
    marginLeft: 8,
    alignSelf: "center",
    flex: 0.9,
  },
  addressText: {
    marginLeft: 8,
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 18,
    color: Colors.black,
    opacity: 0.8,
    marginTop: 2,
    fontFamily: "Montserrat-Medium",
  },
  cancelButton: {
    position: "absolute",
    right: 14,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AddressComponent;
