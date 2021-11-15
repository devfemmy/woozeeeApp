import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { Colors } from "../../../../../../../theme";
import CloseButton from "../../../../../../../components/CloseButton";
import Button from "../../../../../../../components/Button";
// import { NavigationService } from "../navigation/navigation-service";
import { Rating } from "react-native-ratings";

const RatingScreen = (props) => {
  const [review, setReview] = useState();
  const [rating, setRating] = useState();

  const navigateToMap = () => {
    props.navigation.popToTop();
  };

  const ratingCompleted = (rating) => {
    setRating(rating);
  };

  const submitHandler = () => {
    props.navigation.popToTop();
  };

  useEffect(() => {
    switch (rating) {
      case 1:
        setReview("Very Poor");
        break;
      case 2:
        setReview("Poor");
        break;
      case 3:
        setReview("Fair");
        break;
      case 4:
        setReview("Good");
        break;
      case 5:
        setReview("Excellent");
        break;
    }
  }, [rating]);

  return (
    <View style={styles.container}>
      <View style={styles.closeButton}>
        <CloseButton onPress={navigateToMap} />
      </View>
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingPrompt}>How was your Lawyer?</Text>
        <Rating
          onFinishRating={(e) => ratingCompleted(e)}
          fractions={0}
          startingValue={0}
          jumpValue={1}
          minValue={1}
          ratingBackgroundColor={"#DEDEDE"}
        />
        <Text style={styles.note}>
          {review ? review : "Your feedback is anonymous"}
        </Text>
        {review ? (
          <View style={styles.commentingContainer}>
            <TextInput
              placeholder={"Leave a comment"}
              placeholderTextColor={Colors.black}
              style={styles.textInput}
            />
            <Button title="Done" onPress={submitHandler} />
          </View>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  closeButton: {
    alignSelf: "flex-end",
    marginTop: 23,
    marginRight: 23,
  },
  ratingPrompt: {
    fontWeight: "700",
    fontSize: 20,
    lineHeight: 25,
    marginBottom: 10,
    fontFamily: "GoogleSans-Medium",
    color: Colors.black,
  },
  ratingContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: "25%",
  },
  note: {
    fontWeight: "100",
    fontSize: 14,
    lineHeight: 18,
    marginTop: 13,
    color: Colors.black,
  },
  textInput: {
    backgroundColor: Colors.ash,
    paddingHorizontal: 17,
    paddingVertical: 13,
    borderRadius: 5,
    height: 44,
    marginTop: 68,
    width: "100%",
    marginBottom: 23,
  },
  commentingContainer: {
    paddingHorizontal: 18,
    alignItems: "center",
    width: "100%",
  },
});

export default RatingScreen;
