import React, { useEffect, useState, useContext } from 'react';

import { View, ScrollView, Image, TouchableOpacity } from 'react-native';

import Api from 'src/api';

import Moment from 'react-moment';

import { LinearGradient } from 'expo-linear-gradient';

import { Input, Layout, List, Text, Divider } from '@ui-kitten/components';

import TopNavigationArea from 'src/components/TopNavigationArea';

import { LocaleContext } from 'src/contexts';

import { IconSearch } from 'src/components/CustomIcons';

import { getUserData } from '../../../../services/Requests/index';

import BackButton from '../../../../components/TopNavigationArea/components/BackButton';
import UserRoute from 'src/router/User/index';

const UserTemplate = ({
  userProfilePic,
  displayName,
  userId,
  navigation,
  chat,
}) => {
  const routeUserProfile = async () => {
    const userData = await getUserData(userId);
    const { data } = userData;
    console.log('my Data', data);
    if (chat === true) {
      await navigation.navigate('ChatScreen', {
        name: `${data.user.fName} ${data.user.sName}`,
        guestUid: data.user._id,
        image: data.user.imgUrl,
      });
    } else {
      await navigation.navigate('UserProfile', data);
    }
  };

  return (
    <>
      <Layout
        level="6"
        style={{
          marginVertical: 5,
          paddingHorizontal: 10,
          paddingVertical: 5,
        }}
      >
        <TouchableOpacity
          activeOpacity={0.75}
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            // justifyContent: 'center',
            paddingHorizontal: 5,
            // paddingVertical: 5,
          }}
          onPress={routeUserProfile}
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
              source={{ uri: userProfilePic }}
              style={{
                height: 30,
                width: 30,
                borderRadius: 15,
                borderColor: 'white',
              }}
            />
          </LinearGradient>
          <View style={{ flex: 1, marginHorizontal: 10 }}>
            <Text category="s2">{displayName}</Text>
          </View>
        </TouchableOpacity>
      </Layout>
      <Divider />
    </>
  );
};

export default function Search({ navigation, route }) {
  // prettier-ignore
  // const UserPostsArea = () => WithDefaultFetch(UsersPosts, challengeUrl, PLACEHOLDER_CONFIG);
  const {chat} = route.params;
  const [form, setFormValues] = useState({
    value: '',
    status: 'basic',
  });

  const t = useContext(LocaleContext);

  const handleChange = (inputSearch) => {
    setFormValues((prevState) => ({
      ...prevState,
      value: inputSearch,
    }));
  };

  const [userList, setUserList] = useState([]);

  const fetchUsers = async () => {
    const res = await Api.getAllUsers(form.value);
    const { users } = res;
    setUserList([...users]);
  };

  useEffect(() => {
    fetchUsers();
  }, [form.value]);

  console.log('USER LIST ', userList);

  return (
    <Layout level="6" style={{ flex: 1 }}>
      {/* <TopNavigationArea navigation={navigation} screen="search" /> */}
      <View
        // {...props}
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 10,
          marginHorizontal: 15,
        }}
      >
        <BackButton
          style={{
            marginLeft: 10,
          }}
          navigation={navigation}
        />
        <Input
          style={{
            width: '70%',
            marginHorizontal: 20,
          }}
          size="medium"
          value={form.value}
          accessibilityLabel="Search"
          placeholder={`${t('search')}`}
          status={form.status}
          onChangeText={handleChange}
          accessoryLeft={IconSearch}
        />
      </View>

      {userList.length > 0 ? (
        <List
          style={{ backgroundColor: 'transparent', paddingVertical: 10 }}
          alwaysBounceVertical
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={userList}
          keyExtractor={(_, i) => i.toString()}
          renderItem={(user, index) =>
            form.value.length > 1 ? (
              <UserTemplate
                key={index}
                userProfilePic={user.item.imgUrl}
                displayName={`${user.item.fName} ${user.item.sName}`}
                userId={user.item._id}
                navigation={navigation}
              />
            ) : (
              <UserTemplate
                key={index}
                chat={chat}
                userProfilePic={user.item.imgUrl}
                displayName={`${user.item.fName} ${user.item.sName}`}
                userId={user.item._id}
                navigation={navigation}
              />
            )
          }
          getItemLayout={(data, index) => ({
            length: 150,
            offset: 150 * index,
            index,
          })}
        />
      ) : null}

      {/* <ScrollView
        style={{ flex: 1, paddingVertical: 10 }}
        alwaysBounceVertical
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={{ paddingBottom: 20 }}>
          <View style={{ paddingHorizontal: 15 }}>
            {userList.map((user, index) => (
              <UserTemplate
                key={index}
                userProfilePic={require('../../../../assets/images/user/user1.png')}
                displayName={`${user.fName} ${user.sName}`}
                userId={user._id}
                navigation={navigation}
              />
            ))}
          </View>
        </View>
      </ScrollView> */}
    </Layout>
  );
}
