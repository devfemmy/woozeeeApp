import 'react-native-gesture-handler';

import React, { Component, useState, useEffect } from 'react';

import { enableScreens } from 'react-native-screens';

import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

// import { VESDK } from 'react-native-videoeditorsdk';

import { QueryClientProvider, QueryClient } from 'react-query';

import * as SplashScreen from 'expo-splash-screen';

import { StatusBar } from 'expo-status-bar';

import * as ScreenOrientation from 'expo-screen-orientation';

import Constants from 'expo-constants';

import * as eva from '@eva-design/eva';

import { EvaIconsPack } from '@ui-kitten/eva-icons';

import {
  ApplicationProvider,
  IconRegistry,
  Layout,
} from '@ui-kitten/components';

import i18n from 'i18n-js';

import AssetIconsPack from 'src/components/IconPacks/AssetIcon';

import mapping from 'src/constants/mapping.json';

import customTheme from 'src/constants/customTheme.json';

import mappingTheme from 'src/constants/mappingTheme';

import usePreFetchResources from 'src/hooks/usePreFetchResources';

import {
  AppSettingsContext,
  AuthContext,
  LoadingContext,
  LocaleContext,
} from 'src/contexts';

import useAppSettings from 'src/reducers/useAppSettings';

import useAuth from 'src/reducers/useAuth';

import Router from 'src/router';

import firebase from '@react-native-firebase/app';

import firestore from '@react-native-firebase/firestore';

import en from 'src/translations/en.json';
import fr from 'src/translations/fr.json';

enableScreens();

i18n.translations = { en, fr };

i18n.fallbacks = true;

// let VESDKLicense = null;

// if (Constants.platform.android) {
//   VESDKLicense = require('src/constants/vesdk_android_license.json');
// } else if (Constants.platform.ios) {
//   VESDKLicense = require('src/constants/vesdk_ios_license.json');
// }

// VESDK.unlockWithLicense(VESDKLicense);

export default function App() {
  SplashScreen.preventAutoHideAsync()
    .then(() => {})
    .catch(() => {});

  const isPreloaded = usePreFetchResources();

  const { appState, appOptions } = useAppSettings();

  const { authState, authOptions } = useAuth();

  const { fetchSettings } = appOptions;

  const { fetchToken } = authOptions;

  const [isLoading, setLoading] = useState(true);

  const [errorMsg, setErrorMsg] = useState({
    settings: null,
    auth: null,
    general: null,
  });

  const queryClient = new QueryClient();

  const firebaseConfig = {
    apiKey: 'AIzaSyARWCPqpauNDiveSI26tvmKsyn4p_XNzh8',
    authDomain: 'woozeee-d7f6c.firebaseapp.com',
    databaseURL: 'https://woozeee-d7f6c.firebaseio.com',
    projectId: 'woozeee-d7f6c',
    storageBucket: 'woozeee-d7f6c.appspot.com',
    messagingSenderId: '979696525592',
    appId: '1:979696525592:web:ec27a203184d23e0dcfe6d',
    measurementId: 'G-XQKMT94R9R',
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  useEffect(() => {
    (async () => {
      try {
        await ScreenOrientation.lockAsync(
          ScreenOrientation.OrientationLock.PORTRAIT_UP,
        );

        const settingsError = await fetchSettings();

        const authError = await fetchToken();

        if (settingsError || authError) {
          setErrorMsg((prevState) => ({
            ...prevState,
            settings: settingsError,
            auth: authError,
          }));
        }
      } catch (e) {
        setErrorMsg((prevState) => ({ ...prevState, general: e }));
      } finally {
        setLoading(false);
      }
    })();
  }, [fetchSettings, fetchToken]);

  i18n.locale = appState.locale || 'en';

  const t = (scope) => i18n.t(scope);

  const themeMode = appState.darkMode ? 'dark' : 'light';

  return isPreloaded ? (
    <SafeAreaProvider>
      <IconRegistry icons={[EvaIconsPack, AssetIconsPack]} />
      <ApplicationProvider
        {...eva}
        theme={{
          ...eva[themeMode],
          ...customTheme,
          ...mappingTheme[themeMode],
        }}
        customMapping={mapping}
      >
        <AppSettingsContext.Provider
          value={{
            appState,
            appOptions,
          }}
        >
          <AuthContext.Provider
            value={{
              authState,
              authOptions,
            }}
          >
            <LocaleContext.Provider value={t}>
              <QueryClientProvider client={queryClient}>
                <LoadingContext.Provider value={{ isLoading, setLoading }}>
                  <Layout level="5" style={{ flex: 1 }}>
                    <SafeAreaView style={{ flex: 1 }}>
                      <Router />
                    </SafeAreaView>
                  </Layout>
                </LoadingContext.Provider>
              </QueryClientProvider>
            </LocaleContext.Provider>
          </AuthContext.Provider>
        </AppSettingsContext.Provider>
      </ApplicationProvider>
      <StatusBar
        barStyle="auto"
        style={themeMode === 'light' ? 'dark' : 'light'}
      />
    </SafeAreaProvider>
  ) : null;
}
