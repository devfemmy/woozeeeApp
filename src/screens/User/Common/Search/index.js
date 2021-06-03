import React, { useEffect, useState, useContext } from 'react';

import { View, ScrollView, Image, TouchableOpacity } from 'react-native';

import Api from 'src/api';

import Moment from 'react-moment';

import { LinearGradient } from 'expo-linear-gradient';

import { Input, Layout, List, Text, Divider } from '@ui-kitten/components';

import TopNavigationArea from 'src/components/TopNavigationArea';

import { LocaleContext } from 'src/contexts';

import { IconSearch } from 'src/components/CustomIcons';

import BackButton from '../../../../components/TopNavigationArea/components/BackButton';

// import WithDefaultFetch from 'src/components/DataFetch';

// import { UsersPosts } from 'src/components/VideoPosts';

// import { challengeUrl } from 'src/api/dummy';

// const PLACEHOLDER_CONFIG = {
//   count: 6,
//   numColumns: 2,
//   maxHeight: 180,
//   mediaLeft: true,
// };

const UserTemplate = ({ userProfilePic, displayName }) => {
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
          // onPress={routeChats}
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
              source={userProfilePic}
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

export default function Search({ navigation }) {
  // prettier-ignore
  // const UserPostsArea = () => WithDefaultFetch(UsersPosts, challengeUrl, PLACEHOLDER_CONFIG);

  const [form, setFormValues] = useState({
    value: '',
    status: 'basic',
  });

  // console.log(form.value);

  const t = useContext(LocaleContext);

  const handleChange = (inputSearch) => {
    setFormValues((prevState) => ({
      ...prevState,
      value: inputSearch,
    }));
  };

  const userList = [];

  const fetchUsers = async () => {
    const res = await Api.getAllUsers(form.value);
    const { users } = res;
    users.forEach((user) => userList.push(user));
    console.log(userList);
  };

  useEffect(() => {
    fetchUsers();
  }, [form.value]);

  return (
    <Layout level="6" style={{ flex: 1 }}>
      {/* <TopNavigationArea navigation={navigation} screen="search" /> */}
      <View
        // {...props}
        style={{
          width: '100%',
          // paddingLeft: 55,
          // paddingRight: 55,
          display: 'flex',
          flexDirection: 'row',
          // justifyContent: '',
          alignItems: 'center',
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
            marginLeft: 10,
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
      <ScrollView
        style={{ flex: 1, paddingVertical: 10 }}
        alwaysBounceVertical
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={{ paddingBottom: 20 }}>
          <View style={{ paddingHorizontal: 15 }}>
            <UserTemplate
              userProfilePic={require('../../../../assets/images/user/user1.png')}
              displayName="Tosin Olowoyo"
            />
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
}

{
  /* <List
              style={{
                flex: 1,
                backgroundColor: 'transparent',
              }}
              // alwaysBounceVertical
              // showsHorizontalScrollIndicator={false}
              // showsVerticalScrollIndicator={false}
              // removeClippedSubviews
              // ListHeaderComponentStyle={{
              //   paddingVertical: 10,
              //   borderBottomWidth: 1,
              //   borderColor: 'rgba(143, 155, 179, 0.08)',
              // }}
              data={userList}
              keyExtractor={(_, i) => i.toString()}
              renderItem={(user) =>
                user ? (
                  <UserTemplate
                    userProfilePic={require('../../../../assets/images/user/user1.png')}
                    displayName={user.fullName}
                  />
                ) : (
                  <Text
                    category="h6"
                    appearance="hint"
                    style={{ textAlign: 'center' }}
                  >
                    User not found
                  </Text>
                )
              }
            /> */
}
