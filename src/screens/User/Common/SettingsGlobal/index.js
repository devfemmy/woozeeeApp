import React, { useState, useContext } from 'react';

import { View, ScrollView } from 'react-native';

// prettier-ignore
import {
  Layout, Button, Text, Toggle, Divider,
} from '@ui-kitten/components';

import { AuthContext, LocaleContext } from 'src/contexts';

import TopNavigationArea from 'src/components/TopNavigationArea';

import { IconForwardIos } from 'src/components/CustomIcons';

export default function Settings({ navigation }) {
  const t = useContext(LocaleContext);

  const { authOptions } = useContext(AuthContext);

  const { logout } = authOptions;

  const [isLoading, setLoading] = useState(false);

  const [autoPlay, setAutoPlay] = useState(true);
  const [postNotif, setPostNotif] = useState(true);
  const [autoUpdate, setAutoUpdate] = useState(false);
  const [hideAccount, setHideAccount] = useState(false);
  const [disableAccount, setDisableAccount] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);
      await logout();
    } catch (e) {
      const err = e;
    } finally {
      setLoading(false);
    }
  };

  // const routeBack = () => navigation.goBack();

  return (
    <Layout level="6" style={{ flex: 1 }}>
      <TopNavigationArea
        title={t('settings')}
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
          <View style={{ marginBottom: 10 }}>
            <Text status="primary" category="c2">
              {t('settings')}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Text category="s2" style={{ marginLeft: 10 }}>
                {t('videoAutoPlay')}
              </Text>
            </View>
            <Toggle
              checked={autoPlay}
              onChange={() => setAutoPlay((prevState) => !prevState)}
            />
          </View>
          <Divider style={{ marginVertical: 10 }} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Text category="s2" style={{ marginLeft: 10 }}>
                {t('followingPostNotif')}
              </Text>
            </View>
            <Toggle
              checked={postNotif}
              onChange={() => setPostNotif((prevState) => !prevState)}
            />
          </View>
          <Divider style={{ marginVertical: 10 }} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Text category="s2" style={{ marginLeft: 10 }}>
                {t('autoUpdate')}
              </Text>
            </View>
            <Toggle
              checked={autoUpdate}
              onChange={() => setAutoUpdate((prevState) => !prevState)}
            />
          </View>
          <Divider style={{ marginVertical: 10 }} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Text category="s2" style={{ marginLeft: 10 }}>
                {t('hideAccount')}
              </Text>
            </View>
            <Toggle
              checked={hideAccount}
              onChange={() => setHideAccount((prevState) => !prevState)}
            />
          </View>
          <Divider style={{ marginVertical: 10 }} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Text category="s2" style={{ marginLeft: 10 }}>
                {t('disableAccount')}
              </Text>
            </View>
            <Toggle
              checked={disableAccount}
              onChange={() => setDisableAccount((prevState) => !prevState)}
            />
          </View>
          <Divider style={{ marginVertical: 10 }} />
          <View style={{ marginVertical: 20 }}>
            <Button appearance="ghost" onPress={handleLogout}>
              <Text status="danger" category="s1">
                {t('logout')}
              </Text>
            </Button>
            <Text category="c2" style={{ textAlign: 'center' }}>
              {`${t('version')} 1.0.0`}
            </Text>
          </View>
          {/* <View style={{ paddingVertical: 20 }}>
            <Button
              status="danger"
              size="large"
              accessibilityLiveRegion="assertive"
              accessibilityComponentType="button"
              accessibilityLabel="Continue"
              accessoryLeft={isLoading ? renderSpinner : null}
              onPress={routeBack}
              disabled={isLoading}
            >
              <Text status="control">{t('close')}</Text>
            </Button>
          </View> */}
        </View>
      </ScrollView>
    </Layout>
  );
}
