import React, { useContext, useState } from 'react';

import { View, ScrollView } from 'react-native';

import Constants from 'expo-constants';

import { Layout, Button, Text } from '@ui-kitten/components';

import { LocaleContext } from 'src/contexts';

import TopNavigationArea from 'src/components/TopNavigationArea';

import { GeneralTextField } from 'src/components/FormFields';

import {
  IconCGoogle,
  IconCFacebook,
  IconCTwitter,
  IconCApple,
} from 'src/components/CustomIcons';

export default function Register({ navigation }) {
  const [isLoading, setLoading] = useState(false);

  const [form, setFormValues] = useState({
    email: '',
  });

  const isEmailValid = (emailAddress) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(emailAddress).toLowerCase());
  };

  const validateEmail = async () => {
    if (isEmailValid(form.email)) {
      routeRegisterFull();
    } else {
      return;
    }
  };

  const t = useContext(LocaleContext);

  const routeLogin = () => navigation.navigate('Login');
  const routeRegisterFull = () => navigation.navigate('RegisterFull', { form });

  const routeTermsConditions = () => navigation.navigate('TermsConditions');
  const routePrivacyPolicy = () => navigation.navigate('PrivacyPolicy');

  return (
    <Layout level="6" style={{ flex: 1 }}>
      <TopNavigationArea
        title={t('signUp')}
        navigation={navigation}
        icon="back"
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
            <View style={{ paddingVertical: 20 }}>
              <Button
                status="danger"
                size="large"
                accessibilityLiveRegion="assertive"
                accessibilityComponentType="button"
                accessibilityLabel="Continue"
                onPress={validateEmail}
                disabled={isLoading}
              >
                <Text status="control">{t('continue')}</Text>
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
              <Text category="p2">{`${t('continueAgree')} woozeee's`}</Text>
              <Button
                appearance="ghost"
                size="tiny"
                onPress={routeTermsConditions}
              >
                <Text status="primary" category="s2">
                  {t('termsConditions')}
                </Text>
              </Button>
              <Text category="p2">{`${t('confirmRead')} woozeee's`}</Text>
              <Button
                appearance="ghost"
                size="tiny"
                onPress={routePrivacyPolicy}
              >
                <Text status="primary" category="s2">
                  {t('privacyPolicy')}
                </Text>
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
                style={{ marginVertical: 5, backgroundColor: 'white' }}
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
                style={{ marginVertical: 5 }}
              >
                <Text category="s1" status="control">
                  Facebook
                </Text>
              </Button>
              <Button
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
              </Button>
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
                >
                  <Text category="s1" status="control">
                    Apple
                  </Text>
                </Button>
              )}
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
              <Text>{`${t('haveAccount')}?`}</Text>
              <Button appearance="ghost" size="tiny" onPress={routeLogin}>
                <Text status="primary" category="h6">
                  {t('signIn')}
                </Text>
              </Button>
            </View>
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
}
