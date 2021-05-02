import React, { useContext, useState } from 'react';

// prettier-ignore
import {
  View, ScrollView, Image, TouchableOpacity,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

// prettier-ignore
import {
  Layout, Button, Text,
} from '@ui-kitten/components';

import { LocaleContext } from 'src/contexts';

import TopNavigationArea from 'src/components/TopNavigationArea';

import ImageVideoPicker from 'src/utilities/ImageVideoPicker';
import getLibraryPermission from 'src/utilities/getLibraryPermission';

import InteractIcon from 'src/components/InteractIcon';

import {
  GeneralTextField,
  GeneralRadioGroup,
  GeneralSelect,
  GeneralDatePicker,
} from 'src/components/FormFields';

import { IconCalendar, IconBackIos } from 'src/components/CustomIcons';

import countries from './countries.json';
import states from './states.json';

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

  const goBack = () => navigation.goBack();

  return (
    <Layout level="6" style={{ flex: 1 }}>
      {/* <TopNavigationArea
        title={`${t('edit')} ${t('profile')}`}
        navigation={navigation}
        screen="auth"
      /> */}
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
              alignItems: 'flex-start',
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
              onPress={selectCoverImage}
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
            </TouchableOpacity>
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
            <TouchableOpacity
              activeOpacity={0.75}
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
              onPress={selectUserImage}
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
                    source={require('assets/images/user/user2.png')}
                    defaultSource={require('assets/images/user/user2.png')}
                    style={{
                      height: 100,
                      width: 100,
                      borderRadius: 50,
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
                      top: 40,
                      left: 40,
                      tintColor: 'white',
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
            </TouchableOpacity>
          </View>
          {/* <View
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
          </View> */}
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
