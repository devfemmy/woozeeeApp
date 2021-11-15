import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import Header from "../../../../../../../components/ModalHeader";
import HistoryComponent from "../../../../../../../components/HistoryComponent";
import { Colors } from "../../../../../../../theme";

const ClientHistory = (props) => {
  return (
    <View style={styles.container}>
      <Header title={"Your cases"} />
      <ScrollView style={styles.contentContainer}>
        <HistoryComponent
          title={"State Criminal Investigation Department"}
          cancelled
        />
        <HistoryComponent title={"State Criminal Investigation Department"} />
        <HistoryComponent title={"State Criminal Investigation Department"} />
        <HistoryComponent
          title={"State Criminal Investigation Department"}
          cancelled
        />
        <HistoryComponent title={"State Criminal Investigation Department"} />
        <HistoryComponent title={"State Criminal Investigation Department"} />
        <HistoryComponent
          title={"State Criminal Investigation Department"}
          cancelled
        />
        <HistoryComponent title={"State Criminal Investigation Department"} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  contentContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: Colors.gray,
    flexDirection: "column",
    paddingTop: 19,
  },
  subheading: {
    fontWeight: "400",
    fontSize: 12,
    marginTop: 16,
    marginBottom: 5,
    marginLeft: 17,
    // fontFamily: "GoogleSans-Medium",
    color: Colors.black,
  },
  caseSummaryContainer: {
    flexDirection: "row",
    width: "100%",
    height: 53,
    backgroundColor: Colors.white,
    borderTopColor: Colors.divider,
    borderTopWidth: 1,
    paddingLeft: 17,
    paddingTop: 8,
  },
  caseSummaryTextContainer: {
    flexDirection: "column",
    marginLeft: 12,
    marginTop: 5,
  },
  caseSummaryText: {
    fontSize: 12,
    fontWeight: "500",
    color: Colors.black,
  },
  addressText: {
    fontSize: 12,
    fontWeight: "500",
    paddingTop: 8,
    // fontFamily: "GoogleSans-Medium",
    color: Colors.black,
  },
  mapContainer: {
    width: "100%",
    height: 85,
  },
  addressContainer: {
    height: 33,
    width: "100%",
    paddingLeft: 18,
    flexDirection: "row",
  },
  divider: {
    width: "100%",
    height: 0,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 40,
    backgroundColor: Colors.divider,
  },
});

export default ClientHistory;
