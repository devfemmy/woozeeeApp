export const SET_USER_ADDRESS = "SET_USER_ADDRESS";
export const SET_USER_COORDINATES = "SET_USER_COORDINATES";
export const FETCH_USER_LOCATION = "FETCH_USER_LOCATION";

import Geolocation from 'react-native-geolocation-service';
import Geocoder from "react-native-geocoding";
import { StatusBar } from "react-native";


export const getLocation = () => {
  return async (dispatch, getState) => {
    // let { status } = await Location.requestForegroundPermissionsAsync();;
    const status = await Geolocation.requestAuthorization('whenInUse');
    console.log("check if code runs", status)
    // let status = 'granted';
    if (status === "granted") {
      Geolocation.getCurrentPosition(
        async (coordinates) => {
          if (
            getState().coordinates?.coords.longitude != coordinates.coords.longitude
          ) {
            await Geocoder.from(
              coordinates.coords.latitude,
              coordinates.coords.longitude
            )
              .then((json) => {
                let addressComponent = json.results[0].formatted_address;
                address = addressComponent;
              })
              .catch((error) => console.warn(error));
    
            await dispatch({
              type: FETCH_USER_LOCATION,
              payload: { address: address, currentCoordinates: coordinates },
            });
          }
        },
        (error) => {
          // See error code charts below.
          console.log(error.code, error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );

    }
  };
};

export const setAddress = (address) => {
  return { type: SET_USER_ADDRESS, payload: { address: address } };
};

export const setCoordinates = (coordinates) => {
  return { type: SET_USER_COORDINATES, payload: { coordinates: coordinates } };
};
