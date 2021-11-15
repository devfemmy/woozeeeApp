import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Header from "../../../../../../../components/ModalHeader";
import CancelComponent from "../../../../../../../components/CancelComponent";
import { Colors } from "../../../../../../../theme";
// import { NavigationService } from "../navigation/navigation-service";
import Modal from "../../../../../../../components/IntroModal";
import { useDispatch } from "react-redux";
import { endTrip } from "../../../../../../../redux/actions/auth";

const CancelTrip = (props) => {
  const [reason, setReason] = useState(0);
  const [cancelModal, setCancelModal] = useState(false);

  const dispatch = useDispatch();

  const cancelHandler = () => {
    setCancelModal(false);
    dispatch(endTrip());
    props.navigation.navigate("ClientHome");
  };

  const selectionHandler = (num) => {
    setReason(num);
    setCancelModal(true);
  };

  return (
    <View style={styles.container}>
      <Header title={"Cancel Request"} />
      <View style={styles.divider} />
      <CancelComponent
        active={reason === 0 ? true : false}
        title={"Lawyer failed to attend within agreed time"}
        onPress={() => selectionHandler(0)}
      />
      <CancelComponent
        active={reason === 1 ? true : false}
        title={"Destination address changed"}
        onPress={() => selectionHandler(1)}
      />
      <CancelComponent
        active={reason === 2 ? true : false}
        title={"Cancellation by lawyer"}
        onPress={() => selectionHandler(2)}
      />
      <CancelComponent
        active={reason === 3 ? true : false}
        title={"Others"}
        onPress={() => selectionHandler(3)}
      />
      <Modal
        isOpen={cancelModal}
        closeModal={() => setCancelModal(false)}
        cancel={cancelHandler}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  divider: {
    width: "100%",
    height: 9,
    backgroundColor: Colors.ash,
  },
  cancelComponent: {
    width: "100%",
    paddingHorizontal: 17,
    height: 90,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 9,
  },
});

export default CancelTrip;
