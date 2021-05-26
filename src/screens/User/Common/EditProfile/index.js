import React, { useContext, useEffect, useState } from 'react';

// prettier-ignore
import {
  View, ScrollView, ActivityIndicator, Image, TouchableOpacity,
} from 'react-native';

// prettier-ignore
import {
  Layout, Button, Text,
  RadioGroup, Radio,
  Datepicker
} from '@ui-kitten/components';
import RNFetchBlob from 'rn-fetch-blob';

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
  const [token, setToken] = useState('');
  const [user_id, setUserId] = useState('');
  const [userImage, setUserImage] = useState('');

  const [coverImage, setCoverImage] = useState('');
  const [selectedValue, setSelectedValue] = useState(null);
  const [date, setDate] = useState(new Date());

  const [form, setFormValues] = useState({
    fName: '',
    sName: '',
    displayName: '',
    sex: '',
    dob: '',
    country: '',
    state: '',
    bio: '',
    imgUrl: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const getUserProfile = (user_id) => {
    setLoading(true);
    AsyncStorage.getItem('USER_AUTH_TOKEN')
      .then((res) => {
        axios
          .get(`user?userId=${user_id}`, { headers: { Authorization: res } })
          .then((response) => {
            setLoading(false);
            const user_data = response.data.user;
            const first_name = user_data.fName;
            const last_name = user_data.sName;
            const user_name = user_data.displayName;
            const sex = user_data.sex;
            const imageUrl = user_data.imgUrl;
            const coverPhotoUrl = user_data.coverPhotoUrl;
            const bio = user_data.bio;
            setUserImage(imageUrl);
            setCoverImage(coverPhotoUrl);
            if (sex === 'Male') {
              setSelectedValue(1);
            } else {
              setSelectedValue(0);
            }
            const dob = user_data.dob;
            if (dob === null) {
              setDate(new Date());
            } else {
              setDate(new Date(dob));
            }

            setFormValues((prevState) => ({
              ...prevState,
              fName: first_name,
              sName: last_name,
              displayName: user_name,
              sex: sex,
              dob: dob,
              bio: bio,
            }));
            console.log(user_data);
          })
          .catch((err) => {
            setLoading(false);
            console.log(err.response);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateProfile = () => {
    setLoading(true);
    const data = form;
    axios
      .put(`update/?userId=${user_id}`, data, {
        headers: { Authorization: token },
      })
      .then((res) => {
        setLoading(false);
        const message = res.data.message;
        alert(message);
      })
      .catch((err) => {
        setLoading(false);
        console.log('err', err.response);
      });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      AsyncStorage.getItem('userid')
        .then((response) => {
          getUserProfile(response);
          setUserId(response);
        })
        .catch((err) => err);
      AsyncStorage.getItem('USER_AUTH_TOKEN')
        .then((res) => {
          setToken(res);
        })
        .catch((err) => err);
    });

    return unsubscribe;
  }, [navigation]);

  const t = useContext(LocaleContext);

  const selectCoverImage = async () => {
    await getLibraryPermission();

    const imageFile = await libraryImagePicker([4, 3]);

    if (!imageFile?.uri) return;

    setCoverImage(imageFile.uri);
    setFormValues((prevState) => ({
      ...prevState,
      coverPhotoUrl: imageFile.uri,
    }));
  };

  const selectUserImage = async () => {
    await getLibraryPermission();

    const imageFile = await libraryImagePicker([1, 1]);

    if (!imageFile?.uri) return;

    setUserImage(imageFile.uri);
    console.log('image uri', imageFile.uri);
    // const base64image = await RNFetchBlob.fs.readFile(imageFile.uri, 'base64');

    setFormValues((prevState) => ({ ...prevState, imgUrl: imageFile.uri }));
  };
  const setSelectedHandler = (index) => {
    setSelectedValue(index);
    setFormValues((prevState) => ({
      ...prevState,
      sex: index === 0 ? 'Female' : 'Male',
    }));
  };
  const setNewDateHandler = (date) => {
    setDate(date);
    setFormValues((prevState) => ({
      ...prevState,
      dob: date,
    }));
  };

  // console.log('forms', form);
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
                  type="fName"
                  label={t('firstName')}
                  autoCompleteType="name"
                  textContentType="givenName"
                  // validate="required"
                  value={form.fName}
                  setFormValues={setFormValues}
                />
              </View>
              <View style={{ flex: 1, marginLeft: 5 }}>
                <GeneralTextField
                  type="sName"
                  label={t('lastName')}
                  autoCompleteType="name"
                  textContentType="familyName"
                  // validate="required"
                  value={form.sName}
                  setFormValues={setFormValues}
                />
              </View>
            </View>
            <View style={{ paddingVertical: 5 }}>
              <GeneralTextField
                type="displayName"
                label={t('username')}
                autoCompleteType="username"
                textContentType="username"
                // validate="required"
                value={form.displayName}
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
                <Text category="label" appearance="hint">
                  {t('gender')}
                </Text>
                <RadioGroup
                  selectedIndex={selectedValue}
                  onChange={(index) => setSelectedHandler(index)}
                >
                  {GENDERS.map((option) => (
                    <Radio key={option}>{option}</Radio>
                  ))}
                </RadioGroup>
                {/* <GeneralRadioGroup
                  type="sex"
                  label={t('gender')}
                  data={GENDERS}
                  selectedValue= {selectedValue}
                  value={form.sex}
                  setFormValues={setFormValues}
                /> */}
              </View>
              <View style={{ flex: 1, marginLeft: 5 }}>
                <Datepicker
                  label={t('dob')}
                  date={date}
                  onSelect={(nextDate) => setNewDateHandler(nextDate)}
                  min={new Date('12-05-1880')}
                  max={new Date()}
                  accessoryRight={IconCalendar}
                />
                {/* <GeneralDatePicker
                  type="dob"
                  label={t('dob')}
                  setFormValues={setFormValues}
                  accessoryRight={IconCalendar}
                /> */}
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
                // validate="required"
                value={form.bio}
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
                onPress={() => updateProfile()}
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
