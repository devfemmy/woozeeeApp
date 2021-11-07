import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../theme";
import BackButton from "./BackButton";
import { NavigationService } from "../navigation/navigation-service";

const ModalHeader = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.modalView}>
        <View style={styles.backButton}>
          <BackButton
            onPress={() => {
              NavigationService.goBack();
            }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={styles.textContainer}>
            <Text style={styles.title}>{props.title}</Text>
          </View>
        </View>
      </View>
      {props.divider ? <View style={styles.divider} /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    width: "100%",
  },
  modalView: {
    flexDirection: "row",
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 18,
    width: "100%",
  },
  divider: {
    height: 1,
    backgroundColor: Colors.white,
    width: "100%",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  title: {
    fontWeight: "700",
    color: Colors.black,
    lineHeight: 22,
    fontSize: 18,
    fontFamily: 'montserrat-medium',
  },
  iconContainer: {
    width: 24,
    height: 24,
  },
  textContainer: {
    flexDirection: "column",
    height: 30,
    alignSelf: "center",
    justifyContent: "center",
  },
  backButton: {
    position: "absolute",
    left: 18,
  },
});

export default ModalHeader;
