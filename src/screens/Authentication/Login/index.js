import React, { useState, useContext } from 'react';

import { View, ScrollView } from 'react-native';

import Constants from 'expo-constants';

import { useIsFocused } from '@react-navigation/native';

// prettier-ignore
import {
  Layout, Button, Text, Spinner,
} from '@ui-kitten/components';

import { AuthContext, LocaleContext } from 'src/contexts';

import TopNavigationArea from 'src/components/TopNavigationArea';

import { GeneralTextField } from 'src/components/FormFields';

import {
  IconCGoogle,
  IconCFacebook,
  IconCTwitter,
  IconCApple,
} from 'src/components/CustomIcons';
import SignUpWithGoogle from 'src/services/Requests/googleSignIn';
import SignUpWithFacebook from 'src/services/Requests/facebookSignIn';

export default function Login({ navigation }) {
  // prettier-ignore
  const {
    authOptions,
  } = useContext(AuthContext);

  const { googleSignup, facebookSignup, appleSignup } = authOptions;

  function callSigunp() {
    SignUpWithGoogle({ googleSignup });
  }

  function callFBSigunp() {
    SignUpWithFacebook({ facebookSignup });
  }

  function callAppleSignup() {
    SignUpWithApple({ appleSignup });
  }

  const t = useContext(LocaleContext);

  const { login } = authOptions;

  const isFocused = useIsFocused();

  const [isLoading, setLoading] = useState(false);

  const [errorMsg, setErrorMsg] = useState({
    auth: null,
  });

  const [form, setFormValues] = useState({
    email: '',
    password: '',
  });

  const loginUser = async () => {
    let loginError = null;

    try {
      setLoading(true);

      if (form.email && form.password) {
        loginError = await login(form);
      } else {
        loginError = 'loginRequired';
      }
    } catch (e) {
      loginError = e;
    } finally {
      if (loginError) {
        setErrorMsg((prevState) => ({
          ...prevState,
          auth: loginError,
        }));
      }
      if (isFocused) setLoading(false);
    }
  };

  const renderSpinner = () => <Spinner size="tiny" status="danger" />;

  const routeRegister = () => navigation.navigate('Register');

  const routeRecoverWithEmail = () => navigation.navigate('RecoverWithEmail');

  const routeOnboarding = () => navigation.navigate('Onboarding');

  return (
    <Layout level="6" style={{ flex: 1 }}>
      <TopNavigationArea
        title={t('signIn')}
        navigation={navigation}
        screen="auth"
      />
      <ScrollView
        alwaysBounceVertical
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
                <Text
                  status="danger"
                  category="label"
                  style={{ marginRight: 2 }}
                >
                  {` ${t('error')}! `}
                </Text>
                <Text status="danger" category="p2">
                  {t(errorMsg.auth)}
                </Text>
              </View>
            ) : null}
            <View style={{ paddingVertical: 10 }}>
              <GeneralTextField
                type="email"
                label={t('emailAddress')}
                autoCompleteType="email"
                textContentType="emailAddress"
                keyboardType="email-address"
                validate="email"
                setFormValues={setFormValues}
              />
            </View>
            <View style={{ paddingVertical: 10 }}>
              <GeneralTextField
                type="password"
                label={t('password')}
                autoCompleteType="password"
                textContentType="password"
                validate="password"
                secure
                setFormValues={setFormValues}
              />
              <Button
                size="tiny"
                appearance="ghost"
                style={{ alignSelf: 'flex-end' }}
                onPress={routeRecoverWithEmail}
              >
                <Text status="primary" category="s2">
                  {` ${t('forgotPassword')}?`}
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
                <Text status="control">{t('continue')}</Text>
              </Button>
            </View>
            <View
              style={{
                alignItems: 'center',
                paddingTop: 50,
                paddingBottom: 10,
              }}
            >
              <Text>{t('orContinueWith')}</Text>
            </View>
            <View style={{ paddingVertical: 10 }}>
              <Button
                status="primary"
                size="medium"
                appearance="outline"
                accessoryLeft={() => (
                  <IconCGoogle style={{ height: 20, width: 20 }} />
                )}
                accessibilityLiveRegion="polite"
                accessibilityComponentType="button"
                accessibilityLabel="Sign up with Google"
                onPress={SignUpWithGoogle}
                style={{ marginVertical: 5, backgroundColor: 'white' }}
                onPress={callSigunp}
              >
                <Text category="s1" style={{ color: 'black' }}>
                  Google
                </Text>
              </Button>
              <Button
                status="primary"
                size="medium"
                accessoryLeft={() => (
                  <IconCFacebook style={{ height: 20, width: 20 }} />
                )}
                accessibilityLiveRegion="polite"
                accessibilityComponentType="button"
                accessibilityLabel="Sign up with Facebook"
                onPress={callFBSigunp}
                style={{ marginVertical: 5 }}
              >
                <Text category="s1" status="control">
                  Facebook
                </Text>
              </Button>
              {/* <Button
                status="info"
                size="medium"
                accessoryLeft={() => (
                  <IconCTwitter style={{ height: 20, width: 20 }} />
                )}
                accessibilityLiveRegion="polite"
                accessibilityComponentType="button"
                accessibilityLabel="Sign up with Twitter"
                style={{ marginVertical: 5 }}
              >
                <Text category="s1" status="control">
                  Twitter
                </Text>
              </Button> */}
              {Constants.platform.ios && (
                <Button
                  size="medium"
                  accessoryLeft={() => (
                    <IconCApple style={{ height: 20, width: 20 }} />
                  )}
                  accessibilityLiveRegion="polite"
                  accessibilityComponentType="button"
                  accessibilityLabel="Sign up with Apple"
                  style={{ marginVertical: 5, backgroundColor: 'black' }}
                  onPress={callAppleSignup}
                >
                  <Text category="s1" status="control">
                    Apple
                  </Text>
                </Button>
              )}
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
              <Text>{`${t('dontHaveAccount')}?`}</Text>
              <Button appearance="ghost" size="tiny" onPress={routeRegister}>
                <Text category="h6" status="primary">
                  {t('signUp')}
                </Text>
              </Button>
            </View>
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
}
