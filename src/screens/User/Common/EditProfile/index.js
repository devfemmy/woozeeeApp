import React, { useState } from 'react';

import { View, ScrollView } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

// prettier-ignore
import {
  Layout, Button, Text, Radio, RadioGroup,
} from '@ui-kitten/components';

import TopNavigationArea from '~src/components/TopNavigationArea';

import {
  PasswordField,
  GeneralTextField,
  GeneralRadioGroup,
} from '~src/components/FormFields';

const GENDER = ['Female', 'Male'];

// eslint-disable-next-line react/prop-types
export default function EditProfile({ navigation }) {
  const [isLoading, setLoading] = useState(false);

  const [form, setFormValues] = useState({
    firstName: '',
    lastName: '',
    username: '',
    gender: '',
  });

  // eslint-disable-next-line react/prop-types
  const routeVerifyWithCode = () => navigation.navigate('VerifyWithCode');

  return (
    <Layout level="4" style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <TopNavigationArea
          title="Update Profile"
          navigation={navigation}
          screen="auth"
        />
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={{
              flex: 1,
              padding: 15,
            }}
          >
            <View style={{ paddingBottom: 10 }}>
              <View
                style={{
                  paddingVertical: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <View style={{ flex: 1, marginRight: 5 }}>
                  <GeneralTextField
                    setFormValues={setFormValues}
                    label="First name"
                    type="firstName"
                    androidComplete="name"
                    iosComplete="givenName"
                  />
                </View>
                <View style={{ flex: 1, marginLeft: 5 }}>
                  <GeneralTextField
                    setFormValues={setFormValues}
                    label="Last name"
                    type="lastName"
                    androidComplete="name"
                    iosComplete="familyName"
                  />
                </View>
              </View>
              <View style={{ paddingVertical: 10 }}>
                <GeneralTextField
                  setFormValues={setFormValues}
                  label="Username"
                  type="username"
                  androidComplete="username"
                  iosComplete="username"
                />
              </View>
              <View style={{ paddingVertical: 10 }}>
                <GeneralRadioGroup
                  type="gender"
                  label="Gender"
                  data={GENDER}
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
                  onPress={routeVerifyWithCode}
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
