import React, { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Header from "../../../../../../../components/ModalHeader";
import AddressComponent from "../../../../../../../components/AddressComponent";
import { Colors } from "../../../../../../../theme";
// import { Images } from "../../assets/images";
import { TouchableOpacity } from "react-native-gesture-handler";
// import { NavigationService } from "../navigation/navigation-service";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useSelector, useDispatch } from "react-redux";
import { setAddress, setCoordinates } from "../../../../../../../redux/actions/address";
import PlaceRow from "../../../../../../../components/PlaceRow";

const autoCompleteStyle = {
  separator: {
    height: 4,
    width: "100%",
    backgroundColor: Colors.ash,
  },
  container: {
    position: "absolute",
    top: 10,
    left: 10,
    right: 10,
  },
  textInputContainer: {
    flexDirection: "row",
    width: "100%",
    height: 44,
    borderRadius: 5,
    backgroundColor: Colors.ash,
    alignItems: "center",
  },
  textInput: {
    flexDirection: "row",
    width: "100%",
    height: 44,
    borderRadius: 5,
    backgroundColor: Colors.ash,
    alignItems: "center",
    paddingHorizontal: 10,
  },
};

const SetLocation = (props) => {
  const [isTyping, setIsTyping] = useState(false);
  const address = useSelector((state) => state.address.address);

  const GOOGLE_PLACES_API_KEY = "AIzaSyA5kH1HxdiF085vwaYEZ3jTMSm1CMELJfg";

  const dispatch = useDispatch();


  const RNAutocomplete = () => {
    return (
      <View style={{ width: "100%", height: isTyping ? "100%" : 45 }}>
        <GooglePlacesAutocomplete
          placeholder="Search"
          fetchDetails
          currentLocation
          suppressDefaultStyles
          enablePoweredByContainer={false}
          renderHeaderComponent={() => (
            <>
              <View style={styles.divider} />
              <TouchableOpacity
                onPress={navigateToMap}
                style={styles.locationComponent}
              >
                <View style={{ marginRight: 8, marginLeft: 17 }}>
                <Image source={require('../../../../../../../assets/images/askALawyer/location_icon.png')} />
                  {/* <Images.pin width={24} height={24} /> */}
                </View>
                <View>
                  <Text style={styles.addressText}>
                    Set Location on the map
                  </Text>
                </View>
              </TouchableOpacity>
            </>
          )}
          styles={autoCompleteStyle}
          onPress={(data, details) => {
            // 'details' is provided when fetchDetails = true
            dispatch(setAddress(details?.formatted_address));
            dispatch(
              setCoordinates({
                coords: {
                  longitude: details.geometry.location.lng,
                  latitude: details.geometry.location.lat,
                  longitudeDelta: 0,
                  latitudeDelta: 0,
                },
              })
            );
            props.navigation.navigate("SetMapLocation", {
              fromAutocomplete: true,
            });
            setIsTyping(false);
          }}
          query={{
            key: GOOGLE_PLACES_API_KEY,
            language: "en",
            components: "country:ng",
          }}
          renderRow={(data) => <PlaceRow data={data} />}
          onFail={(error) => console.error(error)}
        />
      </View>
    );
  };

  const navigateToMap = () => {
    props.navigation.navigate("SetMapLocation");
  };

  return (
    <View style={styles.container}>
      <Header title={"Set Location"} />
      {isTyping ? (
        <RNAutocomplete />
      ) : (
        <View style={styles.addressComponent}>
          <AddressComponent
            address={address}
            onPress={() => setIsTyping(true)}
          />
        </View>
      )}
      <View style={styles.divider} />
      <TouchableOpacity
        onPress={navigateToMap}
        style={styles.locationComponent}
      >
        <View style={{ marginHorizontal: 23 }}>
        <Image source={require('../../../../../../../assets/images/askALawyer/location_icon.png')} />
          {/* <Images.pin width={24} height={24} /> */}
        </View>
        <View>
          <Text style={styles.addressText}>Set Location on the map</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  divider: {
    width: "100%",
    height: 9,
    backgroundColor: Colors.ash,
  },
  addressComponent: {
    width: "100%",
    paddingHorizontal: 17,
    height: 90,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 9,
  },
  addressText: {
    marginLeft: 8,
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 18,
    color: Colors.black,
    opacity: 0.8,
  },
  locationComponent: {
    flexDirection: "row",
    width: "100%",
    height: 67,
    backgroundColor: Colors.white,
    alignItems: "center",
    borderBottomWidth: 4,
    borderBottomColor: Colors.ash,
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

export default SetLocation;
