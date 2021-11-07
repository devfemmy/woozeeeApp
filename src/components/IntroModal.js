import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity as Touchable,
  Platform,
} from "react-native";
import * as WebBrowser from "expo-web-browser";
import { Colors } from "../theme";
import Button from "./Button";
import CloseButton from "./CloseButton";
// import { Images } from "../../assets/images";
import LogoIcon from '../assets/images/lawhandler.svg';
import TouchableOpacity from "./TouchableOpacity";

const ModalComponent = (props) => {
  const viewConstitution = () => {
    WebBrowser.openBrowserAsync(
      "http://www.nigeria-law.org/ConstitutionOfTheFederalRepublicOfNigeria.htm"
    );
  };

  const Touches = Platform.OS === "ios" ? TouchableOpacity : Touchable;

  return (
    <Modal visible={props.isOpen} animationType="slide" transparent={true}>
      <View style={styles.container}>
        <Touches onPress={props.closeModal} containerStyle={styles.blurView} />
        <View style={styles.modalContainer}>
          <View style={styles.closeButton}>
            <CloseButton onPress={props.closeModal} />
          </View>
          {props.cancel ? (
            <>
              <Text style={styles.cancelText}>
                Are you sure you want {`\n`} to Cancel
              </Text>
              <Button
                title={"Yes, I want to Cancel"}
                onPress={props.cancel}
                style={{ marginBottom: 41 }}
              />
            </>
          ) : (
            <>
              <View style={styles.gavel}>
                {/* <Images.gavel /> */}
                <LogoIcon width={50} height={60} />
              </View>
              <Text style={styles.largeText}>Ask A Lawyer</Text>
              <View style={styles.copyContainer}>
                <Text style={styles.copyText}>
                  Insist on having a lawyer present before you answer any
                  questions. A lawyer will be able to help you deal with the
                  police. A lawyer can tell you whether you are at risk of being
                  charged with a crime.
                </Text>
              </View>
              <Button title={"Proceed"} onPress={props.closeModal} />
              <Touches onPress={viewConstitution}>
                <Text style={styles.getConstitution}>Get the Constitution</Text>
              </Touches>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  blurView: {
    position: "absolute",
    backgroundColor: Colors.blur,
    width: "100%",
    height: "100%",
    opacity: 0.72,
  },
  modalContainer: {
    width: "90%",
    alignItems: "center",
    borderRadius: 10,
    padding: 17,
    backgroundColor: Colors.white,
  },
  closeButton: {
    alignSelf: "flex-end",
  },
  gavel: {
    width: 100,
    height: 100,
    marginVertical: 30,
  },
  largeText: {
    fontSize: 18,
    fontWeight: "700",
    lineHeight: 22.9,
    color: Colors.darkBlue,
    marginTop: 31,
    marginBottom: 10,
    fontFamily: 'montserrat-medium',
  },
  copyContainer: {
    marginHorizontal: 38,
    marginBottom: 20,
  },
  copyText: {
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 15.26,
    textAlign: "center",
    color: Colors.blackText,
  },
  getConstitution: {
    color: Colors.lightBlue,
    fontWeight: "500",
    fontSize: 12,
    lineHeight: 15,
    marginTop: 23,
    marginBottom: 3,
  },
  cancelText: {
    fontWeight: "700",
    fontSize: 18,
    lineHeight: 23,
    textAlign: "center",
    marginTop: 35,
    marginBottom: 24,
    opacity: 0.8,
    fontFamily: 'montserrat-medium',
    color: Colors.black,
  },
});

export default ModalComponent;
