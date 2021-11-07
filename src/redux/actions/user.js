export const GET_LAWYER_DETAILS = "GET_LAWYER_DETAILS";
export const GET_AVAILABLE_LAWYERS = "GET_AVAILABLE_LAWYERS";

import firestore from "@react-native-firebase/firestore";

import { getUserDetails } from "./auth";

export const setUserToOnline = () => {
  return async (dispatch, getState) => {
    const userID = getState().auth.user?._id;

    await firestore().collection("Users").doc(userID).update({
      isVisible: true,
    });

    dispatch(getUserDetails(getState().auth.user.email));
  };
};

export const setUserToOffline = () => {
  return async (dispatch, getState) => {
    const userID = getState().auth.user?._id;

    await firestore().collection("Users").doc(userID).update({
      isVisible: false,
    });

    dispatch(getUserDetails(getState().auth.user.email));
  };
};

export const setUserLocation = (destination) => {
  return async (dispatch, getState) => {
    const userID = getState().auth.user?._id;
    const currentLocation = getState().address?.currentCoordinates;

    const location = {
      destination: new firestore.GeoPoint(
        destination.latitude,
        destination.longitude
      ),
      location: new firestore.GeoPoint(
        currentLocation.coords.latitude,
        currentLocation.coords.longitude
      ),
    };

    await firestore().collection("Users").doc(userID).update({
      location: location,
      isVisible: true,
    });

    dispatch(getUserDetails(getState().auth.user.email));
  };
};

export const getLawyerDetails = () => {
  return async (dispatch, getState) => {
    const lawyerID = getState().auth.user?.matchedTo;

    let lawyer;

    await firestore()
      .collection("Users")
      .doc(lawyerID)
      .onSnapshot((documentSnapshot) => {
        console.log("User ID: ", documentSnapshot.id, documentSnapshot.data());
        lawyer = { _id: documentSnapshot.id, ...documentSnapshot.data() };
      });

    await dispatch({ type: GET_LAWYER_DETAILS, payload: { lawyer: lawyer } });
  };
};

export const getAvailableLawyers = () => {
  return async (dispatch, getState) => {
    const userID = getState().auth.user?._id;

    const availableLawyers = [];

    await firestore()
      .collection("Users")
      .where("role", "==", "lawyer")
      .where("isVisible", "==", true)
      .where("matchedTo", "==", "")
      .get()
      .then((querySnapshot) => {
        console.log("Total lawyers: ", querySnapshot.size);

        querySnapshot.forEach((documentSnapshot) => {
          console.log(
            "User ID for lawyer",
            documentSnapshot.id,
            documentSnapshot.data()
          );

          const user = { _id: documentSnapshot.id, ...documentSnapshot.data() };
          availableLawyers.push(user);
        });
      });

    await dispatch({
      type: GET_AVAILABLE_LAWYERS,
      payload: { lawyers: availableLawyers },
    });
  };
};
