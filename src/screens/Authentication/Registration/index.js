import React, { useState } from 'react';

import { View } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { Layout, Button } from '@ui-kitten/components';

import TopNavigationArea from '~src/components/TopNavigationArea';

import { RegularInput } from '~src/components/CustomInputs';

import { RegularText, BoldText } from '~src/components/CustomTexts';

import {
  IconFacebook,
  IconGoogle,
  IconTwitter,
} from '~src/components/CustomIcons';

const getInputState = (condition) => {
  switch (condition) {
    case true:
      return 'danger';
    case false:
      return 'success';
    default:
      return 'basic';
  }
};

// eslint-disable-next-line react/prop-types
export default function RegisterMin({ navigation }) {
  const [values, setValues] = useState({
    email: '',
  });

  const [inputState, setInputState] = useState({
    status: 'basic',
    caption: 'Enter your email address to continue',
  });

  const updateEmailValue = (newValue) => {
    setValues((prevState) => ({ ...prevState, email: newValue }));

    const re = /\S+@\S+\.\S+/;

    if (re.test(newValue)) {
      setInputState((prevState) => ({
        ...prevState,
        ...{ status: 'success', caption: 'Click the button below to continue' },
      }));
    } else {
      setInputState((prevState) => ({
        ...prevState,
        ...{ status: 'danger', caption: 'Please enter a valid email address' },
      }));
    }
  };

  // eslint-disable-next-line react/prop-types
  const routeLogin = () => navigation.navigate('Login');

  // eslint-disable-next-line react/prop-types
  const routeRegisterFull = () => navigation.navigate('RegisterFull');

  return (
    <Layout level="1" style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, paddingHorizontal: 15, paddingVertical: 25 }}>
          <TopNavigationArea
            title="Sign Up"
            navigation={navigation}
            iconType="close"
          />
          <View style={{ paddingVertical: 10 }}>
            <View style={{ paddingVertical: 10 }}>
              <RegularInput
                value={values.email}
                label="Email"
                accessibilityLabel="Email"
                placeholder="Enter email address"
                autoCapitalize="none"
                autoCompleteType="email"
                textContentType="emailAddress"
                caption={inputState.caption}
                captionIcon={inputState.status}
                status={inputState.status}
                autoFocus
                autoCorrect={false}
                onChangeText={updateEmailValue}
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
                disabled={inputState.status !== 'success'}
              >
                <RegularText appearance="alternative">Continue</RegularText>
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
              <RegularText category="p2">
                By Continuing, you agree to Woozeee&apos;s
              </RegularText>
              <Button appearance="ghost" size="tiny">
                <BoldText status="primary" category="p2">
                  Terms and condition
                </BoldText>
              </Button>
              <RegularText category="p2">
                and confirm that you have read Woozeee&apos;s
              </RegularText>
              <Button appearance="ghost" size="tiny">
                <BoldText status="primary" category="p2">
                  Privacy policy
                </BoldText>
              </Button>
            </View>
            <View
              style={{
                alignItems: 'center',
                paddingTop: 50,
                paddingBottom: 10,
              }}
            >
              <RegularText>Or continue with</RegularText>
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
                <RegularText>Google</RegularText>
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
                <RegularText appearance="alternative">Facebook</RegularText>
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
                <RegularText appearance="alternative">Twitter</RegularText>
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
              <RegularText>Already have an account?</RegularText>
              <Button appearance="ghost" size="tiny" onPress={routeLogin}>
                <BoldText status="primary">Sign in</BoldText>
              </Button>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </Layout>
  );
}
