import React, { useState, useRef } from "react";
import { StyleSheet, ActivityIndicator, View, Image } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import Header from "../../../../../../../components/Header";
import TripCard from "../../../../../../../components/TripCard";
import Callout from "../../../../../../../components/Callout";
import { Colors } from "../../../../../../../theme";
import MapViewDirections from "react-native-maps-directions";

import { useSelector } from "react-redux";

const Trip = (props) => {
  const location = useSelector((state) => state.auth?.user?.location?.location);
  const destination = useSelector(
    (state) => state.auth?.user?.location?.destination
  );
  const address = useSelector((state) => state.address.address);
  const currentAddress = useSelector((state) => state.address.currentAddress);

  const [duration, setDuration] = useState();

  const tripCard = useRef();

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
                longitude: location.longitude,
                latitude: location.latitude,
                latitudeDelta: 0.03,
                longitudeDelta: 0.03,
              }}
              provider={PROVIDER_GOOGLE}
              style={styles.mapView}
              rotateEnabled={false}
              onPress={() => tripCard?.current?.closeChat()}
              mapType="standard"
              showsUserLocation={true}
              followsUserLocation={true}
            >
              <MapView.Marker
                coordinate={{
                  latitude: destination.latitude,
                  longitude: destination.longitude,
                  latitudeDelta: 0.03,
                  longitudeDelta: 0.03,
                }}
              >
                <Image
                  source={require("../../../../../../../assets/images/wig.png")}
                  style={styles.image}
                />
              </MapView.Marker>
              <MapViewDirections
                apikey={"AIzaSyA5kH1HxdiF085vwaYEZ3jTMSm1CMELJfg"}
                origin={{
                  latitude: location.latitude,
                  longitude: location.longitude,
                }}
                onReady={(e) => {
                  setDuration(e.duration);
                }}
                strokeWidth={5}
                strokeColor={Colors.lightBlue}
                destination={{
                  latitude: destination.latitude,
                  longitude: destination.longitude,
                }}
              />
            </MapView>
            <View style={styles.callout}>
              {duration ? <Callout address={address} time={duration} /> : null}
            </View>
          </>
        )}
        <TripCard duration={duration} ref={tripCard} />
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
  image: {
    width: 40,
    height: 40,
  },
  callout: {
    position: "absolute",
    bottom: 360,
    left: "3%",
    width: "65%",
  },
});

export default Trip;
