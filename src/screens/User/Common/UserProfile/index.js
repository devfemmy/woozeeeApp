import React, { useContext, useState, useEffect, useMemo } from 'react';

import {
  View,
  Image,
  ScrollView,
  useWindowDimensions,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
  Alert,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

import Api from 'src/api';
import { Video } from 'expo-av';

// prettier-ignore
import {
  Layout, Text, Button, Tab, TabView, Divider,
} from '@ui-kitten/components';

import {
  SimpleLineIcons,
  AntDesign,
  Ionicons,
  FontAwesome,
  MaterialIcons,
} from '@expo/vector-icons';

import { LoadingContext, LocaleContext } from 'src/contexts';

import useModifiedAndroidBackAction from 'src/hooks/useModifiedAndroidBackAction';

import WithPaginatedFetch from 'src/components/DataFetch/WithPaginatedFetch';

import { ProfilePosts, LikedProfilePosts } from 'src/components/SocialPosts';

import Modal from 'react-native-modalbox';

import InteractIcon from 'src/components/InteractIcon';

import {
  IconGrid,
  IconBookmark,
  IconHeart,
  IconBackIos,
  IconSettings,
} from 'src/components/CustomIcons';

import {
  getUserEntries,
  handleFollow,
  handleBlock,
  getUserData,
} from '../../../../services/Requests/index';

import { userPostsUrl } from 'src/api/dummy';

import AsyncStorage from '@react-native-async-storage/async-storage';

const PLACEHOLDER_CONFIG = {
  count: 4,
  numColumns: 2,
  maxHeight: 150,
  mediaLeft: true,
};

// prettier-ignore
const ProfilePostsArea = ({userPostData}) => (
  WithPaginatedFetch(ProfilePosts , userPostsUrl, PLACEHOLDER_CONFIG, userPostData)
);

const ProfilePostsSavedArea = ({ userSavedData }) =>
  WithPaginatedFetch(
    ProfilePosts,
    userPostsUrl,
    PLACEHOLDER_CONFIG,
    userSavedData,
  );

export default function UserProfile({ route, navigation }) {
  const renderSpinner = () => {
    return (
      <Layout level="6" style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            // backgroundColor: 'transparent',
          }}
        >
          <ActivityIndicator size="large" color="#FF5757" />
        </View>
      </Layout>
    );
  };

  const { id } = route.params;

  const [user, setUser] = useState([]);

  const [loading, setLoading] = useState(false);

  const [isAllSelected, setAllSelected] = useState(true);

  function toggleTab() {
    if (isAllSelected) {
      setAllSelected(!isAllSelected);
    } else {
      return;
    }
  }

  const fetchUserProfileData = async () => {
    setLoading(true);
    const userData = await getUserData(id);
    const { data: user } = userData;
    setLoading(false);
    setUser(user.user);
  };

  const routeSettings = () => navigation.navigate('Settings');

  const routeEditProfile = () => navigation.navigate('EditProfile');

  const [currUserId, setCurrUserId] = useState('');

  let likedData = [];

  const {
    _id,
    displayName,
    email,
    fName,
    sName,
    bio,
    referralCode,
    totalEntries,
    followersCount,
    followingCount,
    imgUrl,
    coverPhotoUrl,
    userData,
  } = user;

  const getLikedData = async () => {
    const res = await Api.getLikedPosts(_id);
    const {
      pageData: { data },
    } = res;
    data.forEach((entry) => likedData.push(entry));
  };

  const getUserId = async () => {
    const res = await AsyncStorage.getItem('userid');
    setCurrUserId(res);
  };

  getUserId();
  useEffect(() => {
    fetchUserProfileData();
    getLikedData();
  }, []);

  console.log(user);

  const [following, setFollowing] = useState(
    userData !== undefined ? userData.isFollow : false,
  );

  const [block, setBlock] = useState(user ? user.isBlocked : false);

  const toggleFollow = async () => {
    setFollowing(!following);
    const res = await handleFollow(id, !following);
    console.log('res', res);
  };

  const toggleBlock = () => {
    Alert.alert(
      !block ? 'Block User' : 'Unblock User',
      !block &&
        "You won't be to see this user's posts. Are you sure you want to proceed ?",
      [
        {
          text: 'Cancel',
          onPress: () => {
            return;
          },
          style: 'cancel',
        },
        {
          text: 'Proceed',
          onPress: async () => {
            setBlock(!block);
            const res = await handleBlock(userData.userId, !block);
            console.log(res);
          },
        },
      ],
    );
  };

  useModifiedAndroidBackAction(navigation, 'SocialRoute');

  const { width, height } = useWindowDimensions();

  const t = useContext(LocaleContext);

  const [selectedIndex, setSelectedIndex] = useState(0);

  const shouldLoadComponent = (index) => index === selectedIndex;

  const IS_PORTRAIT = height > width;

  const routeFollow = (action) =>
    navigation.navigate('Follow', {
      userID: _id,
      action,
      username: displayName,
    });

  const goBack = () => navigation.goBack();

  return useMemo(
    () =>
      loading ? (
        renderSpinner()
      ) : (
        <Layout level="6" style={{ flex: 1 }}>
          <View
            style={{
              position: 'relative',
              height: 165,
              width: '100%',
              alignItems: 'flex-start',
            }}
          >
            <View
              style={{
                backgroundColor: '#EDF1F7',
                height: 120,
                position: 'absolute',
                width: '100%',
                zIndex: 1,
              }}
            >
              <Image
                source={{ uri: coverPhotoUrl }}
                defaultSource={require('assets/images/banner/profile.jpg')}
                style={{
                  height: '100%',
                  resizeMode: 'cover',
                  width: '100%',
                }}
                resizeMode="cover"
              />
            </View>

            <View
              style={{
                position: 'absolute',
                zIndex: 5,
                margin: 15,
                left: 0,
                top: 0,
              }}
            >
              <InteractIcon
                Accessory={(evaProps) => <IconBackIos {...evaProps} />}
                height={26}
                width={26}
                onPress={goBack}
              />
            </View>
            <View
              style={{
                position: 'absolute',
                zIndex: 5,
                margin: 15,
                right: 0,
                top: 0,
              }}
            >
              <InteractIcon
                Accessory={(evaProps) => <IconSettings {...evaProps} />}
                height={26}
                width={26}
                onPress={routeSettings}
              />
            </View>
            <View
              style={{
                backgroundColor: '#EDF1F7',
                bottom: 0,
                borderRadius: 52,
                height: 104,
                position: 'absolute',
                width: 104,
                zIndex: 3,
                marginLeft: 15,
              }}
            >
              <View style={{ position: 'relative' }}>
                <LinearGradient
                  colors={['#043F7C', '#FF5757']}
                  style={{
                    height: 104,
                    width: 104,
                    borderRadius: 52,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Image
                    source={{ uri: imgUrl }}
                    defaultSource={imgUrl}
                    style={{
                      height: 100,
                      width: 100,
                      borderRadius: 50,
                    }}
                    resizeMode="cover"
                  />
                </LinearGradient>
                <Image
                  source={require('assets/images/icon/verified.png')}
                  defaultSource={require('assets/images/icon/verified.png')}
                  style={{
                    height: 22,
                    width: 22,
                    borderRadius: 11,
                    position: 'absolute',
                    right: 4,
                    bottom: 8,
                  }}
                  resizeMode="cover"
                />
              </View>
            </View>
            {currUserId !== user._id ? (
              <View
                style={{
                  bottom: 0,
                  position: 'absolute',
                  zIndex: 3,
                  right: 0,
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <TouchableOpacity
                  onPress={toggleBlock}
                  status="primary"
                  style={{
                    borderColor: block ? 'red' : '#003153',
                    borderWidth: 1,
                    marginHorizontal: 7,
                    width: 30,
                    height: 30,
                    borderRadius: 30,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <AntDesign
                    name="deleteuser"
                    size={20}
                    color={block ? 'red' : '#003153'}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('ChatScreen', {
                      guestUid: _id,
                      name: `${fName} ${sName}`,
                      image: imgUrl,
                    })
                  }
                  status="primary"
                  style={{
                    // backgroundColor: 'transparent',
                    borderColor: '#003153',
                    borderWidth: 1,
                    marginHorizontal: 5,
                    width: 30,
                    height: 30,
                    borderRadius: 30,
                    alignItems: 'center',
                    // padding: 5,
                    justifyContent: 'center',
                  }}
                >
                  <SimpleLineIcons name="envelope" size={18} color="#003153" />
                </TouchableOpacity>
                <Button
                  status="primary"
                  size="tiny"
                  style={{
                    marginHorizontal: 15,
                    width: 100,
                    minHeight: 35,
                  }}
                  onPress={toggleFollow}
                >
                  <Text status="control" category="c2">
                    {!following ? t('following') : t('follow')}
                  </Text>
                </Button>
              </View>
            ) : (
              <View
                style={{
                  bottom: 0,
                  position: 'absolute',
                  zIndex: 3,
                  right: 0,
                  width: '30%',
                  justifyContent: 'flex-end',
                  flexDirection: 'row',
                }}
              >
                <Button
                  status="primary"
                  size="tiny"
                  style={{
                    marginHorizontal: 15,
                    width: '100%',
                    minHeight: 35,
                  }}
                  onPress={routeEditProfile}
                >
                  <Text status="control" category="c2">
                    {`${t('edit')} ${t('profile')}`}
                  </Text>
                </Button>
              </View>
            )}
          </View>
          {/* <ScrollView> */}
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              width: '100%',
            }}
          >
            <View
              style={{
                height: IS_PORTRAIT ? 180 : '100%',
                width: IS_PORTRAIT ? '100%' : '40%',
              }}
            >
              <View style={{ flex: 1 }}>
                <View
                  style={{
                    paddingHorizontal: 15,
                    paddingBottom: 10,
                    paddingTop: 5,
                  }}
                >
                  <View>
                    <View
                      style={{
                        marginBottom: 10,
                        marginTop: 5,
                        alignItems: 'center',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                      }}
                    >
                      <Text category="h6">
                        {fName} {sName}
                      </Text>
                      <Text style={{ marginHorizontal: 5 }}>|</Text>
                      <Text category="c2" appearance="hint">
                        {displayName}
                      </Text>
                    </View>
                    <View>
                      <Text category="c2" appearance="hint" numberOfLines={3}>
                        {bio}
                      </Text>
                    </View>
                  </View>
                  <View style={{ marginVertical: 15 }}>
                    <Text category="s2" status="primary">
                      Referral Code: {referralCode?.toUpperCase()}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      width: '100%',
                    }}
                  >
                    <View style={{ alignItems: 'center', width: '33%' }}>
                      <Text category="h5">{totalEntries}</Text>
                      <Text category="c2" appearance="hint">
                        {t('posts')}
                      </Text>
                    </View>
                    <TouchableOpacity
                      activeOpacity={0.75}
                      style={{ alignItems: 'center', width: '33%' }}
                      onPress={() => routeFollow('followers')}
                    >
                      <Text category="h5">{followersCount}</Text>
                      <Text category="c2" appearance="hint">
                        {t('followers')}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      activeOpacity={0.75}
                      style={{ alignItems: 'center', width: '33%' }}
                      onPress={() => routeFollow('following')}
                    >
                      <Text category="h5">{followingCount}</Text>
                      <Text category="c2" appearance="hint">
                        {t('following')}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
            {/* <Divider /> */}
            <View
              style={{
                height: 50,
                backgroundColor: 'transparent',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: 10,
                marginVertical: 10,
              }}
            >
              <TouchableOpacity onPress={() => setAllSelected(true)}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    paddingHorizontal: 50,
                    alignItems: 'center',
                    backgroundColor: isAllSelected ? '#043F7C' : '#E8EAF6',
                    borderColor: '#043F7C',
                    borderWidth: 1,
                    height: '100%',
                    borderRadius: 5,
                    marginHorizontal: 5,
                  }}
                >
                  <MaterialIcons
                    name="dashboard"
                    size={30}
                    color={isAllSelected ? 'white' : '#043F7C'}
                  />
                  {isAllSelected ? (
                    <Text style={{ color: 'white', marginHorizontal: 5 }}>
                      All
                    </Text>
                  ) : (
                    <Text style={{ color: '#043F7C', marginHorizontal: 5 }}>
                      All
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={toggleTab}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: 50,
                    alignItems: 'center',
                    backgroundColor: !isAllSelected ? '#043F7C' : '#E8EAF6',
                    borderColor: '#043F7C',
                    borderWidth: 1,
                    height: '100%',
                    borderRadius: 5,
                    marginHorizontal: 5,
                  }}
                >
                  <AntDesign
                    name="heart"
                    size={28}
                    color={!isAllSelected ? 'white' : '#043F7C'}
                  />
                  {!isAllSelected ? (
                    <Text style={{ color: 'white', marginHorizontal: 5 }}>
                      Liked
                    </Text>
                  ) : (
                    <Text style={{ color: '#043F7C', marginHorizontal: 5 }}>
                      Liked
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
            </View>
            {isAllSelected ? (
              <ProfilePostsArea userPostData={user} />
            ) : (
              <LikedProfilePosts userId={_id} />
            )}

            {/* <TabView
              style={{ flex: 1 }}
              indicatorStyle={{ backgroundColor: 'transparent' }}
              selectedIndex={selectedIndex}
              shouldLoadComponent={shouldLoadComponent}
              onSelect={(index) => setSelectedIndex(index)}
            >
              <Tab title={t('all')} icon={IconGrid}>
                <ProfilePostsArea userPostData={user} />
              </Tab>
              <Tab title={t('liked')} icon={IconHeart}>
                <LikedProfilePosts userId={_id} />
              </Tab>
            </TabView> */}
          </View>
          {/* </ScrollView> */}
        </Layout>
      ),
    [
      user,
      block,
      user.isBlocked,
      user.userData,
      loading,
      following,
      isAllSelected,
    ],
  );
}
