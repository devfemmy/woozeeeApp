import React, { useContext, useState } from 'react';

import {
  View,
  Image,
  ScrollView,
  useWindowDimensions,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

import Api from 'src/api';
import { Video } from 'expo-av';

// prettier-ignore
import {
  Layout, Text, Button, Tab, TabView, Divider,
} from '@ui-kitten/components';

import { SimpleLineIcons } from '@expo/vector-icons';

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
} from 'src/components/CustomIcons';

import {
  getUserEntries,
  handleFollow,
} from '../../../../services/Requests/index';

import { userPostsUrl } from 'src/api/dummy';
import { useEffect } from 'react';

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
  const { user } = route.params;

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
    userData,
  } = user;

  const [videoData, setVideoData] = useState({});

  // console.log(videoData);

  const getLikedData = async () => {
    const res = await Api.getLikedPosts(_id);
    const {
      pageData: { data },
    } = res;
    // console.log('inside fn => ', data);
    data.forEach((entry) => likedData.push(entry));
  };

  useEffect(() => {
    getLikedData();
  }, []);

  const [following, setFollowing] = useState(
    userData ? userData.isFollow : false,
  );

  const toggleFollow = async () => {
    setFollowing(!following);
    await handleFollow(userData.userId, !following);
    // console.log('pressed');
  };

  useModifiedAndroidBackAction(navigation, 'SocialRoute');

  const { width, height } = useWindowDimensions();

  const t = useContext(LocaleContext);

  const [selectedIndex, setSelectedIndex] = useState(0);

  const shouldLoadComponent = (index) => index === selectedIndex;

  const IS_PORTRAIT = height > width;

  const routeFollow = () => navigation.navigate('Follow');

  const goBack = () => navigation.goBack();

  // const [modalState, setModalState] = useState(false);

  // const PlayVideoModal = () => {
  //   return (
  //     <View>
  //       <Modal
  //         style={{
  //           backgroundColor: 'transparent',
  //           borderTopLeftRadius: 20,
  //           borderTopRightRadius: 20,
  //         }}
  //         animationType="slide"
  //         position="center"
  //         isOpen={modalState}
  //         coverScreen={true}
  //         swipeToClose={true}
  //       >
  //         <Video
  //           source={{ uri: videoData.mediaURL }}
  //           isLooping={true}
  //           shouldPlay={modalState}
  //           resizeMode="cover"
  //           usePoster
  //           posterSource={
  //             videoData.medialThumbnail
  //               ? { uri: videoData.medialThumbnail }
  //               : require('assets/images/banner/placeholder-image.png')
  //           }
  //           style={{
  //             flex: 1,
  //             marginVertical: 150,
  //             marginHorizontal: 10,
  //             borderRadius: 15,
  //           }}
  //         />
  //       </Modal>
  //     </View>
  //   );
  // };
console.log("image", imgUrl)
  return (
    <Layout level="6" style={{ flex: 1 }}>
      {/* <PlayVideoModal /> */}
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
            source={require('assets/images/banner/profile.jpg')}
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
                source={imgUrl}
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
            onPress= {() => navigation.navigate('ChatScreen', {guestUid: _id, name: `${fName} ${sName}`})}
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
              {following ? t('following') : t('follow')}
            </Text>
          </Button>
        </View>
      </View>
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
          <ScrollView
            style={{ flex: 1 }}
            alwaysBounceVertical
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
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
                <View
                  style={{
                    maxWidth: 300,
                    marginBottom: 10,
                  }}
                >
                  <Text
                    category="c2"
                    appearance="hint"
                    style={{
                      lineHeight: 15,
                    }}
                    numberOfLines={3}
                  >
                    {bio}
                  </Text>
                </View>
              </View>
              <View style={{ marginBottom: 10 }}>
                <Text category="h6" status="primary">
                  {/* {referralCode.toUpperCase()} */}
                </Text>
              </View>
              <View
                style={{
                  marginBottom: 10,
                  marginTop: 5,
                  flexDirection: 'row',
                }}
              ></View>
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
                  onPress={routeFollow}
                >
                  <Text category="h5">{followersCount}</Text>
                  <Text category="c2" appearance="hint">
                    {t('followers')}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.75}
                  style={{ alignItems: 'center', width: '33%' }}
                  onPress={routeFollow}
                >
                  <Text category="h5">{followingCount}</Text>
                  <Text category="c2" appearance="hint">
                    {t('following')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
        <Divider />
        {/* {console.log('from ... -> ', likedData)} */}

        <TabView
          style={{ flex: 1 }}
          indicatorStyle={{ backgroundColor: 'transparent' }}
          selectedIndex={selectedIndex}
          shouldLoadComponent={shouldLoadComponent}
          onSelect={(index) => setSelectedIndex(index)}
        >
          <Tab title={t('all')} icon={IconGrid}>
            <ProfilePostsArea userPostData={user} />
          </Tab>
          <Tab title={t('saved')} icon={IconBookmark}>
            <ProfilePostsSavedArea userSavedData={user} />
          </Tab>
          <Tab title={t('liked')} icon={IconHeart}>
            <LikedProfilePosts userId={_id} />
          </Tab>
        </TabView>
      </View>
    </Layout>
  );
}
