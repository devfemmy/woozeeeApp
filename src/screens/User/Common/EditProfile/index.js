import React, { useState, useEffect } from 'react';

import {
  View,
  ScrollView,
  Image,
  Platform,
  Alert,
  TouchableOpacity,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import * as ImagePicker from 'expo-image-picker';

// prettier-ignore
import {
  Layout, Button, Text,
} from '@ui-kitten/components';

import TopNavigationArea from '~src/components/TopNavigationArea';

import {
  GeneralTextField,
  GeneralRadioGroup,
  GeneralSelect,
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

const pickImage = async (handleImage, aspect) => {
  try {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect,
      quality: 1,
    });

    if (!result.cancelled) handleImage(result.uri);
  } catch (e) {
    const msg = e;
  }
};

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
    bio: '',
    country: '',
    state: '',
  });

  useEffect(() => {
    (async () => {
      try {
        if (Platform.OS !== 'web') {
          const {
            status,
          } = await ImagePicker.requestMediaLibraryPermissionsAsync();

          if (status !== 'granted') {
            Alert.alert(
              'Permission Denied',
              'Permission is required to access Library',
              [{ text: 'Ok', style: 'default' }],
            );
          }
        }
      } catch (e) {
        const msg = e;
      }
    })();
  }, []);

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
                  height: 100,
                  position: 'absolute',
                  width: '100%',
                  zIndex: 1,
                }}
                onPress={() => pickImage(setCoverImage, [4, 3])}
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
                  bottom: 0,
                  height: 100,
                  position: 'absolute',
                  width: 100,
                  zIndex: 3,
                }}
                onPress={() => pickImage(setUserImage, [1, 1])}
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
              <View style={{ paddingVertical: 5 }}>
                <GeneralRadioGroup
                  type="gender"
                  label="Gender"
                  data={GENDER}
                  setFormValues={setFormValues}
                />
              </View>
              <View style={{ paddingVertical: 5 }}>
                <GeneralTextField
                  type="bio"
                  label="Bio"
                  multiline
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
