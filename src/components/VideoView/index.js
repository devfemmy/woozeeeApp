import React, {
  Component,
  useState,
  useContext,
  useMemo,
  useCallback,
  useRef,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from 'react';

import {
  View,
  Image,
  TouchableOpacity,
  Share,
  TouchableWithoutFeedback,
  Alert,
  ImageBackground,
  ScrollView,
  Dimensions,
} from 'react-native';

import UserTemplate from '../UserTemplate/index';

import SeeMore from 'react-native-see-more-inline';

import Moment from 'react-moment';

import Api from 'src/api';

import useAppSettings from 'src/reducers/useAppSettings';

import AsyncStorage from '@react-native-async-storage/async-storage';

import RBSheet from 'react-native-raw-bottom-sheet';

import { LinearGradient } from 'expo-linear-gradient';

import { Video } from 'expo-av';

// prettier-ignore
import {
  Text, Button, Divider, Layout, Input, List
} from '@ui-kitten/components';

import { useFocusEffect, useIsFocused } from '@react-navigation/native';

import { AppSettingsContext } from 'src/contexts';

import { GeneralTextField } from 'src/components/FormFields';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import firebase from '@react-native-firebase/app';

import firestore from '@react-native-firebase/firestore';

import { SendMessage, RecieveMessage } from '../../services/Firebase/Message';

import { AddUser } from '../../services/Firebase/Users';

import InteractIcon from 'src/components/InteractIcon';

import getUserProfile from '../../services/Requests/FetchUserProfile';

import Modal from 'react-native-modalbox';

import { Toast, Content, Root } from 'native-base';

import Hyperlink from 'react-native-hyperlink';

import FeedsComments from '../../components/FeedsComments';

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
  IconSearch,
  IconCEye,
} from 'src/components/CustomIcons';

import { Feather, Ionicons, Entypo, EvilIcons } from '@expo/vector-icons';

import { TextInput } from 'react-native';

import Search from '../../screens/User/Common/Search/index';
import FastImage from 'react-native-fast-image';

export default function VideoView({
  data,
  viewHeight,
  navigation,
  t,
  // onVideoPlay,
  viewable,
}) {
  const screenIsFocused = useIsFocused();

  const { appState } = useContext(AppSettingsContext);

  const [modalState, setModalState] = useState(false);

  const [isVisible, setIsVisible] = useState(false);

  const BG_THEME = appState.darkMode ? '#070A0F' : '#F7F9FC';

  const [shareData, setShareData] = useState(null);

  const [videoData, setVideoData] = useState([]);

  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;

  const [appTheme, setTheme] = useState('');
  const [_userId, setUserId] = useState('');
  const [userImg, setUserImg] = useState('');
  const [shareLink, setShareLink] = useState('');

  const handleVideoView = (val) => {
    console.log('val', val);
    setVideoData(data.item);
    setIsVisible(val);
  };

  const PlayVideoModal = () => {
    return (
      <View>
        <Modal
          style={{
            backgroundColor: 'transparent',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}
          animationType="slide"
          position="center"
          isOpen={isVisible}
          backdrop={true}
          backdropPressToClose={true}
          coverScreen={true}
          swipeToClose={true}
        >
          <Video
            source={{ uri: videoData.mediaURL }}
            isLooping={true}
            shouldPlay={isVisible}
            resizeMode="contain"
            usePoster
            posterSource={
              videoData.medialThumbnail
                ? { uri: videoData.medialThumbnail }
                : require('assets/images/banner/placeholder-image.png')
            }
            style={{
              flex: 1,
              marginVertical: 100,
              marginHorizontal: 5,
              borderRadius: 15,
            }}
          />
        </Modal>
      </View>
    );
  };

  const getTheme = async () => {
    const res = await AsyncStorage.getItem('appTheme');
    setTheme(res);
  };

  const getUserId = async () => {
    const res = await AsyncStorage.getItem('userid');
    setUserId(res);
  };

  const getUserImg = async () => {
    const res = await AsyncStorage.getItem('userImage');
    setUserImg(res);
  };

  getUserId();
  getTheme();
  getUserImg();

  const { item } = data;

  const { userId } = item;

  const videoRef = useRef(null);

  useEffect(() => {
    if (viewable && viewable.length) {
      if (!screenIsFocused) {
        videoRef.current.pauseAsync();
      } else {
        if (viewable[0]._id === item._id) {
          videoRef.current.playAsync();
        }
      }
    } else {
      videoRef.current.pauseAsync();
    }
  }, [viewable]);

  const sheetRef = useRef(null);

  const sendSheet = useRef(null);

  const videoSheet = useRef(null);

  const [isBookmarked, setBookmarked] = useState(item.userEntryData.isBookmark);

  const [isLiked, setLiked] = useState(item.userEntryData.isLike);

  const [totalLikes, setTotalLikes] = useState(item.totalLikes);

  const [comments, setComments] = useState([]);

  const [form, setFormValues] = useState({
    comment: '',
    entryId: item.userId,
  });

  const [following, setFollowing] = useState(item.userEntryData.isFollow);

  const likeData = {
    entryId: item._id,
    isLike: isLiked,
  };

  const [userList, setUserList] = useState([]);

  const fetchUsers = async () => {
    const res = await Api.getAllUsers(searchForm.value);
    const { users } = res;
    setUserList([...users]);
  };

  const handleShare = async (params, value) => {
    const firebaseConfig = {
      apiKey: 'AIzaSyA5kH1HxdiF085vwaYEZ3jTMSm1CMELJfg',
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
    try {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        json: true,
        body: JSON.stringify({
          dynamicLinkInfo: {
            // ios: {
            //   bundleId: 'app.woozeee.com',
            //   appStoreId: '1549457766',
            // },
            // android: {
            //   packageName: 'app.woozeee.com',
            // },
            domainUriPrefix: 'https://app.woozeee.com',
            link: `https://app.woozeee.com/entry/?${params}=${value}`,
            // social: JSON.stringify({
            //   title: 'woozeee Challenges',
            //   descriptionText: 'Challenge entry on woozeee',
            //   imageUrl:
            //     'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxO_eYxfA2ZQaIuJIIEuYm8d72bH2jgHwvBA&usqp=CAU',
            // }),
          },
        }),
      };

      const res = await fetch(
        'https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=AIzaSyA5kH1HxdiF085vwaYEZ3jTMSm1CMELJfg',
        requestOptions,
      );
      const _res = await res.json();
      // console.log(_res);

      const result = await Share.share({
        message: _res.shortLink,
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
        // alert('Action dismissed');
      }
      sheetRef.current.close();
    } catch (e) {
      console.log(e);
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

  const deletePost = async (entryId) => {
    sheetRef.current.close();
    Alert.alert(
      'Delete Action',
      'Are you sure you want to delete this post ?',
      [
        {
          text: 'No',
          // onPress: () => Alert.alert('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: async () => {
            const res = await Api.deleteUserPosts(entryId);
            if (res.statusCode == 200) {
              //close sheet and bring up suceess toast
              Toast.show({
                text: 'Post successfully deleted',
                buttonText: 'Okay',
                position: 'bottom',
                type: 'success',
                duration: 3000,
              });
            } else {
              //close sheet and bring up suceess toast
              Toast.show({
                text: 'Unable to delete post',
                buttonText: 'Okay',
                position: 'bottom',
                type: 'success',
                duration: 3000,
              });
            }
          },
          style: 'ok',
        },
      ],
      {
        cancelable: true,
      },
    );
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
    console.log(commentMessage);
    const userId = await AsyncStorage.getItem('userid');
    const userData = await getUserData(userId);

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

    const res = await firestore()
      .collection('entryComments')
      .doc(data.item._id.trim())
      .collection('comments')
      .doc()
      .set({
        senderId: userData.data.user._id,
        text: commentMessage,
        userFirstName: userData.data.user.fName,
        userLastName: userData.data.user.sName,
        userName: `${userData.data.user.displayName.toLowerCase()}`,
        imgUrl: userData.data.user.sName.imgUrl,
        sentAt: Date(),
        delivered: false,
        sent: true,
      });

    setText('');
  };

  const sharePostToDm = async (
    currentUserId,
    guestUserId,
    postUrl,
    name,
    guestUserImg,
  ) => {
    // console.log('shareData', shareData);
    // console.log(currentUserId, guestUserId, postUrl, name);
    SendMessage(currentUserId, guestUserId, postUrl, '')
      .then((res) => {
        // console.log(res);
        // this.setState({ message: '' })
      })
      .catch((err) => {
        alert(err);
      });

    RecieveMessage(currentUserId, guestUserId, postUrl, '')
      .then((res) => {
        // console.log(res);
      })
      .catch((err) => {
        alert(err);
      });

    AddUser(name, guestUserId, guestUserImg);

    sendSheet.current.close();
  };

  const routeReport = () => {
    sheetRef.current.close();
    navigation.navigate('Report', data);
  };

  const routeUserProfile = async () => {
    // console.log('from route ', item.userId, _userId);
    item.userId !== _userId
      ? await navigation.navigate('UserProfile', { id: item.userId })
      : await navigation.navigate('ProfileTab');
  };

  const routeComments = async () => {
    const userId = await AsyncStorage.getItem('userid');
    const userData = await getUserData(userId);
    const { data } = userData;
    await navigation.navigate('Comments', {
      currUserData: data,
      postItem: item,
    });
  };

  const handleView = async (item_id) => {
    await viewVideo(item_id);
  };

  const handleSend = async (data) => {
    const firebaseConfig = {
      apiKey: 'AIzaSyA5kH1HxdiF085vwaYEZ3jTMSm1CMELJfg',
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

    try {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        json: true,
        body: JSON.stringify({
          dynamicLinkInfo: {
            domainUriPrefix: 'https://app.woozeee.com',
            link: `https://app.woozeee.com/entry/?$entries=${item._id}`,
          },
        }),
      };

      const res = await fetch(
        'https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=AIzaSyA5kH1HxdiF085vwaYEZ3jTMSm1CMELJfg',
        requestOptions,
      );
      const _res = await res.json();
      setShareLink(_res.shortLink);
    } catch (e) {
      console.log(e);
    }

    sendSheet.current.open();
    setShareData(data.item);
  };

  const handleOpenSheet = () => sheetRef.current.open();

  let lastTap = null;

  const toggleMute = async () => {
    let val = await videoRef.current.setIsMutedAsync();
    await videoRef.current.setIsMutedAsync(!val.isMuted);
  };

  const handleDoubleTap = () => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;
    if (lastTap && now - lastTap < DOUBLE_PRESS_DELAY) {
      toggleMute();
    } else {
      lastTap = now;
    }
  };

  const [text, setText] = useState('');

  const [searchForm, setSearchFormValues] = useState({
    value: '',
    status: 'basic',
  });

  const handleChange = (inputSearch) => {
    setSearchFormValues((prevState) => ({
      ...prevState,
      value: inputSearch,
    }));
  };

  useEffect(() => {
    fetchUsers();
  }, [searchForm.value]);

  let params = { chat: null };
  let _route = { params };
  let _testText =
    'lorem ipsum dolor sit amet, consectetur adipiscing lorem ipsum dolor lorem ipsum dolor sit amet, consectetur adipiscing lorem ipsum dolor,lorem ipsum dolor sit amet, consectetur adipiscing lorem ipsum dolor sit amet, consectetur adipiscinglorem ipsum dolor sit amet, consectetur adipiscing';

  return useMemo(
    () => (
      <Root>
        <View
          style={{
            flex: 1,
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
                    source={{ uri: item.userImageURL }}
                    // defaultSource={require('assets/images/user/user2.png')}
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
                    // flexDirection: 'row',
                    flexWrap: 'wrap',
                    paddingRight: 5,
                    paddingLeft: 5,
                    maxWidth: 190,
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      paddingRight: 5,
                      paddingLeft: 5,
                      justifyContent: 'center',
                      alignItems: 'center',
                      maxWidth: 190,
                    }}
                  >
                    <Text
                      status="primary"
                      category="s2"
                      style={{ marginRight: 3 }}
                    >
                      {item.userFirstName}
                    </Text>
                    <Text status="danger" category="s2">
                      {item.userLastName}
                    </Text>
                    <Image
                      source={require('assets/images/icon/verified-1.png')}
                      defaultSource={require('assets/images/icon/verified-1.png')}
                      style={{
                        height: 16,
                        width: 16,
                        borderRadius: 8,
                        marginHorizontal: 5,
                      }}
                      resizeMode="cover"
                    />
                  </View>
                  <Text
                    status="basic"
                    category="c1"
                    style={{
                      paddingRight: 5,
                      paddingLeft: 5,
                    }}
                  >
                    @{item.userDisplayName}
                  </Text>
                </View>
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
          {data.item.description !== '' && (
            <View style={{ marginLeft: 10, marginVertical: 5 }}>
              <Hyperlink
                linkStyle={{ textDecorationLine: 'underline' }}
                linkDefault={true}
              >
                <SeeMore
                  numberOfLines={3}
                  style={{ fontFamily: 'Montserrat' }}
                  seeMoreText={true}
                  seeLessText={true}
                >
                  {data.item.description}
                </SeeMore>
              </Hyperlink>
            </View>
          )}
          <TouchableWithoutFeedback onPress={() => handleDoubleTap()}>
            <View
              style={{
                flex: 5,
                marginVertical: 10,
                height: viewHeight,
                width,
              }}
            >
              <View
                style={{
                  flex: 1,
                  height,
                  width: '100%',
                  // backgroundColor: 'red',
                }}
              >
                <Video
                  ref={videoRef}
                  source={{ uri: item.mediaURL }}
                  resizeMode="cover"
                  shouldPlay={false}
                  // isPause={true}
                  isLooping={true}
                  style={{
                    alignSelf: 'center',
                    aspectRatio: 1 / 1,
                    // width: undefined,s
                    height: '100%',
                    // filter: 'alpha(op)',
                  }}
                />
                <Video
                  ref={videoRef}
                  source={{ uri: item.mediaURL }}
                  resizeMode="contain"
                  shouldPlay={
                    screenIsFocused &&
                    viewable.length &&
                    viewable[0]._id === item._id
                  }
                  isLooping={true}
                  style={{
                    position: 'absolute',
                    alignSelf: 'center',
                    aspectRatio: 1 / 1.5,
                    width: undefined,
                    height: '100%',
                  }}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
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
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginHorizontal: 8,
                }}
              >
                {isLiked ? (
                  <Ionicons
                    name="md-heart-sharp"
                    style={{
                      marginVertical: 1,
                      marginRight: 5,
                    }}
                    size={28}
                    color="red"
                    onPress={toggleLike}
                  />
                ) : (
                  <Ionicons
                    name="ios-heart-outline"
                    style={{
                      marginVertical: 1,
                      marginRight: 5,
                    }}
                    size={28}
                    color={appTheme === '#F7F9FC' ? 'black' : 'white'}
                    onPress={toggleLike}
                  />
                )}
                {totalLikes > 0 && (
                  <Text
                    category="s2"
                    style={{ color: isLiked ? 'red' : 'gray' }}
                  >
                    {totalLikes}
                  </Text>
                )}
              </View>
              <EvilIcons
                name="comment"
                style={{
                  marginVertical: 3,
                  marginHorizontal: 10,
                }}
                size={33}
                color={appTheme === '#F7F9FC' ? 'black' : 'white'}
                onPress={routeComments}
              />
              <Entypo
                name="forward"
                size={26}
                color={appTheme === '#F7F9FC' ? 'black' : 'white'}
                style={{
                  marginVertical: 1,
                  marginHorizontal: 10,
                }}
                onPress={
                  () => handleSend(data)
                  // props.navigation.navigate('DeepLinkPost', { _id: item._id })
                  // handleSend(data)
                }
              />
            </View>
            {/* <View>
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
            </View> */}
          </View>
          {/* comments */}
          <FeedsComments postId={data.item._id} gotoComment={routeComments} />
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
                  source={{ uri: userImg }}
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
                  placeholderTextColor="rgba(40, 63,100, 1)"
                  onChangeText={(text) => setText(text)}
                  style={{
                    height: 40,
                    paddingHorizontal: 5,
                    backgroundColor: 'rgba(10, 50, 90, 0.1)',
                    borderRadius: 10,
                    color: appTheme === '#F7F9FC' ? 'black' : 'white',
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
                  <Text
                    category="c1"
                    {...momentProps}
                    style={{ fontSize: 10 }}
                  />
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
              backgroundColor: 'transparent',
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
            {item.userId !== _userId ? (
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
            ) : (
              <Button
                appearance="ghost"
                status="basic"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                }}
                onPress={() => deletePost(item._id)}
              >
                <Text style={{ fontSize: 16 }} status="basic">
                  Delete Post
                </Text>
              </Button>
            )}
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
            <Divider style={{ marginVertical: 2, width: '100%' }} />
            <Button
              appearance="ghost"
              status="basic"
              style={{
                width: '100%',
                justifyContent: 'center',
              }}
              onPress={() => handleShare('entries', item._id)}
            >
              <Text style={{ fontSize: 16 }} status="basic">
                {t('shareTo')}
              </Text>
            </Button>
          </Layout>
        </RBSheet>
        {/* <PlayVideoModal />  */}
        <RBSheet
          ref={sendSheet}
          height={400}
          closeOnDragDown
          animationType="fade"
          customStyles={{
            container: {
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'transparent',
            },
          }}
        >
          <Layout
            level="5"
            style={{
              flex: 1,
              width: '100%',
              // paddingBottom: 30,
            }}
          >
            <View
              style={{
                height: '90%',
              }}
            >
              <View
                style={{
                  borderTopRightRadius: 5,
                  borderTopLeftRadius: 5,
                  marginHorizontal: 20,
                  marginTop: 15,
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Text category="h6" status="primary">
                  Share Post To
                </Text>
                <Feather
                  name="x"
                  size={24}
                  color="#2E5894"
                  onPress={() => sendSheet.current.close()}
                />
              </View>
              <Search
                route={_route}
                shareToDm={true}
                shareToDmFn={(_name, _guestUserId, _guestUserImg) =>
                  sharePostToDm(
                    _userId,
                    _guestUserId, //user's dm
                    shareLink,
                    _name,
                    _guestUserImg,
                  )
                }
              />
            </View>
          </Layout>
        </RBSheet>
      </Root>
    ),
    [
      data,
      isBookmarked,
      isLiked,
      totalLikes,
      following,
      navigation,
      text,
      comments,
    ],
  );
}
