import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
// import { Images } from "../../assets/images";
import { Colors } from "../theme";

const LawyerDetails = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.modalView}>
        <View style={styles.textContainer}>
          <Text style={styles.lawyerLabel}>Your Lawyer is</Text>
          <Text style={styles.lawyerName}>{props.name}</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{
              uri: props.image,
            }}
          />
          <View style={styles.ratingContainer}>
            <View style={{ width: 7, height: 7 }}>
              {/* <Images.star />
               */}
               <Image source={require('../assets/images/askALawyer/star.png')} />
            </View>
            <Text style={styles.rating}>{props.rating?.toFixed(1)}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 108,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
    justifyContent: "center",
  },
  modalView: {
    flexDirection: "row",
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.white,
    width: "100%",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  textContainer: {
    height: 35,
    flexDirection: "column",
  },
  lawyerLabel: {
    fontSize: 12,
    lineHeight: 15,
    fontWeight: "500",
    opacity: 0.8,
    color: Colors.black,
  },
  lawyerName: {
    fontSize: 18,
    lineHeight: 23,
    fontWeight: "700",
    opacity: 0.8,
    fontFamily: 'montserrat-medium',
    color: Colors.black,
  },
  imageContainer: {
    height: 70,
    width: 70,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 70,
    backgroundColor: Colors.divider,
  },
  ratingContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
    backgroundColor: Colors.green,
    alignItems: "center",
    justifyContent: "center",
    width: 53,
    height: 18,
    borderRadius: 10,
  },
  rating: {
    fontSize: 13,
    fontWeight: "700",
    color: Colors.white,
    fontFamily: 'montserrat-medium',
  },
});

export default LawyerDetails;
