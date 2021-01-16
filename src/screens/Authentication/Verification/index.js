import React, { useState } from 'react';

import { View, ScrollView } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { Layout, Button, Text } from '@ui-kitten/components';

import TopNavigationArea from '~src/components/TopNavigationArea';

import { OneTimeCodeField } from '~src/components/FormFields';

// eslint-disable-next-line react/prop-types
export default function VerifyWithCode({ navigation }) {
  const [isLoading, setLoading] = useState(false);

  const [form, setFormValues] = useState({
    code: '',
  });
  // eslint-disable-next-line react/prop-types
  const routeLogin = () => navigation.navigate('Login');

  return (
    <Layout level="4" style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <TopNavigationArea
          title="Account Verification"
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
              <View style={{ paddingVertical: 10 }}>
                <OneTimeCodeField setFormValues={setFormValues} />
                <Button
                  size="tiny"
                  appearance="ghost"
                  style={{ alignSelf: 'flex-end' }}
                >
                  <Text status="primary" category="s2">
                    Resend Code
                  </Text>
                </Button>
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
                  <Text status="control">Submit</Text>
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
