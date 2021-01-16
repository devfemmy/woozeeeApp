import React, { useState } from 'react';

import { View, ScrollView } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { Layout, Button, Text } from '@ui-kitten/components';

import useToast from '~src/hooks/useToast';

import TopNavigationArea from '~src/components/TopNavigationArea';

import { PasswordField, GeneralTextField } from '~src/components/FormFields';

// eslint-disable-next-line react/prop-types
export default function RegisterFull({ navigation }) {
  useToast('Click again to go back');

  const [isLoading, setLoading] = useState(false);

  const [form, setFormValues] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  // eslint-disable-next-line react/prop-types
  const routeLogin = () => navigation.navigate('Login');

  // eslint-disable-next-line react/prop-types
  const routeVerifyWithCode = () => navigation.navigate('VerifyWithCode');

  return (
    <Layout level="4" style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <TopNavigationArea
          title="Registration Details"
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
                <PasswordField
                  setFormValues={setFormValues}
                  label="Password"
                  type="password"
                />
              </View>
              <View style={{ paddingVertical: 10 }}>
                <PasswordField
                  setFormValues={setFormValues}
                  label="Confirm Password"
                  type="confirmPassword"
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
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                  paddingVertical: 10,
                }}
              >
                <Text>Already have an account?</Text>
                <Button appearance="ghost" size="tiny" onPress={routeLogin}>
                  <Text category="h6" status="primary">
                    Sign in
                  </Text>
                </Button>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Layout>
  );
}
