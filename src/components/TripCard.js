import React, { useState, forwardRef, useImperativeHandle } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Image,
  KeyboardAvoidingView,
  Platform,
  PanResponder,
  Keyboard,
  Share,
  TouchableOpacity,
} from "react-native";
import * as Linking from "expo-linking";
import { Colors } from "../theme";
// import { NavigationService } from "../navigation/navigation-service";
import LawyerDetails from "./LawyerDetails";
import ActionsComponent from "./ActionsComponent";
import LocationComponent from "./LocationComponent";
import ChatComponent from "./ChatComponent";
import { useSelector } from "react-redux";
import { useNavigation } from '@react-navigation/native';

const TripCard = forwardRef((props, ref) => {
  const [chatShown, setChatShown] = useState(false);
  const [showActions, setShowActions] = useState(true);
  const navigation = useNavigation()

  const address = useSelector((state) => state.address);
const lawyerName = useSelector((state)=> state.user.matchedTo.sName)

  const phoneNumber = "+2348080-3393";

  const toggleActions = () => {
    setShowActions(!showActions);
  };

  const showChat = () => {
    setChatShown(true);
  };

  const callLawyer = () => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const shareInformation = async () => {
    try {
      const result = await Share.share({
        message: `Hello,\n\nThis is a message from "Mr. X" informing you of a current legal case with the following details:\n\nCurrent Location: ${address.currentAddress}\nDestination: ${address.address}\n\nSincerely,\nThe "Ask a Lawyer" Team`,
        title: "Ask a Lawyer",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  useImperativeHandle(ref, () => ({
    closeChat() {
      setChatShown(false);
      setShowActions(true);
    },
  }));

  const cancelAction = () => {
    navigation.navigate("CancelTrip");
  };

  const getDirection = ({ dx, dy }) => {
    const draggedUp = dy < 0;
    const draggedDown = dy > 0;
    const draggedRight = dx > 10;

    if (chatShown) {
      if (draggedRight && dy < 20 && dy > -20) {
        setChatShown(false);
        setShowActions(true);
      } else if (draggedDown) {
        Keyboard.dismiss();
      } else {
        return false;
      }
    }

    if (draggedDown && showActions) {
      toggleActions();
    } else if (draggedUp && !showActions) {
      toggleActions();
    } else {
      return false;
    }
  };

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) =>
      !!getDirection(gestureState),
  });

  return (
    <>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS == "ios" ? "padding" : undefined}
        keyboardVerticalOffset={48}
      >
        {chatShown ? (
          <>
            <View style={{ flex: 1 }}>
              <View style={styles.infoArea} {...panResponder.panHandlers}>
                <TouchableOpacity
                  style={styles.grip}
                  onPress={() => {
                    setChatShown(false);
                    setShowActions(true);
                  }}
                />
                <View style={styles.lawyerDetails}>
                  <TouchableOpacity
                    style={styles.imageContainer}
                    onPress={() => {
                      NavigationService.navigate("Rating");
                    }}
                  >
                    <Image
                      style={styles.image}
                      source={{
                        uri: "https://picsum.photos/200",
                      }}
                    />
                    <View style={styles.status} />
                  </TouchableOpacity>
                  <Text style={styles.nameText}>Joy Nene</Text>
                </View>
              </View>
              <ChatComponent />
            </View>
          </>
        ) : (
          <Animated.View>
            <View>
              <View style={styles.infoArea} {...panResponder.panHandlers}>
                <TouchableOpacity
                  style={styles.grip}
                  onPress={() => {
                    toggleActions();
                  }}
                />
                <Text style={styles.infoText}>
                  {props.duration
                    ? `Lawyer arrives in ${Math.round(props?.duration)} mins`
                    : null}
                </Text>
              </View>
            </View>
            <View style={{ flex: 1, backgroundColor: Colors.white }}>
              <LawyerDetails
                name={lawyerName}
                rating={5.0}
                image={"https://picsum.photos/200"}
              />
              <LocationComponent location={address.address} />
              {showActions ? (
                <ActionsComponent
                  chatAction={showChat}
                  cancelAction={cancelAction}
                  callAction={callLawyer}
                  shareAction={shareInformation}
                />
              ) : null}
            </View>
          </Animated.View>
        )}
      </KeyboardAvoidingView>
    </>
  );
});

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
    flexDirection: "column",
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
    fontSize: 18,
    lineHeight: 23,
    fontWeight: "bold",
    color: Colors.white,
    marginTop: 19,
    fontFamily: 'montserrat-medium',
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
});

export default TripCard;
