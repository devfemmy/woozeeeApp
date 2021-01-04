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

import mapping from '~src/constants/mapping.json';

import useMounted from '~src/hooks/useMounted';

import usePreFetchResources from '~src/hooks/usePreFetchResources';

import { AppSettingsContext, AuthContext, LoadingContext } from '~src/contexts';

import useAppSettings from '~src/reducers/useAppSettings';

import useAuth from '~src/reducers/useAuth';

import Router from '~src/router';

enableScreens();

export default function App() {
  SplashScreen.preventAutoHideAsync()
    .then(() => {})
    .catch(() => {});

  const isMounted = useMounted();

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
    async function preFetchData() {
      if (isMounted) return;
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
    }

    preFetchData().then(() => {});
  }, [isMounted, fetchSettings, fetchToken]);

  const theme = appState.darkMode ? 'dark' : 'light';

  return isPreloaded ? (
    <SafeAreaProvider>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider
        /* eslint-disable-next-line react/jsx-props-no-spreading */
        {...eva}
        theme={eva[theme]}
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
            <LoadingContext.Provider value={{ isLoading, setLoading }}>
              <Layout level="2" style={{ flex: 1 }}>
                <Router />
              </Layout>
            </LoadingContext.Provider>
          </AuthContext.Provider>
        </AppSettingsContext.Provider>
      </ApplicationProvider>
      <StatusBar barStyle="auto" />
    </SafeAreaProvider>
  ) : null;
}
