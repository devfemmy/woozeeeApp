import axios from 'axios';
// prettier-ignore
import {
  useReducer, useMemo,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

//prettier-ignore
import { postAction, getAction } from '../services/Requests'
import { methodTypes } from '../services/constants';

// prettier-ignore
import {
  reducer,
  initialState,
  initializeState,
} from 'src/store/Authentication';

export default function useAuth() {
  const [authState, dispatch] = useReducer(
    reducer,
    initialState,
    initializeState,
  );

  const baseUrl = 'https://apis.woozeee.com/api/v1/user/';

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
          const tokenAsync = await AsyncStorage.getItem('USER_AUTH_TOKEN');

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
        const res = await fetch('https://apis.woozeee.com/api/v1/user/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(userData),
        });

        const result = await res.json();
        console.log(result);
        let token = null;
        let msg = null;

        try {
          //  TODO: implement authenticate login details:{email, password}

          // prettier-ignore
          msg = await result.error == true 
            ? 'loginNotFound'
            : null;

          if (!msg) {
            token = await JSON.stringify(result.token);

            await AsyncStorage.setItem('USER_AUTH_TOKEN', token);
          }

          await dispatch({
            type: 'LOG_IN',
            token,
          });
        } catch (e) {
          cons;
          msg = e;
        }
        return msg;
      },

      signup: async (userData) => {
        const userInfo = {
          email: userData.email,
          fName: userData.firstName,
          sName: userData.lastName,
          username: userData.firstName,
          password: userData.password,
          referralCode: userData.referralCode,
        };

        await fetch('https://apis.woozeee.com/api/v1/user/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(userInfo),
        });
      },

      verifyAction: async (verificationCode) => {
        const tokenValue = {
          email: verificationCode.emailAddress,
          token: verificationCode.code,
        };

        await fetch('https://apis.woozeee.com/api/v1/user/confirm-token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(tokenValue),
        });

        // const result = await res.json();

        // let token = null;
        // let msg = null;

        // try {
        //   //  TODO: implement authenticate login details:{email, password}

        //   // prettier-ignore
        //   msg = await result.error == true
        //     ? 'tokenError'
        //     : null;

        //   if (!msg) {
        //     token = await JSON.stringify(result.token);

        //     await AsyncStorage.setItem('USER_AUTH_TOKEN', token);
        //   }

        //   await dispatch({
        //     type: 'LOG_IN',
        //     token,
        //   });
        // } catch (e) {
        //   msg = e;
        // }

        // return msg;
      },

      // Clear token from Storage then log user out
      logout: async () => {
        let msg = null;

        try {
          await AsyncStorage.removeItem('USER_AUTH_TOKEN');

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
