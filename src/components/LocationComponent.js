import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
// import { Images } from "../../assets/images";
import { Colors } from "../theme";
import EditButton from "./EditButton";
// import { NavigationService } from "../navigation/navigation-service";
import TouchableOpacity from "./TouchableOpacity";
import { useNavigation } from '@react-navigation/native';

const LocationComponent = (props) => {
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <View style={styles.modalView}>
        <View style={styles.pinAndLocation}>
          <View style={styles.pin}>
            <Image source={require('../assets/images/askALawyer/location_icon.png')} />
            {/* <Images.pin width={12} height={19} /> */}
          </View>
          <TouchableOpacity
            onPress={() => {
              NavigationService.navigate("SetLocation");
            }}
            containerStyle={styles.locationContainer}
          >
            <Text numberOfLines={1} style={styles.location}>
              {!!props.location ? props.location : "Loading..."}
            </Text>
            <Text style={styles.locationLabel}>Change address</Text>
          </TouchableOpacity>
        </View>
        <EditButton
          onPress={() => {
            navigation.navigate("SetLocation");
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 75,
    justifyContent: "center",
  },
  modalView: {
    flexDirection: "row",
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  locationContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  location: {
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 18,
    fontFamily: 'montserrat-medium',
    color: Colors.black,
  },
  locationLabel: {
    fontSize: 12,
    lineHeight: 15.26,
    fontWeight: "400",
    color: Colors.black,
  },
  pinAndLocation: {
    flexDirection: "row",
    alignItems: "center",
    width: "86%",
  },
  pin: {
    marginRight: 13,
  },
});

export default LocationComponent;
