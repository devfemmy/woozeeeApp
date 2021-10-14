import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import {
  Text,
  Button,
  Divider,
  Layout,
  Input,
  List,
} from '@ui-kitten/components';

import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';

function index({ postId, gotoComment }) {
  const [comments, setComments] = useState([]);

  const handleRoute = () => {
    gotoComment();
  };

  const fetchComments = async (postId) => {
    const firebaseConfig = {
      apiKey: 'AIzaSyARWCPqpauNDiveSI26tvmKsyn4p_XNzh8',
      authDomain: 'woozeee-d7f6c.firebaseapp.com',
      databaseURL: 'https://woozeee-d7f6c.firebaseio.com',
      projectId: 'woozeee-d7f6c',
      storageBucket: 'woozeee-d7f6c.appspot.com',
      messagingSenderId: '979696525592',
      appId: '1:979696525592:web:ec27a203184d23e0dcfe6d',
      measurementId: 'G-XQKMT94R9R',
    };

    try {
      if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      }
    } catch (e) {
      console.log(e);
    }

    const allComments = await firestore()
      .collection('entryComments')
      .doc(postId.trim())
      .collection('comments')
      .orderBy('sentAt', 'asc')
      .get();

    const _comments = [];
    allComments.forEach((snap) => {
      let replies = Object.assign(snap._data, {
        replyId: snap.id,
        parentCommentId: snap._ref._documentPath._parts[3],
      });
      _comments.push(replies);
    });

    setComments([..._comments]);
  };

  useEffect(() => {
    fetchComments(postId);
  }, []);

  return (
    <Layout level="6" style={styles.container}>
      {comments.length > 0 && (
        <View>
          <View
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              width: '95%',
              marginTop: 5,
            }}
          >
            <Text category="h6" status="basic" style={{ marginLeft: 10 }}>
              {comments[0].userName}
              {'  '}
              <Text
                category="s2"
                status="basic"
                numberOfLines={1}
                style={{ marginRight: 15, textAlign: 'left' }}
              >
                {comments[0].text}
              </Text>
            </Text>
          </View>
          <TouchableWithoutFeedback onPress={handleRoute}>
            <Text
              category="c1"
              status="basic"
              style={{ marginHorizontal: 10, marginTop: 5 }}
            >
              view {comments.length > 1 && 'all'} {comments.length}{' '}
              {comments.length > 1 ? ' comments' : ' comment'}
            </Text>
          </TouchableWithoutFeedback>
        </View>
      )}
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default index;
