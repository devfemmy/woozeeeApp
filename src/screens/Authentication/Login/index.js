import React, { useState, useContext } from 'react';

import { View, ScrollView } from 'react-native';

import { useIsFocused } from '@react-navigation/native';

// prettier-ignore
import {
  Layout, Button, Text, Spinner,
} from '@ui-kitten/components';

import { AuthContext, LocaleContext } from 'src/contexts';

import TopNavigationArea from 'src/components/TopNavigationArea';

import { GeneralTextField } from 'src/components/FormFields';

import {
  IconFacebook,
  IconGoogle,
  IconTwitter,
} from 'src/components/CustomIcons';

// eslint-disable-next-line react/prop-types
export default function Login({ navigation }) {
  // prettier-ignore
  const {
    authOptions,
  } = useContext(AuthContext);

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
      await setLoading(true);

      if (form.email && form.password) {
        loginError = await login(form);
      } else {
        loginError = 'loginRequired';
      }
    } catch (e) {
      loginError = e;
    } finally {
      if (loginError) {
        await setErrorMsg((prevState) => ({
          ...prevState,
          auth: loginError,
        }));
      }
      if (isFocused) await setLoading(false);
    }
  };

  const renderSpinner = () => <Spinner size="tiny" status="danger" />;

  // eslint-disable-next-line react/prop-types
  const routeRegister = () => navigation.navigate('Register');

  // eslint-disable-next-line react/prop-types
  const routeRecoverWithEmail = () => navigation.navigate('RecoverWithEmail');

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
                androidComplete="email"
                iosComplete="emailAddress"
                validate="email"
                setFormValues={setFormValues}
              />
            </View>
            <View style={{ paddingVertical: 10 }}>
              <GeneralTextField
                type="password"
                label={t('password')}
                androidComplete="password"
                iosComplete="password"
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
                appearance="outline"
                size="medium"
                accessoryLeft={IconFacebook}
                accessibilityLiveRegion="polite"
                accessibilityComponentType="button"
                accessibilityLabel="Login with Facebook"
                style={{ marginVertical: 5 }}
              >
                <Text status="primary" category="h6">
                  Facebook
                </Text>
              </Button>
              <Button
                status="danger"
                size="medium"
                appearance="outline"
                accessoryLeft={IconGoogle}
                accessibilityLiveRegion="polite"
                accessibilityComponentType="button"
                accessibilityLabel="Login with Google"
                style={{ marginVertical: 5 }}
              >
                <Text status="danger" category="h6">
                  Google
                </Text>
              </Button>
              {/* <Button
                status="info"
                size="medium"
                accessoryLeft={IconTwitter}
                accessibilityLiveRegion="polite"
                accessibilityComponentType="button"
                accessibilityLabel="Login with Twitter"
                style={{ marginVertical: 5 }}
              >
                <Text appearance="alternative">Twitter</Text>
              </Button> */}
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
