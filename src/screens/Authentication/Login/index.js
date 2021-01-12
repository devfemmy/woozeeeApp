import React, { useState, useContext } from 'react';

import { View, ScrollView } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

// prettier-ignore
import {
  Layout, Button, Text, Spinner,
} from '@ui-kitten/components';

import { AuthContext } from '~src/contexts';

import useMounted from '~src/hooks/useMounted';

import TopNavigationArea from '~src/components/TopNavigationArea';

import { RegularInput, SecureInput } from '~src/components/CustomInputs';

import { verifyEmail } from '~src/components/FormVerification';

// eslint-disable-next-line react/prop-types
export default function Login({ navigation }) {
  // prettier-ignore
  const {
    authOptions,
  } = useContext(AuthContext);

  const { login } = authOptions;

  const isMounted = useMounted();

  const [isLoading, setLoading] = useState(false);

  const [errorMsg, setErrorMsg] = useState({
    auth: null,
  });

  const [form, setFormValues] = useState({
    email: {
      value: '',
      status: 'basic',
      caption: 'Enter your email address to continue',
    },
    password: {
      value: '',
      status: 'basic',
    },
  });

  const updateFormEmail = (inputEmail) => {
    const currentState = verifyEmail(inputEmail);

    setFormValues((prevState) => ({
      ...prevState,
      email: { ...currentState, value: inputEmail },
    }));
  };

  const updateFormPassword = (newPassword) => {
    setFormValues((prevState) => ({
      ...prevState,
      password: { ...prevState.password, value: newPassword },
    }));
  };

  const loginUser = async () => {
    let loginError = null;

    try {
      await setLoading(true);
      const formObj = {
        email: form.email.value,
        password: form.password.value,
      };

      if (formObj.email && formObj.password) {
        loginError = await login(formObj);
      } else {
        loginError = 'Email and Password fields are required';
      }
    } catch (e) {
      loginError = e;
    } finally {
      await setErrorMsg((prevState) => ({
        ...prevState,
        auth: loginError,
      }));

      if (isMounted) await setLoading(false);
    }
  };

  const renderSpinner = () => <Spinner size="tiny" status="danger" />;

  // eslint-disable-next-line react/prop-types
  const routeRegister = () => navigation.navigate('Register');

  // eslint-disable-next-line react/prop-types
  const routeRecoverWithEmail = () => navigation.navigate('RecoverWithEmail');

  return (
    <Layout level="4" style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <TopNavigationArea
          title="Sign in"
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
              {errorMsg.auth ? (
                <View
                  style={{
                    paddingVertical: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                  }}
                >
                  <Text status="danger" category="label">
                    Error!
                    {/* prettier-ignore */}{' '}
                  </Text>
                  <Text status="danger" category="p2">
                    {errorMsg.auth}
                  </Text>
                </View>
              ) : null}
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
              <View style={{ paddingVertical: 10 }}>
                <SecureInput
                  value={form.password.value}
                  label="Password"
                  accessibilityLabel="Password"
                  placeholder="Enter your password"
                  autoCapitalize="none"
                  autoCompleteType="password"
                  textContentType="password"
                  autoCorrect={false}
                  onChangeText={updateFormPassword}
                />
                <Button
                  size="tiny"
                  appearance="ghost"
                  style={{ alignSelf: 'flex-end' }}
                  onPress={routeRecoverWithEmail}
                >
                  <Text status="primary" category="s2">
                    Forgot password?
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
                  accessoryLeft={isLoading ? renderSpinner : null}
                  onPress={loginUser}
                  disabled={isLoading || form.email.status !== 'success'}
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
        </ScrollView>
      </SafeAreaView>
    </Layout>
  );
}
