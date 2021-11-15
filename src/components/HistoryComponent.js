import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { Colors } from "../theme";
// import { Images } from "../../assets/images";
import moment from "moment";

const HistoryComponent = (props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
      <View style={styles.summaryContainer}>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.summaryDate}>
          {moment().format("DD/MM/YYYY, HH:mm")}
        </Text>
        <Text
          style={[
            styles.caseStatus,
            { color: props.cancelled ? Colors.statusred : Colors.statusgreen },
          ]}
        >
          {props.cancelled ? "CANCELLED" : "CASE HANDLED"}
        </Text>
      </View>
      <View style={styles.chevron}>
        {/* <Images.chevron /> */}
      </View>
    </TouchableOpacity>
  );
};

export default HistoryComponent;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    height: 82,
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 18,
    paddingRight: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
    marginBottom: 11,
    borderTopWidth: 1,
    borderTopColor: Colors.divider,
  },
  summaryContainer: {
    height: 60,
    justifyContent: "space-between",
  },
  caseStatus: {
    fontSize: 12,
    fontWeight: "500",
    fontFamily: 'montserrat-medium',
    color: Colors.black,
  },
  summaryDate: {
    fontSize: 12,
    fontWeight: "500",
    color: Colors.black,
  },
  title: {
    fontSize: 12,
    fontWeight: "500",
    fontFamily: 'montserrat-medium',
    color: Colors.black,
  },
  chevron: {
    flexDirection: "row",
    alignItems: "center",
    width: 16,
    height: 16,
  },
});
