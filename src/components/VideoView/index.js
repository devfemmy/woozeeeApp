import React, {
  Component,
  useState,
  useContext,
  useCallback,
  useRef,
  forwardRef,
  useImperativeHandle,
} from 'react';

import { Root } from 'native-base';

import { View, Image, TouchableOpacity, Share } from 'react-native';

import Moment from 'react-moment';

import RBSheet from 'react-native-raw-bottom-sheet';

import { LinearGradient } from 'expo-linear-gradient';

import { Video } from 'expo-av';

// prettier-ignore
import {
  Text, Button, Divider, Layout,
} from '@ui-kitten/components';

import { useFocusEffect } from '@react-navigation/native';

import { AppSettingsContext } from 'src/contexts';

import { GeneralTextField } from 'src/components/FormFields';

import firebase from '@react-native-firebase/app';

import firestore from '@react-native-firebase/firestore';

import InteractIcon from 'src/components/InteractIcon';

import {
  sendComment,
  handleLike,
  handleFollow,
  getUserData,
  viewVideo,
  handleBookmark,
} from '../../services/Requests/index';

import {
  IconCHeart,
  IconCChat,
  IconCShareVariant,
  IconMoreHorizontal,
  IconPaperPlane,
  IconBookmark,
  IconCEye,
} from 'src/components/CustomIcons';

import { Toast } from 'native-base';
import { TextInput } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

const VideoView = forwardRef((props, ref) => {
  // const db = firebase.firestore();
  // prettier-ignore
  const {
    data, viewHeight, navigation, t,
  } = props;

  const { item } = data;

  const { userId } = item;

  const videoRef = useRef(null);

  const sheetRef = useRef(null);

  const isMounted = useRef(false);

  const [isBookmarked, setBookmarked] = useState(item.userEntryData.isBookmark);

  const [isLiked, setLiked] = useState(item.userEntryData.isLike);

  const [totalLikes, setTotalLikes] = useState(item.totalLikes);

  // const [hideText, setHideText] = useState(true);
  const [form, setFormValues] = useState({
    comment: '',
    entryId: item.userId,
  });

  const [following, setFollowing] = useState(item.userEntryData.isFollow);

  const likeData = {
    entryId: item._id,
    isLike: isLiked,
  };

  const { appState } = useContext(AppSettingsContext);

  const BG_THEME = appState.darkMode ? '#070A0F' : '#F7F9FC';

  // const toggleBookmark = () => setBookmarked((prevState) => !prevState);

  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: item.mediaURL,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // console.log(result.activityType);
          alert('Done');
          sheetRef.current.close();
        } else {
          // shared
          alert('Post Shared!');
          sheetRef.current.close();
        }
      } else if (result.action === Share.dismissedAction) {
        alert('Action dismissed');
      }
      sheetRef.current.close();
    } catch (error) {
      alert('An error occured');
      console.log(error.message);
    }
  };

  const toggleLike = async () => {
    setLiked(!isLiked);

    const newLikesCount = isLiked ? totalLikes - 1 : totalLikes + 1;
    setTotalLikes(newLikesCount);

    // We want to update the total like count that is returned from the server
    // So we have fresh like count after interaction with the like icon (:
    handleLike(likeData).then((resData) => {
      // The meta contains new count for the entry
      // resData.meta.totalLikes.totalLikes
      // resData.meta.totalLikes.totalVotes
      // resData.meta.totalLikes.totalViews
      // resData.meta.totalLikes.totalComments
      setTotalLikes(resData.meta.totalLikes);
    });
  };

  const toggleBookmark = async () => {
    setBookmarked(!isBookmarked);
    // console.log(!isBookmarked);
    const res = await handleBookmark(item.userEntryData.entryId, !isBookmarked);
    // console.log(res);
  };

  const toggleFollow = async () => {
    setFollowing(!following);
    await handleFollow(userId, !following);
  };
  const sendComment = async (commentMessage) => {
    const userId = await AsyncStorage.getItem('userid');
    const userData = await getUserData(userId);
    // const { data } = userData;
    // console.log(userData.data.user);

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

    await firestore()
      .collection('entryComments')
      .doc(data.item._id.trim())
      .collection('comments')
      .doc()
      .set({
        senderId: userData.data.user._id,
        text: commentMessage,
        userFirstName: userData.data.user.fName,
        userLastName: userData.data.user.sName,
        userName: `@iam${userData.data.user.fName.toLowerCase()}${userData.data.user.sName.toLowerCase()}`,
        imgUrl: userData.data.user.sName.imgUrl,
        sentAt: Date(),
        delivered: false,
        sent: true,
      });
  };

  const routeReport = () => {
    sheetRef.current.close();
    props.navigation.navigate('Report', data);
  };

  const routeUserProfile = async () => {
    const userData = await getUserData(item.userId);
    const { data } = userData;
    await navigation.navigate('UserProfile', data);
  };

  const routeComments = async () => {
    const userId = await AsyncStorage.getItem('userid');
    const userData = await getUserData(userId);
    const { data } = userData;
    await props.navigation.navigate('Comments', {
      currUserData: data,
      postItem: item,
    });
  };

  const handleView = async (item_id) => {
    await viewVideo(item_id);
  };

  const handleOpenSheet = () => sheetRef.current.open();

  useImperativeHandle(ref, () => ({
    async play() {
      try {
        await videoRef.current.playAsync();
        await videoRef.current.getStatusAsync();
        // console.log(status);
        if (status.isPlaying) {
          handleView(item._id);
          return;
        }
      } catch (e) {
        const msg = e;
      }
    },
    async pause() {
      try {
        if (videoRef.current) {
          await videoRef.current.pauseAsync();
        }
      } catch (e) {
        const msg = e;
      }
    },
  }));

  useFocusEffect(
    useCallback(() => {
      const unloadVideoRef = videoRef.current;

      isMounted.current = true;

      if (isMounted.current && videoRef.current) {
        (async () => {
          try {
            const status = await videoRef.current.getStatusAsync();

            if (!status.isLoaded) {
              await videoRef.current.loadAsync({
                uri: item.mediaURL,
              });
            }
          } catch (e) {
            const msg = e;
          }
        })();
      }
      return () => {
        isMounted.current = false;

        if (unloadVideoRef) {
          (async () => {
            try {
              const status = await unloadVideoRef.getStatusAsync();

              if (status.isLoaded) {
                await unloadVideoRef.unloadAsync();
              }
            } catch (e) {
              const msg = e;
            }
          })();
        }
      };
    }, [item.mediaURL]),
  );

  const [text, setText] = useState('');

  return (
    <Root>
      <View
        style={{
          flex: 1,
          height: viewHeight,
          paddingVertical: 20,
          borderBottomWidth: 1,
          borderColor: 'rgba(143, 155, 179, 0.08)',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingLeft: 10,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity
              activeOpacity={0.75}
              style={{ flexDirection: 'row', alignItems: 'center' }}
              onPress={routeUserProfile}
            >
              <LinearGradient
                colors={['#043F7C', '#FF5757']}
                style={{
                  height: 40,
                  width: 40,
                  borderRadius: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Image
                  source={require('assets/images/user/user2.png')}
                  defaultSource={require('assets/images/user/user2.png')}
                  style={{
                    height: 36,
                    width: 36,
                    borderRadius: 18,
                    borderColor: 'white',
                  }}
                  resizeMode="cover"
                />
              </LinearGradient>
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  paddingRight: 5,
                  paddingLeft: 5,
                  maxWidth: 190,
                }}
              >
                <Text status="primary" category="s2" style={{ marginRight: 5 }}>
                  {item.userDisplayName}
                </Text>
                <Text status="danger" category="s2">
                  {/* {item.userDisplayName} */}
                </Text>
              </View>
              <Image
                source={require('assets/images/icon/verified-1.png')}
                defaultSource={require('assets/images/icon/verified-1.png')}
                style={{
                  height: 16,
                  width: 16,
                  borderRadius: 8,
                }}
                resizeMode="cover"
              />
            </TouchableOpacity>
          </View>
          <View>
            <InteractIcon
              style={{ marginHorizontal: 5 }}
              Accessory={IconMoreHorizontal}
              status="basic"
              height={28}
              width={28}
              onPress={handleOpenSheet}
            />
          </View>
        </View>
        <View
          style={{
            flex: 1,
            marginVertical: 10,
            position: 'relative',
          }}
        >
          <Video
            ref={videoRef}
            isLooping
            shouldPlay={false}
            resizeMode="cover"
            usePoster
            posterSource={
              item.medialThumbnail
                ? { uri: item.medialThumbnail }
                : require('assets/images/banner/placeholder-image.png')
            }
            posterStyle={{ height: '100%', width: '100%', resizeMode: 'cover' }}
            style={{ flex: 1 }}
            // onPress={}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-start',
              paddingHorizontal: 5,
            }}
          >
            <InteractIcon
              style={{ marginHorizontal: 5 }}
              Accessory={(evaProps) => (
                <IconCHeart {...evaProps} active={isLiked} />
              )}
              textContent={totalLikes}
              direction="row"
              status={isLiked ? 'danger' : 'basic'}
              height={20}
              width={20}
              onPress={toggleLike}
            />
            <InteractIcon
              style={{ marginHorizontal: 5 }}
              Accessory={IconCChat}
              // textContent={item.totalComments}
              direction="row"
              status="basic"
              height={20}
              width={20}
              onPress={routeComments}
            />
            <InteractIcon
              style={{ marginHorizontal: 0 }}
              Accessory={IconCEye}
              textContent={item.totalViews}
              direction="row"
              status="basic"
              height={20}
              width={20}
            />
          </View>
          <View>
            <InteractIcon
              style={{ marginHorizontal: 5 }}
              Accessory={(evaProps) => (
                <IconBookmark {...evaProps} active={isBookmarked} />
              )}
              direction="row"
              status={isBookmarked ? 'danger' : 'basic'}
              height={24}
              width={24}
              onPress={toggleBookmark}
            />
          </View>
        </View>
        <View style={{ marginTop: 15, paddingHorizontal: 10 }}>
          <View
            style={{
              flexDirection: 'row',
              // padding: 15,
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
                  height: 40,
                  paddingHorizontal: 5,
                  color: 'grey',
                }}
                defaultValue={text}
              />
            </View>
            <View style={{ alignSelf: 'flex-start', marginTop: 4 }}>
              <InteractIcon
                Accessory={IconPaperPlane}
                status="primary"
                height={28}
                width={28}
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
          </View>
          <View style={{ marginTop: 5 }}>
            <Moment
              fromNow
              element={(momentProps) => (
                <Text category="c1" {...momentProps} style={{ fontSize: 10 }} />
              )}
            >
              {item.createdAt}
            </Moment>
          </View>
        </View>
      </View>
      <RBSheet
        ref={sheetRef}
        height={205}
        closeOnDragDown
        animationType="fade"
        customStyles={{
          container: {
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: BG_THEME,
          },
        }}
      >
        <Layout
          level="5"
          style={{
            flex: 1,
            width: '100%',
            alignItems: 'flex-start',
            justifyContent: 'flex-end',
            paddingBottom: 30,
          }}
        >
          <Button
            appearance="ghost"
            status="basic"
            style={{
              width: '100%',
              justifyContent: 'center',
            }}
            onPress={toggleFollow}
          >
            <Text style={{ fontSize: 16 }} status="basic">
              {following ? t('unfollow') : t('follow')}
            </Text>
          </Button>
          <Divider style={{ marginVertical: 2, width: '100%' }} />
          <Button
            appearance="ghost"
            status="basic"
            style={{
              width: '100%',
              justifyContent: 'center',
            }}
            onPress={routeReport}
          >
            <Text style={{ fontSize: 16 }} status="basic">
              {t('makeReport')}
            </Text>
          </Button>
          {/* <Divider style={{ marginVertical: 2, width: '100%' }} />
          <Button
            appearance="ghost"
            status="basic"
            style={{
              width: '100%',
              justifyContent: 'center',
            }}
          >
            <Text style={{ fontSize: 16 }} status="basic">
              {t('downloadMedia')}
            </Text>
          </Button> */}
          <Divider style={{ marginVertical: 2, width: '100%' }} />
          <Button
            appearance="ghost"
            status="basic"
            style={{
              width: '100%',
              justifyContent: 'center',
            }}
            onPress={handleShare}
          >
            <Text style={{ fontSize: 16 }} status="basic">
              {t('shareTo')}
            </Text>
          </Button>
        </Layout>
      </RBSheet>
    </Root>
  );
});

export default VideoView;
