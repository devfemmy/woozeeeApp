import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Colors } from "../theme";

const Callout = (props) => {
  const { address, time } = props;

  return (
    <View style={styles.container}>
      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>{Math.round(time)}</Text>
        <Text style={styles.unitText}>min</Text>
      </View>
      <Text numberOfLines={1} style={styles.addressText}>
        {!!address ? address : "Loading..."}
      </Text>
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
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  timeContainer: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.green,
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5,
  },
  timeText: {
    fontWeight: "500",
    fontSize: 18,
    color: Colors.white,
  },
  unitText: {
    fontWeight: "500",
    fontSize: 14,
    color: Colors.white,
  },
  addressText: {
    marginLeft: 5,
    fontWeight: "500",
    flex: 1,
    fontSize: 14,
    lineHeight: 18,
    color: Colors.black,
    opacity: 0.6,
    textAlign: "center",
  },
});

export default Callout;
