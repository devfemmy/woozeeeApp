import React, { useState } from 'react';

import { View, ScrollView, Image, TouchableOpacity } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

// prettier-ignore
import {
  Layout, Button, Text,
} from '@ui-kitten/components';

import useImagePicker from '~src/hooks/useImagePicker';

import TopNavigationArea from '~src/components/TopNavigationArea';

import {
  GeneralTextField,
  GeneralRadioGroup,
  GeneralSelect,
  GeneralDatePicker,
} from '~src/components/FormFields';

const GENDER = ['Female', 'Male'];

const COUNTRIES = [
  { title: 'Nigeria' },
  { title: 'Japan' },
  { title: 'India' },
  { title: 'Korea' },
  { title: 'United states' },
];

const STATES = [
  { title: 'Lagos' },
  { title: 'Imo' },
  { title: 'Abuja' },
  { title: 'Kaduna' },
  { title: 'Adamawa' },
  { title: 'Zamfara' },
  { title: 'Zaria' },
  { title: 'Sokoto' },
  { title: 'Kaduna' },
];

// eslint-disable-next-line react/prop-types
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

  const libraryImagePicker = useImagePicker('Images');

  const selectCoverImage = async () => {
    const imageUri = await libraryImagePicker([4, 3]);
    setCoverImage(imageUri);
  };

  const selectUserImage = async () => {
    const imageUri = await libraryImagePicker([1, 1]);
    setUserImage(imageUri);
  };

  return (
    <Layout level="4" style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <TopNavigationArea
          title="Update Profile"
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
                height: 150,
                width: '100%',
                alignItems: 'center',
              }}
            >
              <TouchableOpacity
                activeOpacity={0.75}
                style={{
                  backgroundColor: '#EDF1F7',
                  height: 100,
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
                />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.75}
                style={{
                  backgroundColor: '#EDF1F7',
                  bottom: 0,
                  borderRadius: 100,
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
                    borderRadius: 100,
                    height: '100%',
                    resizeMode: 'cover',
                    width: '100%',
                  }}
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
                    label="First name"
                    androidComplete="name"
                    iosComplete="givenName"
                    validate="required"
                    setFormValues={setFormValues}
                  />
                </View>
                <View style={{ flex: 1, marginLeft: 5 }}>
                  <GeneralTextField
                    type="lastName"
                    label="Last name"
                    androidComplete="name"
                    iosComplete="familyName"
                    validate="required"
                    setFormValues={setFormValues}
                  />
                </View>
              </View>
              <View style={{ paddingVertical: 5 }}>
                <GeneralTextField
                  type="username"
                  label="Username"
                  androidComplete="username"
                  iosComplete="username"
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
                    label="Gender"
                    data={GENDER}
                    setFormValues={setFormValues}
                  />
                </View>
                <View style={{ flex: 1, marginLeft: 5 }}>
                  <GeneralDatePicker
                    type="dob"
                    label="Date of birth"
                    setFormValues={setFormValues}
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
                    label="Country"
                    data={COUNTRIES}
                    setFormValues={setFormValues}
                  />
                </View>
                <View style={{ flex: 1, marginLeft: 5 }}>
                  <GeneralSelect
                    type="state"
                    label="State"
                    data={STATES}
                    setFormValues={setFormValues}
                  />
                </View>
              </View>
              <View style={{ paddingVertical: 5 }}>
                <GeneralTextField
                  type="bio"
                  label="Bio"
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
                  <Text status="control">Continue</Text>
                </Button>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Layout>
  );
}
