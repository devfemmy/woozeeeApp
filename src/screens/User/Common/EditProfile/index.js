import React, { useContext, useEffect, useState } from 'react';

// prettier-ignore
import {
  View, ScrollView, Image, TouchableOpacity,
} from 'react-native';

// prettier-ignore
import {
  Layout, Button, Text,
} from '@ui-kitten/components';

import { LocaleContext } from 'src/contexts';

import TopNavigationArea from 'src/components/TopNavigationArea';

import ImageVideoPicker from 'src/utilities/ImageVideoPicker';
import getLibraryPermission from 'src/utilities/getLibraryPermission';

import {
  GeneralTextField,
  GeneralRadioGroup,
  GeneralSelect,
  GeneralDatePicker,
} from 'src/components/FormFields';

import { IconCalendar } from 'src/components/CustomIcons';

import countries from './countries.json';
import states from './states.json';
import axios from '../../../../services/api/index';
import AsyncStorage from '@react-native-async-storage/async-storage';

const COUNTRIES = countries;

const STATES = states;

const GENDERS = ['Female', 'Male'];

const libraryImagePicker = ImageVideoPicker('Images');

export default function EditProfile({ navigation }) {
  const [isLoading, setLoading] = useState(false);

  const [userImage, setUserImage] = useState(
    'https://i.postimg.cc/CMQvmvwQ/user1.png',
  );

  const [coverImage, setCoverImage] = useState(
    'https://i.postimg.cc/PJzQXxnN/back1.jpg',
  );

  const [form, setFormValues] = useState({
    firstName: '',
    lastName: '',
    username: '',
    gender: '',
    dob: '',
    country: '',
    state: '',
    bio: '',
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormValues(prevState => ({
        ...prevState,
        [name]: value
    }));
};

  const getUserProfile = (email) => {
    const id = AsyncStorage.getItem('USER_AUTH_TOKEN').then(
        res => {
            axios.get(`user?email=${email}`,{headers: {Authorization: res}})
            .then(
              response => {
               const user_data = response.data.user;
               const first_name = user_data.fName;
               const last_name = user_data.sName;
               const user_name = user_data.displayName
               setFormValues((prevState) => ({...prevState, 
                firstName: first_name, 
                lastName: last_name,
                username: user_name
              }))
               console.log(user_data)
              }
            )
            .catch(err => {                  
                  console.log(err.response)

            })
        }
    )
    .catch( err => {console.log(err)}) 
}

useEffect(() => {
    const email = AsyncStorage.getItem('email').then(
      response => {
        getUserProfile(response)
      }
    ).catch(
      err => err
    )
     
}, [])

  const t = useContext(LocaleContext);

  const selectCoverImage = async () => {
    await getLibraryPermission();

    const imageFile = await libraryImagePicker([4, 3]);

    if (!imageFile?.uri) return;

    setCoverImage(imageFile.uri);
  };

  const selectUserImage = async () => {
    await getLibraryPermission();

    const imageFile = await libraryImagePicker([1, 1]);

    if (!imageFile?.uri) return;

    setUserImage(imageFile.uri);
  };
  console.log("forms", form)
  return (
    <Layout level="6" style={{ flex: 1 }}>
      <TopNavigationArea
        title={`${t('edit')} ${t('profile')}`}
        navigation={navigation}
        screen="auth"
      />
      <ScrollView
        alwaysBounceVertical
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            flex: 1,
          }}
        >
          <View
            style={{
              position: 'relative',
              height: 165,
              width: '100%',
              alignItems: 'center',
            }}
          >
            <TouchableOpacity
              activeOpacity={0.75}
              style={{
                backgroundColor: '#EDF1F7',
                height: 120,
                position: 'absolute',
                width: '100%',
                zIndex: 1,
              }}
              onPress={() => selectCoverImage()}
            >
              <Image
                source={{ uri: coverImage }}
                style={{
                  height: '100%',
                  resizeMode: 'cover',
                  width: '100%',
                }}
                resizeMode="cover"
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.75}
              style={{
                backgroundColor: '#EDF1F7',
                bottom: 0,
                borderRadius: 50,
                height: 100,
                position: 'absolute',
                width: 100,
                zIndex: 3,
              }}
              onPress={() => selectUserImage()}
            >
              <Image
                source={{ uri: userImage }}
                style={{
                  borderColor: 'white',
                  borderWidth: 3,
                  borderRadius: 50,
                  height: '100%',
                  resizeMode: 'cover',
                  width: '100%',
                }}
                resizeMode="cover"
              />
              <Image
                source={require('assets/images/icon/camera-outline.png')}
                defaultSource={require('assets/images/icon/camera-outline.png')}
                style={{
                  position: 'absolute',
                  height: 26,
                  width: 26,
                  top: 37,
                  left: 37,
                }}
                resizeMode="cover"
              />
            </TouchableOpacity>
          </View>
          <View style={{ padding: 15 }}>
            <View
              style={{
                paddingVertical: 5,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <View style={{ flex: 1, marginRight: 5 }}>
                <GeneralTextField
                  type="firstName"
                  label={t('firstName')}
                  autoCompleteType="name"
                  textContentType="givenName"
                  validate="required"
                  value={form.firstName}
                  setFormValues={setFormValues}
                />
              </View>
              <View style={{ flex: 1, marginLeft: 5 }}>
                <GeneralTextField
                  type="lastName"
                  label={t('lastName')}
                  autoCompleteType="name"
                  textContentType="familyName"
                  validate="required"
                  value= {form.lastName}
                  setFormValues={setFormValues}
                />
              </View>
            </View>
            <View style={{ paddingVertical: 5 }}>
              <GeneralTextField
                type="username"
                label={t('username')}
                autoCompleteType="username"
                textContentType="username"
                validate="required"
                value= {form.username}
                setFormValues={setFormValues}
              />
            </View>
            <View
              style={{
                paddingVertical: 5,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <View style={{ flex: 1, marginRight: 5 }}>
                <GeneralRadioGroup
                  type="gender"
                  label={t('gender')}
                  data={GENDERS}
                  setFormValues={setFormValues}
                />
              </View>
              <View style={{ flex: 1, marginLeft: 5 }}>
                <GeneralDatePicker
                  type="dob"
                  label={t('dob')}
                  setFormValues={setFormValues}
                  accessoryRight={IconCalendar}
                />
              </View>
            </View>
            <View
              style={{
                paddingVertical: 5,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <View style={{ flex: 1, marginRight: 5 }}>
                <GeneralSelect
                  type="country"
                  label={t('country')}
                  data={COUNTRIES}
                  setFormValues={setFormValues}
                />
              </View>
              <View style={{ flex: 1, marginLeft: 5 }}>
                <GeneralSelect
                  type="state"
                  label={t('state')}
                  data={STATES}
                  setFormValues={setFormValues}
                />
              </View>
            </View>
            <View style={{ paddingVertical: 5 }}>
              <GeneralTextField
                type="bio"
                label={t('bio')}
                multiline
                height={50}
                validate="required"
                setFormValues={setFormValues}
              />
            </View>
            <View style={{ paddingVertical: 20 }}>
              <Button
                status="danger"
                size="large"
                accessibilityLiveRegion="assertive"
                accessibilityComponentType="button"
                accessibilityLabel="Continue"
                disabled={isLoading}
              >
                <Text status="control">{t('updateProfile')}</Text>
              </Button>
            </View>
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
}
