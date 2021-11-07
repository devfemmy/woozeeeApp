import React, { useState, useEffect } from "react";
import { StyleSheet, View, ActivityIndicator, Image } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import Modal from "../../../../../../../components/IntroModal";
import Header from "../../../../../../../components/Header";
import SetTripCard from "../../../../../../../components/SetTripCard";
import { getLocation } from "../../../../../../../redux/actions/address";
import { Colors } from "../../../../../../../theme";

import { useDispatch, useSelector } from "react-redux";
import { getAvailableLawyers } from "../../../../../../../redux/actions/user";

const AskALawyerHome = (props) => {
  const [proceeded, setProceeded] = useState(true);
  const location = useSelector((state) => state.address.currentCoordinates);
  const address = useSelector((state) => state.address.address);
  const currentAddress = useSelector((state) => state.address.currentAddress);
  const availableLawyers = useSelector((state) => state.user.availableLawyers);

  const [errorMsg, setErrorMsg] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(getLocation());
      await dispatch(getAvailableLawyers());
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  const closeModal = () => {
    setProceeded(false);
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
          <MapView
            initialRegion={{
              longitude: location.coords.longitude,
              latitude: location.coords.latitude,
              latitudeDelta: 0.03,
              longitudeDelta: 0.03,
            }}
            provider={PROVIDER_GOOGLE}
            style={styles.mapView}
            //onLayout={() => this.onMapLayout()}
            rotateEnabled={false}
            mapType="standard"
            showsUserLocation={true}
            followsUserLocation={true}
            scrollEnabled={true}
          >
            {availableLawyers.map((item, index) => (
              <MapView.Marker
                tracksViewChanges={true}
                key={`key_${item.location.location._longitude}_${item.location.location._latitude}_${index}`}
                coordinate={{
                  latitude: item.location.location._latitude,
                  longitude: item.location.location._longitude,
                  latitudeDelta: 0.03,
                  longitudeDelta: 0.03,
                }}
              >
                <Image
                  source={require("../../../../../../../assets/images/wig.png")}
                  style={styles.image}
                />
              </MapView.Marker>
            ))}
          </MapView>
        )}
        <SetTripCard address={address} home />
      </View>
      <Modal isOpen={proceeded} closeModal={closeModal} />
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
});

export default AskALawyerHome;
