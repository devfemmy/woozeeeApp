import 'react-native-gesture-handler';

import React, { useState, useEffect } from 'react';

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

import i18n from 'i18n-js';

import { QueryClientProvider, QueryClient } from 'react-query';

import mapping from '~src/constants/mapping.json';

import customTheme from '~src/constants/customTheme.json';

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

  const queryClient = new QueryClient();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);

        const settingsError = await fetchSettings();

        const authError = await fetchToken();

        if (!settingsError && !authError) return;

        setErrorMsg((prevState) => ({
          ...prevState,
          settings: settingsError,
          auth: authError,
        }));
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
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider
        /* eslint-disable-next-line react/jsx-props-no-spreading */
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
                  <Layout level="4" style={{ flex: 1 }}>
                    <Router />
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
