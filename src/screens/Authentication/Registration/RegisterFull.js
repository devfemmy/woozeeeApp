import React, { useContext, useState } from 'react';

import { View, ScrollView } from 'react-native';

import { Layout, Button, Text } from '@ui-kitten/components';

import { LocaleContext } from '~src/contexts';

import useToast from '~src/hooks/useToast';

import TopNavigationArea from '~src/components/TopNavigationArea';

import { GeneralTextField } from '~src/components/FormFields';

// eslint-disable-next-line react/prop-types
export default function RegisterFull({ navigation }) {
  useToast('Click again to go back');

  const [isLoading, setLoading] = useState(false);

  const [form, setFormValues] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const t = useContext(LocaleContext);

  // eslint-disable-next-line react/prop-types
  const routeLogin = () => navigation.navigate('Login');

  // eslint-disable-next-line react/prop-types
  const routeVerifyWithCode = () => navigation.navigate('VerifyWithCode');

  return (
    <Layout level="4" style={{ flex: 1 }}>
      <TopNavigationArea
        title={`${t('registration')} ${t('details')}`}
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
            <View
              style={{
                paddingVertical: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <View style={{ flex: 1, marginRight: 5 }}>
                <GeneralTextField
                  type="firstName"
                  label={t('firstName')}
                  androidComplete="name"
                  iosComplete="givenName"
                  validate="required"
                  setFormValues={setFormValues}
                />
              </View>
              <View style={{ flex: 1, marginLeft: 5 }}>
                <GeneralTextField
                  type="lastName"
                  label={t('lastName')}
                  androidComplete="name"
                  iosComplete="familyName"
                  validate="required"
                  setFormValues={setFormValues}
                />
              </View>
            </View>
            <View style={{ paddingVertical: 10 }}>
              <GeneralTextField
                type="username"
                label={t('username')}
                androidComplete="username"
                iosComplete="username"
                validate="required"
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
            </View>
            <View style={{ paddingVertical: 10 }}>
              <GeneralTextField
                type="confirmPassword"
                label={`${t('confirm')} ${t('password')}`}
                androidComplete="password"
                iosComplete="password"
                validate="password"
                secure
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
                onPress={routeVerifyWithCode}
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
                paddingVertical: 10,
              }}
            >
              <Text>{`${t('haveAccount')}?`}</Text>
              <Button appearance="ghost" size="tiny" onPress={routeLogin}>
                <Text category="h6" status="primary">
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
