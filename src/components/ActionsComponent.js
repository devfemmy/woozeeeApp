import React from "react";
import { View, StyleSheet, Image } from "react-native";
// import { Images } from "../../assets/images";
import { Colors } from "../theme";
import ActionComponent from "./ActionComponent";

const ActionsComponent = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.modalView}>
        <ActionComponent
          title="Contact"
          icon={<Image style={{width: 24}} source={require('../assets/images/askALawyer/phone1.png')} />}
          onPress={props.callAction}
        />
        <ActionComponent
          title="Chat"
          icon={<Image style={{width: 24}} source={require('../assets/images/askALawyer/chat.png')} />}
          onPress={props.chatAction}
        />
        <ActionComponent
          title="Share"
          icon={<Image style={{width: 24}} source={require('../assets/images/askALawyer/share1.png')} />}
          onPress={props.shareAction}
        />
        <ActionComponent
          title="Cancel"
          icon={<Image style={{width: 24}} source={require('../assets/images/askALawyer/cancel.png')} />}
          onPress={props.cancelAction}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 104,
    justifyContent: "center",
    borderTopWidth: 1,
    borderTopColor: Colors.divider,
  },
  modalView: {
    flexDirection: "row",
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
});

export default ActionsComponent;
