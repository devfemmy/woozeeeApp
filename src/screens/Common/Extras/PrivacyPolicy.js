import React, { useContext, useMemo } from 'react';

import { View, ScrollView } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { Layout, Text } from '@ui-kitten/components';

import { LocaleContext } from '~src/contexts';

import TopNavigationArea from '~src/components/TopNavigationArea';

// eslint-disable-next-line react/prop-types
export default function PrivacyPolicy({ navigation }) {
  const t = useContext(LocaleContext);

  return useMemo(
    () => (
      <Layout level="4" style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1 }}>
          <TopNavigationArea
            title={t('privacyPolicy')}
            navigation={navigation}
            screen="auth"
          />
          <ScrollView
            alwaysBounceVertical
            showsHorizontalScrollIndicator={false}
          >
            <View
              style={{
                flex: 1,
                paddingHorizontal: 15,
                paddingTop: 10,
              }}
            >
              <View style={{ marginBottom: 15 }}>
                <Text category="h5" style={{ marginVertical: 5 }}>
                  Introduction
                </Text>
                <Text style={{ lineHeight: 25, marginVertical: 5 }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </Text>
              </View>
              <View style={{ marginBottom: 15 }}>
                <Text category="h5" style={{ marginVertical: 5 }}>
                  We value your privacy
                </Text>
                <Text style={{ lineHeight: 25, marginVertical: 5 }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </Text>
              </View>
              <View style={{ marginBottom: 15 }}>
                <Text category="h5" style={{ marginVertical: 5 }}>
                  Your data is safe with us
                </Text>
                <Text style={{ lineHeight: 25, marginVertical: 5 }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </Text>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Layout>
    ),
    [navigation, t],
  );
}
