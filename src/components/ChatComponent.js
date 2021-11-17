import React, { useState, useCallback, useEffect } from "react";
import { View, StyleSheet, Dimensions, TextInput, Image } from "react-native";
// import { Images } from "../../assets/images";
import { Colors } from "../theme";
import { GiftedChat, Send, Bubble } from "react-native-gifted-chat";
import TouchableOpacity from "./TouchableOpacity";
import firebase from '../services/Firebase/firebaseConfig'
import firestore from "@react-native-firebase/firestore";
import { useSelector } from "react-redux";

const ChatComponent = () => {
  const user = useSelector((state) => state.auth.user);

  const chatID = () => {
    const chatterID = user._id;
    const chateeID = user.matchedTo;

    return chatterID < chateeID
      ? `${chatterID}_${chateeID}`
      : `${chateeID}_${chatterID}`;
  };

  const [messages, setMessages] = useState([
    {
      _id: user._id,
      text: "Hello Client.",
      createdAt: new Date(),
      user: {
        _id: user.matchedTo,
        name: "GiftedChat",
        avatar: "https://picsum.photos/200",
      },
    },
  ]);
  const [text, setText] = useState("");

  useEffect(() => {
    const unsubscribeListener = firebase.firestore()
      .collection("Messages")
      .doc(chatID())
      .collection("Chat")
      .orderBy("createdAt", "desc")
      .onSnapshot((querySnapshot) => {
        const messages = querySnapshot.docs.map((doc) => {
          const firebaseData = doc.data();
          const data = {
            _id: doc.id,
            text: firebaseData.newMessages[0].text,
            createdAt: new Date().getTime(),
            ...firebaseData,
          };

          if (!firebaseData.system) {
            data.user = {
              ...firebaseData.user,
              name: firebaseData.user.displayName,
              avatar: firebaseData.user.avatar,
            };
          }

          return data;
        });

        setMessages(messages);
      });

    return () => unsubscribeListener();
  }, []);

  const onSend = useCallback((newMessages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );
    firebase.
    firestore()
      .collection("Messages")
      .doc(chatID())
      .collection("Chat")
      .add({
        newMessages,
        createdAt: new Date().getTime(),
        user: {
          _id: user._id,
          avatar: user.imgUrl,
          displayName: `${user.fName} ${user.sName}`,
        },
      });
  }, []);

  const SendButton = (props) => {
    return (
      <Send {...props} containerStyle={styles.sendButtonContainer}>
        <View style={styles.sendButton}>
          {/* <Images.send /> */}
          <Image source={require('../assets/images/askALawyer/send.png')} />
        </View>
      </Send>
    );
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: Colors.gray,
            borderBottomEndRadius: 16,
            borderTopLeftRadius: 16,
            borderTopRightRadius: 0,
            marginVertical: 11,
          },
          left: {
            backgroundColor: Colors.textPink,
            borderBottomEndRadius: 16,
            borderTopRightRadius: 16,
            borderTopLeftRadius: 0,
            marginVertical: 11,
          },
        }}
        textStyle={{
          right: {
            color: Colors.black,
            opacity: 0.8,
            fontWeight: "500",
            fontSize: 14,
          },
          left: {
            color: Colors.black,
            opacity: 0.8,
            fontWeight: "500",
            fontSize: 14,
          },
        }}
      />
    );
  };

  const textComposer = (props) => {
    return (
      <View style={styles.inputArea}>
        <View style={styles.textInputArea}>
          <TextInput
            {...props}
            style={styles.textInput}
            multiline={true}
            scrollEnabled={true}
            spellCheck={true}
            numberOfLines={5}
            autoFocus={true}
            placeholder={"Type something..."}
            placeholderTextColor={Colors.placeholderText}
            value={text}
            onChangeText={(text) => {
              setText(text);
            }}
          />
        </View>
        <Send {...props}>
          <TouchableOpacity
            containerStyle={styles.sendButton}
            onPress={() => {
              onSend();
            }}
          >
            <Images.send />
          </TouchableOpacity>
        </Send>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <GiftedChat
        {...{ messages, onSend }}
        renderBubble={renderBubble}
        alwaysShowSend
        scrollToBottom
        showUserAvatar
        isLoadingEarlier
        renderSend={SendButton}
        placeholder={"Type something..."}
        timeTextStyle={{
          left: { color: "rgba(0,0,0,0.8)" },
          right: { color: "rgba(0,0,0,0.8)" },
        }}
        textInputProps={{ numberOfLines: 5, multiline: true, autoFocus: true }}
        showAvatarForEveryMessage
        isKeyboardInternallyHandled={false}
        user={{
          _id: user._id,
          avatar: user.imgUrl,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    minHeight: Dimensions.get("screen").height / 3,
    maxHeight: (Dimensions.get("screen").height * 3) / 5,
    backgroundColor: Colors.white,
  },
  inputArea: {
    flexDirection: "row",
    width: "100%",
    minHeight: 60,
    paddingHorizontal: 13,
    backgroundColor: Colors.gray,
    alignItems: "center",
    justifyContent: "space-between",
    position: "absolute",
  },
  textInputArea: {
    width: "89%",
    minHeight: 40,
    maxHeight: 87,
    borderRadius: 50,
    marginVertical: 10,
    backgroundColor: Colors.white,
    justifyContent: "center",
  },
  sendButton: {
    width: 35,
    height: 35,
    borderRadius: 35,
    backgroundColor: Colors.green,
  },
  sendButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginRight: 15,
  },
  textInput: {
    width: "90%",
    alignSelf: "flex-end",
    paddingRight: 25,
  },
});

export default ChatComponent;
