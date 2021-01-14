import React, { useState } from 'react';

import { View, ScrollView } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { Layout, Button, Text } from '@ui-kitten/components';

import TopNavigationArea from '~src/components/TopNavigationArea';

import { RegularInput } from '~src/components/CustomInputs';

import { verifyEmail } from '~src/components/FormVerification';

// eslint-disable-next-line react/prop-types
export default function RecoverWithEmail({ navigation }) {
  const [form, setFormValues] = useState({
    email: {
      value: '',
      status: 'basic',
      caption: 'Enter your email address to continue',
    },
  });

  const updateFormEmail = (inputEmail) => {
    const currentState = verifyEmail(inputEmail);

    setFormValues((prevState) => ({
      ...prevState,
      email: { ...currentState, value: inputEmail },
    }));
  };

  // eslint-disable-next-line react/prop-types
  const routeRegister = () => navigation.navigate('Register');

  return (
    <Layout level="4" style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <TopNavigationArea
          title="Account Recovery"
          navigation={navigation}
          page="auth"
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
                  placeholder="Enter your email address"
                  autoCapitalize="none"
                  autoCompleteType="email"
                  textContentType="emailAddress"
                  caption={form.email.caption}
                  captionIcon={form.email.status}
                  status={form.email.status}
                  autoFocus
                  autoCorrect={false}
                  onChangeText={updateFormEmail}
                />
              </View>
              <View style={{ paddingVertical: 20 }}>
                <Button
                  status="danger"
                  size="large"
                  accessibilityLiveRegion="assertive"
                  accessibilityComponentType="button"
                  accessibilityLabel="Continue"
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
                <Text>Don&apos;t have an account?</Text>
                <Button appearance="ghost" size="tiny" onPress={routeRegister}>
                  <Text category="h6" status="primary">
                    Sign up
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
