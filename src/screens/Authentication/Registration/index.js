import React, { useState } from 'react';

import { View, ScrollView } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { Layout, Button, Text } from '@ui-kitten/components';

import TopNavigationArea from '~src/components/TopNavigationArea';

import { RegularInput } from '~src/components/CustomInputs';

import {
  IconFacebook,
  IconGoogle,
  IconTwitter,
} from '~src/components/CustomIcons';

import { verifyEmail } from '~src/components/FormVerification';

// eslint-disable-next-line react/prop-types
export default function Register({ navigation }) {
  const [form, setFormValues] = useState({
    email: {
      value: '',
      status: 'basic',
      caption: 'Enter your email address to continue',
    },
  });

  const handleChangeEmail = (newEmail) => {
    const currentState = verifyEmail(newEmail);

    setFormValues((prevState) => ({
      ...prevState,
      email: { ...currentState, value: newEmail },
    }));
  };

  // eslint-disable-next-line react/prop-types
  const routeLogin = () => navigation.navigate('Login');

  // eslint-disable-next-line react/prop-types
  const routeRegisterFull = () => navigation.navigate('RegisterFull');

  return (
    <Layout level="4" style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <TopNavigationArea
          title="Registration"
          navigation={navigation}
          icon="close"
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
              <View style={{ paddingVertical: 10 }}>
                <RegularInput
                  value={form.email.value}
                  label="Email"
                  accessibilityLabel="Email"
                  placeholder="Enter email address"
                  autoCapitalize="none"
                  autoCompleteType="email"
                  textContentType="emailAddress"
                  caption={form.email.caption}
                  captionIcon={form.email.status}
                  status={form.email.status}
                  autoFocus
                  autoCorrect={false}
                  onChangeText={handleChangeEmail}
                />
              </View>
              <View style={{ paddingVertical: 10 }}>
                <Button
                  status="danger"
                  size="large"
                  accessibilityLiveRegion="assertive"
                  accessibilityComponentType="button"
                  accessibilityLabel="Continue"
                  onPress={routeRegisterFull}
                  disabled={form.email.status !== 'success'}
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
                }}
              >
                <Text category="p2">
                  By Continuing, you agree to woozeee&apos;s
                </Text>
                <Button appearance="ghost" size="tiny">
                  <Text status="primary" category="s2">
                    Terms and condition
                  </Text>
                </Button>
                <Text category="p2">
                  and confirm that you have read woozeee&apos;s
                </Text>
                <Button appearance="ghost" size="tiny">
                  <Text status="primary" category="s2">
                    Privacy policy
                  </Text>
                </Button>
              </View>
              <View
                style={{
                  alignItems: 'center',
                  paddingTop: 50,
                  paddingBottom: 10,
                }}
              >
                <Text>Or continue with</Text>
              </View>
              <View style={{ paddingVertical: 10 }}>
                <Button
                  status="primary"
                  size="medium"
                  appearance="outline"
                  accessoryLeft={IconGoogle}
                  accessibilityLiveRegion="polite"
                  accessibilityComponentType="button"
                  accessibilityLabel="Login with Google"
                  style={{ marginVertical: 5 }}
                >
                  <Text>Google</Text>
                </Button>
                <Button
                  status="primary"
                  size="medium"
                  accessoryLeft={IconFacebook}
                  accessibilityLiveRegion="polite"
                  accessibilityComponentType="button"
                  accessibilityLabel="Login with Facebook"
                  style={{ marginVertical: 5 }}
                >
                  <Text appearance="alternative">Facebook</Text>
                </Button>
                <Button
                  status="info"
                  size="medium"
                  accessoryLeft={IconTwitter}
                  accessibilityLiveRegion="polite"
                  accessibilityComponentType="button"
                  accessibilityLabel="Login with Twitter"
                  style={{ marginVertical: 5 }}
                >
                  <Text appearance="alternative">Twitter</Text>
                </Button>
              </View>
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
                  <Text status="primary" category="h6">
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
