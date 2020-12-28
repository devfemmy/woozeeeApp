import React, { useState } from 'react';

import { View } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { Layout, Button, Text } from '@ui-kitten/components';

import TopNavigationArea from '~src/components/TopNavigationArea';

import { RegularInput } from '~src/components/CustomInputs';

// eslint-disable-next-line react/prop-types
export default function RecoverWithEmail({ navigation }) {
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
  const routeRegister = () => navigation.navigate('Registration');

  return (
    <Layout level="1" style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, paddingHorizontal: 15, paddingVertical: 25 }}>
          <TopNavigationArea title="Recover account" navigation={navigation} />
          <View style={{ paddingVertical: 10 }}>
            <View style={{ paddingVertical: 10 }}>
              <RegularInput
                value={values.email}
                label="Email"
                accessibilityLabel="Email"
                placeholder="Enter your email address"
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
            <View style={{ paddingVertical: 20 }}>
              <Button
                status="danger"
                size="large"
                accessibilityLiveRegion="assertive"
                accessibilityComponentType="button"
                accessibilityLabel="Continue"
                disabled={inputState.status !== 'success'}
              >
                <Text style={{ color: 'white' }}>Continue</Text>
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
              <Text>Don&apos;t have an account?</Text>
              <Button appearance="ghost" size="tiny" onPress={routeRegister}>
                <Text category="h6" status="primary">
                  Sign up
                </Text>
              </Button>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </Layout>
  );
}
