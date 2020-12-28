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
} from '~src/store/Authentication';

export default function useAuthReducer() {
  const [authState, dispatch] = useReducer(
    reducer,
    initialState,
    initializeState,
  );

  // create obj for authentication options
  const authOptions = useMemo(
    () => ({
      // fetch user token
      fetchToken: async () => {
        let token = null;
        let msg = null;

        try {
          // start loading modal

          // get token from AsyncStorage
          const tokenAsync = await AsyncStorage.getItem(
            '@woozeeeUserAuthToken',
          );

          if (tokenAsync) {
            token = await JSON.parse(tokenAsync);
          }

          // dispatch Get_token action
          await dispatch({
            type: 'GET_TOKEN',
            token,
          });
        } catch (e) {
          msg = e;
        }

        return msg;
      },
      // login user then set token (use login details) in storage
      login: async (userData) => {
        let token = null;
        let msg = null;

        try {
          //  TODO: implement authenticate login details:{email, password}

          const dev = {
            email: 'devromes@gmail.com',
            password: 'dev1234',
          };

          // prettier-ignore
          msg = await userData.email !== dev.email
            ? 'Email / password is incorrect'
            : null;

          if (!msg) {
            token = await JSON.stringify(userData);

            await AsyncStorage.setItem('@woozeeeUserAuthToken', token);
          }

          await dispatch({
            type: 'LOG_IN',
            token,
          });
        } catch (e) {
          msg = e;
        }

        return msg;
      },

      // Clear token from Storage then log user out
      logout: async () => {
        let msg = null;

        try {
          await AsyncStorage.removeItem('@woozeeeUserAuthToken');

          await dispatch({
            type: 'LOG_OUT',
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
    authState,
    authOptions,
  };
}
