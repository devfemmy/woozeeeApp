import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import Header from "../../../../../../../components/ModalHeader";
import SupportComponent from "../../../../../../../components/SupportComponent";
import { Colors } from "../../../../../../../theme";
// import { Images } from "../../assets/images";
import moment from "moment";

const CaseDetails = (props) => {
  return (
    <View style={styles.container}>
      <Header title={"Case Details"} />
      <View style={styles.contentContainer}>
        <View style={styles.addressContainer}>
          <View style={{ marginTop: 8, marginRight: 17 }}>
            {/* <Images.greenLinedAddressIndicator width={18} height={25} /> */}
            <Image style={{width: 24, height: 24, resizeMode: 'contain'}} source= {require('../../../../../../../assets/images/askALawyer/marker_pin.png')} />
          </View>
          <Text style={styles.addressText}>60 Landbridge Avenue, Oniru</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.addressContainer}>
          <View style={{ marginRight: 17 }}>
            {/* <Images.redLinedAddressIndicator width={18} height={25} /> */}
            <Image style={{width: 24, height: 24, resizeMode: 'contain'}} source= {require('../../../../../../../assets/images/askALawyer/location_icon.png')} />
          </View>
          <Text style={styles.addressText}>
            State Criminal Investigation Department
          </Text>
        </View>
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
        <Text style={styles.subheading}>Need Help?</Text>
        <SupportComponent title={"Resend Receipt"} />
        <SupportComponent title={"Case not solved"} />
        <SupportComponent title={"Lawyer did not show up"} />
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

export default CaseDetails;
