import 'react-native-gesture-handler';

import React, { useState, useMemo } from 'react';

import { enableScreens } from 'react-native-screens';

import { SafeAreaProvider } from 'react-native-safe-area-context';

import * as SplashScreen from 'expo-splash-screen';

import { StatusBar } from 'expo-status-bar';

import * as eva from '@eva-design/eva';

import { EvaIconsPack } from '@ui-kitten/eva-icons';

import {
  ApplicationProvider,
  IconRegistry,
  Layout,
} from '@ui-kitten/components';

import axios from 'axios';

import { AxiosProvider } from 'react-axios';

import i18n from 'i18n-js';

import mapping from '~src/constants/mapping.json';

import mappingTheme from '~src/constants/mappingTheme';

import usePreFetchResources from '~src/hooks/usePreFetchResources';

import {
  AppSettingsContext,
  AuthContext,
  LoadingContext,
  LocaleContext,
} from '~src/contexts';

import useAppSettings from '~src/reducers/useAppSettings';

import useAuth from '~src/reducers/useAuth';

import Router from '~src/router';

import en from '~src/translations/en.json';
import fr from '~src/translations/fr.json';

enableScreens();

const axiosInstance = axios.create({
  baseURL: 'https://api.jsonbin.io/',
  timeout: 60000,
  timeoutErrorMessage: 'Request took too long process',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json:charset=utf-8',
    'secret-key':
      '$2b$10$BifoVKHdKq1J9E8C1YK1nuvsaD4wY9dVW5jNPuy4/mvioQJ84wZ1O',
  },
});

i18n.translations = { en, fr };

i18n.fallbacks = true;

export default function App() {
  SplashScreen.preventAutoHideAsync()
    .then(() => {})
    .catch(() => {});

  const isPreloaded = usePreFetchResources();

  const { appState, appOptions } = useAppSettings();

  const { authState, authOptions } = useAuth();

  const { fetchSettings } = appOptions;

  const { fetchToken } = authOptions;

  const [isLoading, setLoading] = useState(false);

  const [errorMsg, setErrorMsg] = useState({
    settings: null,
    auth: null,
    general: null,
  });

  useMemo(() => {
    (async () => {
      try {
        await setLoading(true);

        const settingsError = await fetchSettings();

        const authError = await fetchToken();

        if (!settingsError && !authError) return;

        await setErrorMsg((prevState) => ({
          ...prevState,
          settings: settingsError,
          auth: authError,
        }));
      } catch (e) {
        setErrorMsg((prevState) => ({ ...prevState, general: e }));
      } finally {
        await setLoading(false);
      }
    })();
  }, [fetchSettings, fetchToken]);

  i18n.locale = appState.locale || 'en';

  const t = (scope) => i18n.t(scope);

  const themeMode = appState.darkMode ? 'dark' : 'light';

  return isPreloaded ? (
    <SafeAreaProvider>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider
        /* eslint-disable-next-line react/jsx-props-no-spreading */
        {...eva}
        theme={{ ...eva[themeMode], ...mappingTheme[themeMode] }}
        customMapping={mapping}
      >
        <AxiosProvider instance={axiosInstance}>
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
                <LoadingContext.Provider value={{ isLoading, setLoading }}>
                  <Layout level="4" style={{ flex: 1 }}>
                    <Router />
                  </Layout>
                </LoadingContext.Provider>
              </LocaleContext.Provider>
            </AuthContext.Provider>
          </AppSettingsContext.Provider>
        </AxiosProvider>
      </ApplicationProvider>
      <StatusBar barStyle="auto" />
    </SafeAreaProvider>
  ) : null;
}
