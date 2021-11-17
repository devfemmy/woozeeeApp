import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Colors } from "../theme";
import AddressComponent from "./AddressComponent";
import Button from "./Button";
import Modal from "./IntroModal";
import * as Progress from "react-native-progress";
// import { NavigationService } from "../navigation/navigation-service";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { setAddress, setCoordinates } from "../redux/actions/address";
import { setUserLocation, setUserToOnline } from "../redux/actions/user";
import { getUserDetails } from "../redux/actions/auth";
// import * as firebase from 'firebase';

import firebase from '../services/Firebase/firebaseConfig'
import firestore from "@react-native-firebase/firestore";
import { useNavigation } from '@react-navigation/native';

const SetTripCard = (props) => {
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisble] = useState(false);
  const { address, region } = props;
  const userId = useSelector((state) => state.auth?.user?._id);
  const email = useSelector((state) => state.auth?.user?.email);
  const matchedTo = useSelector((state) => state.auth?.user?.matchedTo);
  const navigation = useNavigation()

  const dispatch = useDispatch();

  useEffect(() => {
    // const firebaseConfig = {
    //   apiKey: 'AIzaSyARWCPqpauNDiveSI26tvmKsyn4p_XNzh8',
    //   authDomain: 'woozeee-d7f6c.firebaseapp.com',
    //   databaseURL: 'https://woozeee-d7f6c.firebaseio.com',
    //   projectId: 'woozeee-d7f6c',
    //   storageBucket: 'woozeee-d7f6c.appspot.com',
    //   messagingSenderId: '979696525592',
    //   appId: '1:979696525592:web:ec27a203184d23e0dcfe6d',
    //   measurementId: 'G-XQKMT94R9R',
    // };
  
    // if (!firebase.apps.length) {
    //   console.log("initialize")
    //   firebase.initializeApp(firebaseConfig);
    // }else {
    //   return
    // }
    const subscriber = firebase.firestore()
      .collection("users")
      .doc(userId)
      .onSnapshot((documentSnapshot) => {
        console.log(documentSnapshot, "documentSnapshot")
        console.log("User data: ", documentSnapshot.data());
        dispatch(getUserDetails(email));
      });
    if (!!matchedTo) {
      navigateToTrip();
    }
    // Stop listening for updates when no longer required
    return () => subscriber();
  }, [matchedTo]);

  const confirmationHandler = () => {
    setLoading(true);
    dispatch(setUserToOnline());
    dispatch(setCoordinates({ coords: region }));
    dispatch(
      setUserLocation({
        longitude: region?.longitude,
        latitude: region?.latitude,
      })
    );
  };

  const navigateToTrip = async () => {
    navigation.navigate("Trip");
  };

  const setAddressHandler = () => {
    console.log("initialize")
    dispatch(setAddress(address));
    navigation.navigate("SetLocation");
  };

  const modalHandler = () => {
    setModalVisble(true);
  };

  const cancelHandler = () => {
    setModalVisble(false);
    // alert('Cancelling')
    navigation.navigate("AskALawyerHome");
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.requestText}>Requesting a Lawyer...</Text>
          <View>
            <Progress.Circle
              size={85}
              indeterminate={true}
              thickness={10}
              strokeCap={"square"}
              color={Colors.green}
            />
            <Image
              source={require("../assets/images/wig.png")}
              style={{ position: "absolute", top: 20, left: 18 }}
            />
          </View>
          <TouchableOpacity onPress={modalHandler}>
            <Text style={styles.cancelText}>Cancel Request</Text>
          </TouchableOpacity>
          <Modal
            isOpen={modalVisible}
            closeModal={modalHandler}
            cancel={cancelHandler}
          />
        </View>
      ) : props.home ? (
        <>
          <View>
            <View style={styles.infoArea}>
              <Text style={styles.infoText}>Welcome!</Text>
            </View>
          </View>
          <View
            style={{
              backgroundColor: Colors.white,
              height: 169,
              paddingHorizontal: 23,
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <AddressComponent
              message={"Where do you need a Lawyer?"}
              onPress={setAddressHandler}
            />
          </View>
        </>
      ) : (
        <>
          <View>
            <View style={styles.infoArea}>
              <Text style={styles.infoText}>Confirm Lawyer Meet</Text>
            </View>
          </View>
          <View
            style={{
              backgroundColor: Colors.white,
              height: 169,
              paddingHorizontal: 23,
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <AddressComponent address={address} onPress={setAddressHandler} />
            <Button title={"Confirm Location"} onPress={confirmationHandler} />
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  infoArea: {
    height: 69,
    backgroundColor: Colors.darkBlue,
    width: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  grip: {
    width: 60,
    height: 4,
    borderRadius: 10,
    backgroundColor: Colors.white,
    opacity: 0.5,
    marginTop: 10,
  },
  infoText: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "500",
    color: Colors.white,
  },
  gripArea: {
    width: 100,
    height: 8,
  },
  lawyerDetails: {
    alignSelf: "flex-start",
    marginTop: 10,
    alignItems: "center",
    flexDirection: "row",
  },
  imageContainer: {
    width: 38.89,
    height: 38.89,
  },
  image: {
    width: 38.89,
    height: 38.89,
    borderRadius: 38.89,
    backgroundColor: Colors.divider,
    marginRight: 8,
  },
  nameText: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "700",
    color: Colors.white,
    marginLeft: 7,
    fontFamily: 'montserrat-medium',
  },
  status: {
    position: "absolute",
    bottom: 0,
    right: 2,
    height: 8,
    width: 8,
    borderRadius: 8,
    backgroundColor: Colors.green,
  },
  loadingContainer: {
    height: 240,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: Colors.white,
  },
  requestText: {
    fontSize: 18,
    fontWeight: "700",
    lineHeight: 23,
    fontFamily: 'montserrat-medium',
    color: Colors.black,
  },
  cancelText: {
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 18,
    color: Colors.pink,
  },
});

export default SetTripCard;
