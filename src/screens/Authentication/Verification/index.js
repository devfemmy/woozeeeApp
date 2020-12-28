import React, { useState } from 'react';

import { View } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { Layout, Button } from '@ui-kitten/components';

import TopNavigationArea from '~src/components/TopNavigationArea';

import { RegularInput } from '~src/components/CustomInputs';

import { RegularText, BoldText } from '~src/components/CustomTexts';

// eslint-disable-next-line react/prop-types
export default function VerifyWithCode({ navigation }) {
  const [values, setValues] = useState({
    code: '',
  });

  const updateCodeValue = (newValue) => {
    setValues((prevState) => ({ ...prevState, email: newValue }));
  };

  // eslint-disable-next-line react/prop-types
  const routeLogin = () => navigation.navigate('Login');

  return (
    <Layout level="1" style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, paddingHorizontal: 15, paddingVertical: 25 }}>
          <TopNavigationArea title="Verify account" navigation={navigation} />
          <View style={{ paddingVertical: 10 }}>
            <View style={{ paddingVertical: 10 }}>
              <RegularInput
                value={values.email}
                label="Code"
                accessibilityLabel="Code"
                placeholder="Enter Verification Code"
                autoCapitalize="none"
                autoCompleteType="off"
                textContentType="oneTimeCode"
                autoFocus
                autoCorrect={false}
                onChangeText={updateCodeValue}
              />
              <Button
                size="tiny"
                appearance="ghost"
                style={{ alignSelf: 'flex-end' }}
              >
                <RegularText status="primary" category="s2">
                  Resend Code
                </RegularText>
              </Button>
            </View>
            <View style={{ paddingVertical: 20 }}>
              <Button
                status="danger"
                size="large"
                accessibilityLiveRegion="assertive"
                accessibilityComponentType="button"
                accessibilityLabel="Continue"
              >
                <RegularText appearance="alternative">Submit</RegularText>
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
