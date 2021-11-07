import React from "react";
import { View, Text, StyleSheet } from "react-native";
// import { Images } from "../assets/images";
import { Colors } from "../theme";
import BackButton from "./BackButton";
// import { NavigationService } from "../navigation/navigation-service";
import { TouchableOpacity } from "react-native-gesture-handler";

const Header = (props) => {
  const { address } = props;

  const drawerNavigationHandler = () => {
    props.navigation.toggleDrawer();
  };

  return (
    <View style={styles.container}>
      <View style={styles.modalView}>
        <BackButton onPress={() => null} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={styles.iconContainer}>
            {/* <Images.pin /> */}
          </View>
          <TouchableOpacity
            onPress={() => {
              null
              // NavigationService.navigate("SetLocation", { address: address });
            }}
            containerStyle={styles.textContainer}
          >
            <Text style={styles.labelText}>Current Location</Text>
            <Text numberOfLines={1} style={styles.locationText}>
              {!!address ? address?.split(",")[0] : "Loading..."}
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={drawerNavigationHandler}
        >
          {/* <Images.hamburger width={16} height={12} /> */}
        </TouchableOpacity>
      </View>
      <View style={styles.divider} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    width: "100%",
    position: "absolute",
    top: 0,
    backgroundColor: Colors.white,
  },
  modalView: {
    flexDirection: "row",
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    width: "100%",
    marginBottom: 10,
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
  },
  labelText: {
    fontWeight: "400",
    letterSpacing: 0.01,
    color: Colors.black,
    fontSize: 12,
  },
  locationText: {
    fontWeight: "500",
    letterSpacing: 0.01,
    color: Colors.black,
    fontSize: 12,
    fontFamily: 'montserrat-medium',
  },
  iconContainer: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    flexDirection: "column",
    height: 30,
    width: 130,
    justifyContent: "center",
  },
});

export default Header;
