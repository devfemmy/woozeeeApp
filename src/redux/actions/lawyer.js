export const SET_ONLINE_STATUS = "SET_ONLINE_STATUS";
export const GET_AVAILABLE_CLIENTS = "GET_AVAILABLE_CLIENTS";
export const SET_MATCHED_CLIENT = "SET_MATCHED_CLIENT";

import firestore from "@react-native-firebase/firestore";

import { getUserDetails } from "./auth";

export const setOnlineStatus = (status) => {
  return async (dispatch, getState) => {
    const userID = getState().auth.user?._id;

    await firestore().collection("Users").doc(userID).update({
      isVisible: !status,
    });

    dispatch(getUserDetails(getState().auth.user.email));
    dispatch(getAvailableClients());
  };
};

export const setLawyerLocation = () => {
  return async (dispatch, getState) => {
    const userID = getState().auth.user?._id;
    const currentLocation = getState().address?.currentCoordinates;

    const location = new firestore.GeoPoint(
      currentLocation.coords.latitude,
      currentLocation.coords.longitude
    );

    await firestore().collection("Users").doc(userID).update({
      "location.location": location,
    });

    dispatch(getUserDetails(getState().auth.user.email));
  };
};

export const getAvailableClients = () => {
  return async (dispatch, getState) => {
    const userID = getState().auth.user?._id;

    const availableClients = [];

    await firestore()
      .collection("Users")
      .where("role", "==", "user")
      .where("isVisible", "==", true)
      .where("matchedTo", "==", "")
      .get()
      .then((querySnapshot) => {
        console.log("Total users to pick up: ", querySnapshot.size);

        querySnapshot.forEach((documentSnapshot) => {
          console.log(
            "User ID for client to be picked: ",
            documentSnapshot.id,
            documentSnapshot.data()
          );

          const user = { _id: documentSnapshot.id, ...documentSnapshot.data() };
          availableClients.push(user);
        });
      });

    await dispatch({
      type: GET_AVAILABLE_CLIENTS,
      payload: { clients: availableClients },
    });
  };
};

export const acceptRequest = (client) => {
  return async (dispatch, getState) => {
    const userID = getState().auth.user?._id;

    await firestore().collection("Users").doc(userID).update({
      matchedTo: client?._id,
    });

    await firestore().collection("Users").doc(client?._id).update({
      matchedTo: userID,
    });

    dispatch(getUserDetails(getState().auth.user.email));
    await dispatch({ type: SET_MATCHED_CLIENT, payload: { client: client } });
  };
};

export const ignoreRequest = () => {
  return async (dispatch, getState) => {
    const clients = getState().lawyer.availableClients;

    clients.shift();
    await dispatch({
      type: GET_AVAILABLE_CLIENTS,
      payload: { clients: clients },
    });
  };
};
