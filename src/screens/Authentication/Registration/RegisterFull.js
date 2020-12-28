import React, { useState } from 'react';

import { View } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { Layout, Button } from '@ui-kitten/components';

import TopNavigationArea from '~src/components/TopNavigationArea';

import { RegularInput, SecureInput } from '~src/components/CustomInputs';

import { RegularText, BoldText } from '~src/components/CustomTexts';

// eslint-disable-next-line react/prop-types
export default function RegisterFull({ navigation }) {
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const updateInputValues = (newValue, name) => {
    setValues((prevState) => ({ ...prevState, ...{ [name]: newValue } }));
  };

  // eslint-disable-next-line react/prop-types
  const routeLogin = () => navigation.navigate('Login');

  // eslint-disable-next-line react/prop-types
  const routeVerification = () => navigation.navigate('Verification');

  return (
    <Layout level="1" style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, paddingHorizontal: 15, paddingVertical: 25 }}>
          <TopNavigationArea title="Sign Up" navigation={navigation} />
          <View style={{ paddingVertical: 10 }}>
            <View
              style={{
                paddingVertical: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <RegularInput
                value={values.firstName}
                label="First name"
                accessibilityLabel="First name"
                placeholder="First name"
                autoCapitalize="words"
                autoCompleteType="name"
                textContentType="givenName"
                autoFocus
                autoCorrect={false}
                onChangeText={(value) => updateInputValues(value, 'firstName')}
                style={{ flex: 1, marginRight: 5 }}
              />
              <RegularInput
                value={values.lastName}
                label="Last name"
                accessibilityLabel="Last name"
                placeholder="Last name"
                autoCapitalize="words"
                autoCompleteType="name"
                textContentType="familyName"
                autoCorrect={false}
                onChangeText={(value) => updateInputValues(value, 'lastName')}
                style={{ flex: 1, marginLeft: 5 }}
              />
            </View>
            <View style={{ paddingVertical: 10 }}>
              <RegularInput
                value={values.username}
                label="Username"
                accessibilityLabel="Username"
                placeholder="Enter Username"
                autoCapitalize="none"
                autoCompleteType="username"
                textContentType="username"
                autoCorrect={false}
                onChangeText={(value) => updateInputValues(value, 'username')}
              />
            </View>
            <View style={{ paddingVertical: 10 }}>
              <SecureInput
                value={values.password}
                label="Password"
                accessibilityLabel="Password"
                placeholder="Enter your password"
                autoCapitalize="none"
                autoCompleteType="password"
                textContentType="newPassword"
                autoCorrect={false}
                onChangeText={(value) => updateInputValues(value, 'password')}
              />
            </View>
            <View style={{ paddingVertical: 10 }}>
              <SecureInput
                value={values.confirmPassword}
                label="Confirm Password"
                accessibilityLabel="Confirm Password"
                placeholder="Confirm Password"
                autoCapitalize="none"
                autoCompleteType="password"
                textContentType="newPassword"
                autoCorrect={false}
                /* prettier-ignore */
                onChangeText={(value) => updateInputValues(value, 'confirmPassword')}
              />
            </View>
            <View style={{ paddingVertical: 10 }}>
              <Button
                status="danger"
                size="large"
                accessibilityLiveRegion="assertive"
                accessibilityComponentType="button"
                accessibilityLabel="Continue"
                onPress={routeVerification}
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
