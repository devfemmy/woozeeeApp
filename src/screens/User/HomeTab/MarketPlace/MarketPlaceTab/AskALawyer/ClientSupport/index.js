import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import Header from "../../../../../../../components/ModalHeader";
import SupportComponent from "../../../../../../../components/SupportComponent";
import { Colors } from "../../../../../../../theme";
// import { NavigationService } from "../navigation/navigation-service";
import moment from "moment";

const ClientSupport = (props) => {
  const navigateToCaseDetails = () => {
    props.navigation.navigate("CaseDetails");
  };

  return (
    <View style={styles.container}>
      <Header title={"Support"} />
      <View style={styles.contentContainer}>
        <Text style={styles.subheading1}>Your last case</Text>
        <View style={styles.caseSummaryContainer}>
          <Image
            style={styles.image}
            source={{
              uri: "https://picsum.photos/200",
            }}
          />
          <View style={styles.caseSummaryTextContainer}>
            <Text
              style={{
                ...styles.caseSummaryText,
                // fontFamily: "GoogleSans-Medium",
              }}
            >
              Case handled by {"John"}
            </Text>
            <Text style={styles.caseSummaryText}>
              {moment().format("DD/MM/YYYY, HH:mm")}
            </Text>
          </View>
        </View>
        <SupportComponent
          title={"Issue with the recent Lawyer"}
          onPress={navigateToCaseDetails}
        />
        <SupportComponent title={"Issue with the another Lawyer"} />
        <Text style={styles.subheading2}>FAQ</Text>
        <SupportComponent title={"Using Ask a Lawyer"} />
        <SupportComponent title={"Payment and pricing"} />
        <SupportComponent title={"About Ask a Lawyer"} />
        <SupportComponent title={"App and features"} />
      </View>
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
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  subheading1: {
    fontWeight: "400",
    fontSize: 12,
    marginTop: 12,
    marginBottom: 9,
    marginLeft: 17,
    // fontFamily: "GoogleSans-Medium",
    color: Colors.black,
  },
  subheading2: {
    fontWeight: "500",
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
  mapContainer: {
    width: "100%",
    height: 85,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 40,
    backgroundColor: Colors.divider,
  },
});

export default ClientSupport;
