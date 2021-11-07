import React from "react";
import { View, StyleSheet } from "react-native";
import { Images } from "../../assets/images";
import { Colors } from "../theme";
import ActionComponent from "./ActionComponent";

const ActionsComponent = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.modalView}>
        <ActionComponent
          title="Contact"
          icon={<Images.phone width={24} />}
          onPress={props.callAction}
        />
        <ActionComponent
          title="Chat"
          icon={<Images.chat width={24} />}
          onPress={props.chatAction}
        />
        <ActionComponent
          title="Share"
          icon={<Images.share width={24} />}
          onPress={props.shareAction}
        />
        <ActionComponent
          title="Cancel"
          icon={<Images.cancel width={18} />}
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
