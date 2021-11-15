import React, { useState, useEffect } from "react";
import { StyleSheet, View, ActivityIndicator, Platform, Image } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import Header from "../../../../../../../components/Header";
import SetTripCard from "../../../../../../../components/SetTripCard";
import Geocoder from "react-native-geocoding";
// import { Images } from "../../assets/images";
import { Colors } from "../../../../../../../theme";
import { useSelector, useDispatch } from "react-redux";
import { setAddress } from "../../../../../../../redux/actions/address";

const SetMapLocation = (props) => {
  const location = useSelector((state) => state.address.currentCoordinates);
  const address = useSelector((state) => state.address.address);
  const coordinates = useSelector((state) => state.address.coordinates);
  const currentAddress = useSelector((state) => state.address.currentAddress);

  const dispatch = useDispatch();

  const fromAutocomplete = props.route?.params?.fromAutocomplete;

  const [region, setRegion] = useState(
    fromAutocomplete ? coordinates?.coords : location.coords
  );

  const onRegionChange = async (region) => {
    setRegion(region);
    Geocoder.from(region.latitude, region.longitude)
      .then((json) => {
        let addressComponent = json.results[0].formatted_address;
        dispatch(setAddress(addressComponent));
      })
      .catch((error) => console.warn(error));
  };

  return (
    <>
      <View style={styles.container}>
        <Header address={currentAddress} navigation={props.navigation} />
        {!location ? (
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <ActivityIndicator size={"large"} color={Colors.green} />
          </View>
        ) : (
          <>
            <MapView
              initialRegion={{
                longitude: fromAutocomplete
                  ? coordinates.coords.longitude
                  : location.coords.longitude,
                latitude: fromAutocomplete
                  ? coordinates.coords.latitude
                  : location.coords.latitude,
                latitudeDelta: 0.003,
                longitudeDelta: 0.003,
              }}
              provider={PROVIDER_GOOGLE}
              style={styles.mapView}
              onRegionChangeComplete={(region) => {
                onRegionChange(region);
              }}
              rotateEnabled={false}
              mapType="standard"
              showsUserLocation={true}
              followsUserLocation={true}
              scrollEnabled={true}
            />
            <View style={styles.marker}>
              {/* <Images.markerPin width={40} height={40} /> */}
              <Image 
              style={{width: 40, height: 40, resizeMode: 'contain'}}
              source={require('../../../../../../../assets/images/askALawyer/marker_pin.png')} />
            </View>
          </>
        )}
        <SetTripCard address={address} region={region} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  mapView: {
    position: "absolute",
    zIndex: -1,
    width: "100%",
    height: "100%",
  },
  marker: {
    left: Platform.OS !== "ios" ? "44.5%" : "45%",
    position: "absolute",
    top: Platform.OS !== "ios" ? "44%" : "45.5%",
  },
});

export default SetMapLocation;
