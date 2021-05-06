import axios from 'axios';
// prettier-ignore
import {
  useReducer, useMemo,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

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
        console.log(userData);
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

        const res = await fetch('https://apis.woozeee.com/api/v1/user/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(userInfo),
        });
        const result = await res.json();
        console.log(result);
      },

      googleSignup: async (userData) => {
        const userInfo = {
          email: userData.email,
          fName: userData.fName,
          sName: userData.sName,
          source: userData.source,
        };

        const res = await fetch(
          'https://apis.woozeee.com/api/v1/user/login?social=true',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            body: JSON.stringify(userInfo),
          },
        );
        const result = await res.json();
        console.log(result);

        let token = null;
        let msg = null;

        try {
          //  TODO: implement authenticate login details:{email, password}

          // prettier-ignore
          msg = await result.error == true
            ? console.log("login not found")
            : null;

          if (!msg) {
            token = JSON.stringify(result.token);

            await AsyncStorage.setItem('USER_AUTH_TOKEN', token);
          }

          dispatch({
            type: 'LOG_IN',
            token,
          });
        } catch (e) {
          msg = e;
        }
        return msg;
      },

      facebookSignup: async (userData) => {
        const userInfo = {
          email: userData.info.email,
          token: userData.info.accessToken,
          source: userData.source,
        };

        const res = await fetch(
          'https://apis.woozeee.com/api/v1/user/login?social=true',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            body: JSON.stringify(userInfo),
          },
        );
        console.log('userInfo -> ', userInfo);
        const result = await res.json();
        console.log(result);

        let token = null;
        let msg = null;

        try {
          //  TODO: implement authenticate login details:{email, password}

          // prettier-ignore
          msg = await result.error == true
              ? console.log("login not found")
              : null;

          if (!msg) {
            token = JSON.stringify(userInfo.token);
            await AsyncStorage.setItem('USER_AUTH_TOKEN', token);
          }

          dispatch({
            type: 'LOG_IN',
            token,
          });
        } catch (e) {
          msg = e;
        }
        return msg;
      },

      appleSignup: async (userData) => {
        const userInfo = {
          email: userData.email,
          fName: userData.fName,
          sName: userData.sName,
          token: userData.token,
          source: userData.source,
        };

        const res = await fetch(
          'https://apis.woozeee.com/api/v1/user/login?social=true',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            body: JSON.stringify(userInfo),
          },
        );
        console.log('userInfo -> ', userInfo);
        const result = await res.json();
        console.log(result);

        let token = null;
        let msg = null;

        try {
          //  TODO: implement authenticate login details:{email, password}

          // prettier-ignore
          msg = await result.error == true
              ? console.log("login not found")
              : null;

          if (!msg) {
            token = JSON.stringify(userInfo.token);
            await AsyncStorage.setItem('USER_AUTH_TOKEN', token);
          }

          dispatch({
            type: 'LOG_IN',
            token,
          });
        } catch (e) {
          msg = e;
        }
        return msg;
      },

      forgotPassword: async (verificationCode) => {},

      verifyAction: async (verificationCode) => {
        const tokenValue = {
          email: verificationCode.emailAddress,
          token: verificationCode.code,
        };

        const res = await fetch(
          'https://apis.woozeee.com/api/v1/user/confirm-token',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            body: JSON.stringify(tokenValue),
          },
        );

        const result = await res.json();

        let token = null;
        let msg = null;

        try {
          //  TODO: implement authenticate login details:{email, password}

          // prettier-ignore
          msg = await result.error == true
              ? 'tokenError'
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
          msg = e;
        }

        return msg;
      },

      //Social login/signup section
      // Google
      signupWithGoogle: async () => {
        const userData = {
          email: '',
          firstName: '',
          lastName: '',
        };
        await GoogleSignin.configure({
          scopes: ['https://www.googleapis.com/auth/drive.readonly'],
          iosClientId:
            '979696525592-oi481tbbn0pp9htv408l99vh6fa08e3o.apps.googleusercontent.com',
          // offlineAccess: false,
        });
        try {
          await GoogleSignin.hasPlayServices();
          const userInfo = await GoogleSignin.signIn();
          idToken = JSON.stringify(userInfo.idToken);
          userData.email = await userInfo.user.email;
          userData.firstName = await userInfo.user.givenName;
          userData.lastName = await userInfo.user.familyName;
          await AsyncStorage.setItem('USER_AUTH_TOKEN', idToken);
          await authOptions.login(userData);
          // await dispatch({
          //   type: 'LOG_IN',
          //   idToken,
          // });
        } catch (error) {
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            // user cancelled the login flow
            console.log('Signin cancelled');
          } else if (error.code === statusCodes.IN_PROGRESS) {
            // operation (e.g. sign in) is in progress already
            console.log('signin in progress');
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            // play services not available or outdated
            console.log('service not available');
          } else {
            // some other error happened
            console.log(error);
          }
        }
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
