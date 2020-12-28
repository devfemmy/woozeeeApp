import React, { useState, useContext } from 'react';

import { View } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { Layout, Button, Text, Spinner } from '@ui-kitten/components';

import { AuthContext } from '~src/contexts';

import TopNavigationArea from '~src/components/TopNavigationArea';

import { RegularInput, SecureInput } from '~src/components/CustomInputs';

// eslint-disable-next-line react/prop-types
export default function Login({ navigation }) {
  // prettier-ignore
  const {
    authOptions,
  } = useContext(AuthContext);

  const [isLoading, setLoading] = useState(false);

  const { login } = authOptions;

  const [errorMsg, setErrorMsg] = useState({
    auth: null,
  });

  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const updateEmailValue = (newValue) => {
    setValues((prevState) => ({ ...prevState, email: newValue }));
  };

  const updatePasswordValue = (newValue) => {
    setValues((prevState) => ({ ...prevState, password: newValue }));
  };

  const loginUser = async () => {
    let loginError = null;

    try {
      await setLoading(true);
      if (values.email && values.password) {
        loginError = await login(values);
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
      await setLoading(false);
    }
  };

  const renderSpinner = () => <Spinner size="tiny" status="danger" />;

  // eslint-disable-next-line react/prop-types
  const routeRegister = () => navigation.navigate('Registration');

  // eslint-disable-next-line react/prop-types
  const routeRecovery = () => navigation.navigate('Recovery');

  return (
    <Layout level="1" style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, paddingHorizontal: 15, paddingVertical: 25 }}>
          <TopNavigationArea title="Sign in" navigation={navigation} />
          <View style={{ paddingVertical: 10 }}>
            <View
              style={{
                paddingVertical: 10,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
              }}
            >
              {errorMsg.auth ? (
                <>
                  <Text status="danger" category="label">
                    Error!
                    {/* prettier-ignore */}{' '}
                  </Text>
                  <Text status="danger" category="label">
                    {errorMsg.auth}
                  </Text>
                </>
              ) : null}
            </View>
            <View style={{ paddingVertical: 10 }}>
              <RegularInput
                value={values.email}
                label="Email"
                accessibilityLabel="Email"
                placeholder="Enter your email address"
                autoCapitalize="none"
                autoCompleteType="email"
                textContentType="emailAddress"
                autoFocus
                autoCorrect={false}
                onChangeText={updateEmailValue}
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
                textContentType="password"
                autoCorrect={false}
                onChangeText={updatePasswordValue}
              />
              <Button
                size="tiny"
                appearance="ghost"
                style={{ alignSelf: 'flex-end' }}
                onPress={routeRecovery}
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
                disabled={isLoading}
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
