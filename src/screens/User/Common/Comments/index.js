// prettier-ignore
import React, {
  useState, useMemo, useCallback, useContext, useEffect
} from 'react';

// prettier-ignore
import {
  TextInput,
  View,
  Image,
  useWindowDimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import firebase from '@react-native-firebase/app';

import firestore from '@react-native-firebase/firestore';

import Moment from 'react-moment';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

// prettier-ignore
import {
  Layout, Card, Text, List
} from '@ui-kitten/components';

import { LinearGradient } from 'expo-linear-gradient';

import { LocaleContext } from 'src/contexts';

import { GeneralTextField } from 'src/components/FormFields';

import InteractIcon from 'src/components/InteractIcon';

import { IconClose, IconPaperPlane } from 'src/components/CustomIcons';

export default function Comments({ route, navigation }) {
  const { height } = useWindowDimensions();

  const { bottom, top } = useSafeAreaInsets();

  const INSETS = bottom + top + 180;

  const t = useContext(LocaleContext);

  const { currUserData, postItem } = route.params;

  // console.log(postItem);

  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
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
      .doc(postItem._id.trim())
      .collection('comments')
      .get();

    const _comments = [];
    allComments.forEach((snap) => {
      _comments.push(snap._data);
    });

    setComments([..._comments]);
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const closeComments = useCallback(() => navigation.pop(), [navigation]);

  const renderCardHeader = useCallback(
    () => (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 15,
        }}
      >
        <Text category="h5">{t('comments')}</Text>
        <View>
          <InteractIcon
            Accessory={IconClose}
            status="primary"
            height={32}
            width={32}
            onPress={closeComments}
          />
        </View>
      </View>
    ),
    [t, closeComments],
  );

  const sendComment = async (commentMessage) => {
    // console.log(entryId);
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

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    // console.log(item, commentMessage);

    await firestore()
      .collection('entryComments')
      .doc(postItem._id.trim())
      .collection('comments')
      .doc()
      .set({
        senderId: currUserData.user._id,
        text: commentMessage,
        userFirstName: currUserData.user.fName,
        userLastName: currUserData.user.sName,
        userName: `@iam${currUserData.user.fName.toLowerCase()}${currUserData.user.sName.toLowerCase()}`,
        imgUrl: currUserData.user.imgUrl,
        sentAt: Date(),
        delivered: false,
        sent: true,
      });
    setComments([
      ...comments,
      {
        senderId: currUserData.user._id,
        text: commentMessage,
        userFirstName: currUserData.user.fName,
        userLastName: currUserData.user.sName,
        userName: `@iam${currUserData.user.fName.toLowerCase()}${currUserData.user.sName.toLowerCase()}`,
        imgUrl: currUserData.user.imgUrl,
        sentAt: Date(),
        delivered: false,
        sent: true,
      },
    ]);
  };

  const renderCardFooter = () => {
    const [text, setText] = useState('');

    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          padding: 15,
          alignItems: 'center',
        }}
      >
        <LinearGradient
          colors={['#043F7C', '#FF5757']}
          style={{
            height: 34,
            width: 34,
            borderRadius: 17,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Image
            source={require('assets/images/user/user1.png')}
            defaultSource={require('assets/images/user/user1.png')}
            style={{
              height: 30,
              width: 30,
              borderRadius: 15,
              borderColor: 'white',
            }}
            resizeMode="cover"
          />
        </LinearGradient>
        <View style={{ flex: 1, marginHorizontal: 5 }}>
          <TextInput
            placeholder="Leave a comment"
            onChangeText={(text) => setText(text)}
            style={{
              borderWidth: 0.5,
              height: 40,
              paddingHorizontal: 5,
              borderColor: 'white',
              borderRadius: 5,
              color: 'grey',
            }}
            defaultValue={text}
          />
        </View>
        <InteractIcon
          Accessory={IconPaperPlane}
          status="primary"
          height={32}
          width={32}
          onPress={() => {
            if (text !== '') {
              sendComment(text);
              setText('');
            } else {
              console.log('enter a comment');
            }
          }}
        />
      </View>
    );
  };

  // prettier-ignore
  const Message = ({ userName, message, img, time }) => useMemo(
    () => (
      <View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
            marginTop: 15,
          }}
        >
          <LinearGradient
            colors={['#043F7C', '#FF5757']}
            style={{
              height: 34,
              width: 34,
              borderRadius: 17,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Image
              source={img}
              style={{
                height: 30,
                width: 30,
                borderRadius: 15,
                borderColor: 'white',
              }}
            />
          </LinearGradient>
          <Layout
            level="4"
            style={{
              flex: 1,
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 10,
              marginHorizontal: 5,
            }}
          >
            <Text category="s2" style={{ alignSelf: 'flex-start', marginBottom:2 }}>
              {userName}
            </Text>
            <Text category="p2" style={{ marginBottom:2 }}>{message}</Text>
            <Moment
              fromNow
              element={(momentProps) => (
                <Text category="c1" {...momentProps} style={{ fontSize: 10, textAlign:'right' }} />
              )}
            >
              {time}
            </Moment>
          </Layout>
        </View>
        <View style={{ marginVertical: 5, marginLeft: 50 }}>
          <TouchableOpacity
            activeOpacity={0.75}
          >
            <Text category="c2">{t('reply')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    ),
    [],
  );

  return useMemo(
    () => (
      <Layout level="5" style={{ flex: 1 }}>
        <Card
          style={{
            flex: 1,
            justifyContent: 'space-between',
            backgroundColor: 'transparent',
          }}
          header={renderCardHeader}
          footer={renderCardFooter}
        >
          <View
            style={{
              height: height - INSETS,
              justifyContent: 'flex-end',
            }}
          >
            {/* {console.log('comments in here is => ', comments)} */}
            {comments.length > 0 ? (
              <List
                style={{
                  backgroundColor: 'transparent',
                  paddingVertical: 10,
                  flex: 1,
                }}
                contentContainerStyle={{}}
                alwaysBounceVertical
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                data={comments}
                keyExtractor={(_, i) => i.toString()}
                renderItem={(comment, index) => (
                  <Message
                    key={index}
                    userName={`${comment.item.userFirstName} ${comment.item.userLastName}`}
                    message={`${comment.item.text}`}
                    time={`${comment.item.sentAt}`}
                  />
                )}
                getItemLayout={(data, index) => ({
                  length: 150,
                  offset: 150 * index,
                  index,
                })}
              />
            ) : null}
          </View>
        </Card>
      </Layout>
    ),
    [height, INSETS, renderCardFooter, renderCardHeader],
  );
}
