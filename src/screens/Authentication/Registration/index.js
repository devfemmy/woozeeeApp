import React, { useContext, useState } from 'react';

import { View, ScrollView } from 'react-native';

import { Layout, Button, Text } from '@ui-kitten/components';

import { LocaleContext } from 'src/contexts';

import TopNavigationArea from 'src/components/TopNavigationArea';

import { GeneralTextField } from 'src/components/FormFields';

import {
  IconFacebook,
  IconGoogle,
  IconTwitter,
} from 'src/components/CustomIcons';

export default function Register({ navigation }) {
  const [isLoading, setLoading] = useState(false);

  const [form, setFormValues] = useState({
    email: '',
  });

  const t = useContext(LocaleContext);

  const routeLogin = () => navigation.navigate('Login');
  const routeRegisterFull = () => navigation.navigate('RegisterFull');

  return (
    <Layout level="6" style={{ flex: 1 }}>
      <TopNavigationArea
        title={t('registration')}
        navigation={navigation}
        icon="close"
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
                onPress={routeRegisterFull}
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
              <Button appearance="ghost" size="tiny">
                <Text status="primary" category="s2">
                  {t('termsConditions')}
                </Text>
              </Button>
              <Text category="p2">{`${t('confirmRead')} woozeee's`}</Text>
              <Button appearance="ghost" size="tiny">
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
