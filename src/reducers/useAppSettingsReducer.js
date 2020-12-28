// prettier-ignore
import {
  useReducer, useMemo,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// prettier-ignore
import {
  reducer,
  initialState,
  initializeState,
} from '~src/store/AppSettings';

export default function useAppSettingsReducer() {
  const [appState, dispatch] = useReducer(
    reducer,
    initialState,
    initializeState,
  );

  // create obj for authentication options
  const appOptions = useMemo(
    () => ({
      // fetch user token
      fetchSettings: async () => {
        let settings = null;
        let msg = null;

        try {
          // get token from AsyncStorage
          const settingsAsync = await AsyncStorage.getItem(
            '@woozeeeAppSettings',
          );

          if (settingsAsync) {
            settings = await JSON.parse(settingsAsync);
          }

          // dispatch Get_token action
          await dispatch({
            type: 'FETCH_SETTINGS',
            settings,
          });
        } catch (e) {
          msg = e;
        }

        return msg;
      },
      // login user then set token (use login details) in storage
      updateSettings: async (prevOptions, options) => {
        let msg = null;
        let settings = null;

        try {
          if (options) {
            settings = await JSON.stringify(options);
            await AsyncStorage.setItem('@woozeeeAppSettings', settings);
          }

          await dispatch({
            type: 'UPDATE_SETTINGS',
            settings: { ...prevOptions, ...options },
          });
        } catch (e) {
          msg = e;
        }

        return msg;
      },
    }),
    [],
  );

  return {
    appState,
    appOptions,
  };
}
