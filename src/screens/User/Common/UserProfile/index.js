import React, { useContext, useState } from 'react';

import {
  View,
  Image,
  ScrollView,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

import Api from 'src/api';

// prettier-ignore
import {
  Layout, Text, Button, Tab, TabView, Divider,
} from '@ui-kitten/components';

import { LoadingContext, LocaleContext } from 'src/contexts';

import useModifiedAndroidBackAction from 'src/hooks/useModifiedAndroidBackAction';

import WithPaginatedFetch from 'src/components/DataFetch/WithPaginatedFetch';

import { ProfilePosts, LikedProfilePosts } from 'src/components/SocialPosts';

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
  WithPaginatedFetch(ProfilePosts, userPostsUrl, PLACEHOLDER_CONFIG, userPostData)
);

const ProfilePostLikedArea = ({ userPostData }) =>
  WithPaginatedFetch(
    ProfilePosts,
    userPostsUrl,
    PLACEHOLDER_CONFIG,
    userPostData,
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
    setFollowing(following);
    await handleFollow(userData.userId, !following);
  };

  useModifiedAndroidBackAction(navigation, 'SocialRoute');

  const { width, height } = useWindowDimensions();

  const t = useContext(LocaleContext);

  const [selectedIndex, setSelectedIndex] = useState(0);

  const shouldLoadComponent = (index) => index === selectedIndex;

  const IS_PORTRAIT = height > width;

  const routeFollow = () => navigation.navigate('Follow');

  const goBack = () => navigation.goBack();

  return (
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
          }}
        >
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
              {/* <View
                style={{
                  marginBottom: 10,
                  marginTop: 5,
                  flexDirection: 'row',
                }}
              > */}
              {/* <Button
                  status="primary"
                  appearance="outline"
                  size="tiny"
                  style={{
                    marginHorizontal: 5,
                    width: 120,
                  }}
                  onPress={routeEditProfile}
                >
                  <Text status="primary" category="c2">
                    {`${t('edit')} ${t('profile')}`}
                  </Text>
                </Button> */}
              {/* <Button
                  status="primary"
                  appearance="outline"
                  size="tiny"
                  style={{ width: 100, minHeight: 35 }}
                >
                  <Text status="primary" category="c2">
                    {t('follow')}
                  </Text>
                </Button> */}
              {/* </View> */}
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
            <ProfilePostsArea userPostData={user} />
          </Tab>
          <Tab title={t('liked')} icon={IconHeart}>
            <ProfilePostLikedArea userPostData={user} />
          </Tab>
        </TabView>
      </View>
    </Layout>
  );
}
