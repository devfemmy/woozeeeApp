export const GET_USER_DETAILS = "GET_USER_DETAILS";
export const LOGOUT = "LOGOUT";

import firestore from "@react-native-firebase/firestore";

export const getUserDetails = (email) => {
  return async (dispatch, getState) => {
    let user;

    await firestore()
      .collection("Users")
      .where("email", "==", email)
      .get()
      .then((querySnapshot) => {
        console.log("Total users: ", querySnapshot.size);

        querySnapshot.forEach((documentSnapshot) => {
          console.log(
            "User ID: ",
            documentSnapshot.id,
            documentSnapshot.data()
          );
          user = { _id: documentSnapshot.id, ...documentSnapshot.data() };
        });
      });
    await dispatch({ type: GET_USER_DETAILS, payload: { user: user } });
  };
};

export const endTrip = () => {
  return async (dispatch, getState) => {
    const userID = getState().auth.user?._id;

    await firestore().collection("Users").doc(userID).update({
      matchedTo: "",
    });

    dispatch(getUserDetails(getState().auth.user.email));
  };
};

export const logout = () => {
  return async (dispatch, getState) => {
    const userID = getState().auth.user?._id;

    await firestore().collection("Users").doc(userID).update({
      isVisible: false,
      matchedTo: "",
    });

    dispatch(getUserDetails(getState().auth.user.email));
    await dispatch({ type: LOGOUT });
  };
};
