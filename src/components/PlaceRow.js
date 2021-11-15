import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
// import { Images } from "../../assets/images";
import { Colors } from "../theme";

const PlaceRow = ({ data }) => {
  return (
    <View style={styles.row}>
      <View style={styles.iconContainer}>
        {/* <Images.locationPin /> */}
        <Image source={require('../assets/images/askALawyer/map-pin.png')} />
      </View>
      <Text numberOfLines={2} ellipsizeMode="tail" style={styles.locationText}>
        {data.description || data.vicinity}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
    width: "100%",
    height: 67,
  },
  iconContainer: {
    width: 15,
    height: 15,
    marginHorizontal: 23,
  },
  locationText: {
    fontWeight: "500",
    fontSize: 14,
    width: 0,
    flexGrow: 1,
    flex: 1,
    color: Colors.black,
  },
  circle: {
    width: 5,
    height: 5,
    backgroundColor: "black",
    position: "absolute",
    top: 20,
    left: 15,
    borderRadius: 5,
  },
  line: {
    width: 1,
    height: 50,
    backgroundColor: "#c4c4c4",
    position: "absolute",
    top: 28,
    left: 17,
  },
  square: {
    width: 5,
    height: 5,
    backgroundColor: "black",
    position: "absolute",
    top: 80,
    left: 15,
  },
});

export default PlaceRow;
