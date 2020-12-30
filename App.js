import 'react-native-gesture-handler';

import React, { useState, useMemo } from 'react';

import { enableScreens } from 'react-native-screens';

import { SafeAreaProvider } from 'react-native-safe-area-context';

import { StatusBar } from 'expo-status-bar';

import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';

import * as eva from '@eva-design/eva';

import { EvaIconsPack } from '@ui-kitten/eva-icons';

import useIsMounted from '~src/hooks/useIsMounted';

import usePreFetchResources from '~src/hooks/usePreFetchResources';

import { AppSettingsContext, AuthContext } from '~src/contexts';

import useAppSettingsReducer from '~src/reducers/useAppSettingsReducer';

import useAuthReducer from '~src/reducers/useAuthReducer';

import Router from '~src/router';

enableScreens();

export default function App() {
  const isMounted = useIsMounted();

  const isPreloaded = usePreFetchResources();

  const { appState, appOptions } = useAppSettingsReducer();

  const { authState, authOptions } = useAuthReducer();

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

  const { darkMode } = appState;

  const theme = darkMode ? 'dark' : 'light';

  return isPreloaded ? (
    <SafeAreaProvider>
      <IconRegistry icons={EvaIconsPack} />
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <ApplicationProvider {...eva} theme={eva[theme]}>
        <AppSettingsContext.Provider
          value={{
            appState,
            appOptions,
            isLoading,
            setLoading,
            errorMsg,
            setErrorMsg,
          }}
        >
          <AuthContext.Provider
            value={{
              authState,
              authOptions,
            }}
          >
            <Router />
          </AuthContext.Provider>
        </AppSettingsContext.Provider>
      </ApplicationProvider>
      <StatusBar barStyle="auto" />
    </SafeAreaProvider>
  ) : null;
}
