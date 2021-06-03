import React, { useContext, useEffect, useState } from 'react';

import {
  View,
  Image,
  ScrollView,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

// prettier-ignore
import {
  Layout, Text, Button, Tab, TabView, Divider,
} from '@ui-kitten/components';

import { LoadingContext, LocaleContext } from 'src/contexts';

import useModifiedAndroidBackAction from 'src/hooks/useModifiedAndroidBackAction';

import WithPaginatedFetch from 'src/components/DataFetch/WithPaginatedFetch';

import { ProfilePosts } from 'src/components/SocialPosts';

import InteractIcon from 'src/components/InteractIcon';

import {
  IconGrid,
  IconBookmark,
  IconHeart,
  IconSettings,
} from 'src/components/CustomIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from '../../../../../services/api';

import { trendingUrl } from 'src/api/dummy';

const PLACEHOLDER_CONFIG = {
  count: 4,
  numColumns: 2,
  maxHeight: 150,
  mediaLeft: true,
};

// prettier-ignore
const ProfilePostsArea = ({testData}) => (
  WithPaginatedFetch(ProfilePosts, trendingUrl, PLACEHOLDER_CONFIG, testData)
);

export default function Profile({ navigation }) {
  useModifiedAndroidBackAction(navigation, 'SocialRoute');

  const { width, height } = useWindowDimensions();

  const t = useContext(LocaleContext);

  const [user, setUser] = useState({});

  const [form, setFormValues] = useState({
    fName: '',
    sName: '',
    email: '',
    bio: '',
    imgUrl: '',
    followersCount: '',
    followingCount: '',
    videoCount: '',
  });

  const [selectedIndex, setSelectedIndex] = useState(0);

  const shouldLoadComponent = (index) => index === selectedIndex;

  const IS_PORTRAIT = height > width;

  const routeMessaging = () => navigation.navigate('Messaging');

  const routeEditProfile = () => navigation.navigate('EditProfile');

  const routeFollow = () => navigation.navigate('Follow');

  const routeSettings = () => navigation.navigate('Settings');

  const getUserProfile = (user_id) => {
    // setLoading(true)
    AsyncStorage.getItem('USER_AUTH_TOKEN')
      .then((res) => {
        axios
          .get(`user/user?userId=${user_id}`, { headers: { Authorization: res } })
          .then((response) => {
            // setLoading(false)
            const user_data = response.data.user;
            const first_name = user_data.fName;
            const last_name = user_data.sName;
            const bio = user_data.bio;
            const email = user_data.email;
            const imageUrl = user_data.imgUrl;
            const coverPhotoUrl = user_data.coverPhotoUrl
            const videoCount = user_data.videoCount;
            const followingCount = user_data.followingCount;
            const followersCount = user_data.followersCount;
            setFormValues((prevState) => ({
              ...prevState,
              fName: first_name,
              sName: last_name,
              email: email,
              bio: bio,
              imageUrl: imageUrl,
              coverPhotoUrl: coverPhotoUrl,
              videoCount: videoCount,
              followersCount: followersCount,
              followingCount: followingCount,
            }));
            setUser(user_data);
          })
          .catch((err) => {
            // setLoading(false)
            console.log(err.response);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      AsyncStorage.getItem('userid')
        .then((response) => {
          getUserProfile(response);
        })
        .catch((err) => err);
    });

    return unsubscribe;
  }, [navigation]);
  return (
    <Layout level="6" style={{ flex: 1 }}>
      <ScrollView>
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
               source={{ uri: form.coverPhotoUrl }}
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
                  source={{ uri: form.imageUrl }}
                  defaultSource={require('assets/images/user/user2.png')}
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
              width: '30%',
              justifyContent: 'flex-end',
              flexDirection: 'row'
            }}
          >
            {/* <Button
              status="primary"
              appearance="outline"
              size="tiny"
              style={{ marginHorizontal: 5, width: 100, minHeight: 35 }}
              onPress={routeMessaging}
            >
              <Text status="primary" category="c2">
                {t('messaging')}
              </Text>
            </Button> */}
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
              // height: IS_PORTRAIT ? 180 : '100%',
              width: IS_PORTRAIT ? '100%' : '40%',
              // backgroundColor: 'blue'
            }}
          >
            <View
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
                    <Text category="h6">{`${form.fName} ${form.sName}`}</Text>
                    <Text style={{ marginHorizontal: 5 }}>|</Text>
                    <Text category="c2" appearance="hint">
                      {form.email}
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
                      {form.bio}
                    </Text>
                  </View>
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
                    <Text category="h5">{form.videoCount}</Text>
                    <Text category="c2" appearance="hint">
                      {t('posts')}
                    </Text>
                  </View>
                  <TouchableOpacity
                    activeOpacity={0.75}
                    style={{ alignItems: 'center', width: '33%' }}
                    onPress={routeFollow}
                  >
                    <Text category="h5">{form.followersCount}</Text>
                    <Text category="c2" appearance="hint">
                      {t('followers')}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.75}
                    style={{ alignItems: 'center', width: '33%' }}
                    onPress={routeFollow}
                  >
                    <Text category="h5">{form.followingCount}</Text>
                    <Text category="c2" appearance="hint">
                      {t('following')}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          <Divider />
          <TabView
            style={{ flex: 1 }}
            indicatorStyle={{ backgroundColor: 'transparent' }}
            selectedIndex={selectedIndex}
            shouldLoadComponent={shouldLoadComponent}
            onSelect={(index) => setSelectedIndex(index)}
          >
            <Tab title={t('all')} icon={IconGrid}>
              <ProfilePostsArea testData={user} />
            </Tab>
            <Tab title={t('saved')} icon={IconBookmark}>
              <ProfilePostsArea testData={user} />
            </Tab>
            <Tab title={t('liked')} icon={IconHeart}>
              <ProfilePostsArea testData={user} />
            </Tab>
          </TabView>
        </View>
      </ScrollView>
    </Layout>
  );
}
