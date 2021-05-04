import axios from 'axios';
// prettier-ignore
import {
  useReducer, useMemo, useContext
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../contexts/index';

import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

// prettier-ignore
import {
  reducer,
  initialState,
  initializeState,
} from 'src/store/Authentication';

export default function useAuth() {
  const { authOptions } = useContext(AuthContext);
  const [authState, dispatch] = useReducer(
    reducer,
    initialState,
    initializeState,
  );

  // create obj for authentication options
  const authLogOptions = useMemo(
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
      //Social login/signup section
      // Google
      signupWithGoogle: async () => {
        const userData = {
          email: '',
          firstName: '',
          lastName: '',
        };
        // await GoogleSignin.configure({
        //   scopes: ['https://www.googleapis.com/auth/drive.readonly'],
        //   iosClientId:
        //     '979696525592-oi481tbbn0pp9htv408l99vh6fa08e3o.apps.googleusercontent.com',
        //   // offlineAccess: false,
        // });
        // try {
        //   await GoogleSignin.hasPlayServices();
        //   const userInfo = await GoogleSignin.signIn();
        //   idToken = JSON.stringify(userInfo.idToken);
        //   userData.email = await userInfo.user.email;
        //   userData.firstName = await userInfo.user.givenName;
        //   userData.lastName = await userInfo.user.familyName;
        //   await AsyncStorage.setItem('USER_AUTH_TOKEN', idToken);
        await authOptions.signup(userData);
        // } catch (error) {
        //   if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        //     // user cancelled the login flow
        //     console.log('Signin cancelled');
        //   } else if (error.code === statusCodes.IN_PROGRESS) {
        //     // operation (e.g. sign in) is in progress already
        //     console.log('signin in progress');
        //   } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        //     // play services not available or outdated
        //     console.log('service not available');
        //   } else {
        //     // some other error happened
        //     console.log(error);
        //   }
        // }
      },
    }),
    [],
  );

  return {
    authState,
    authLogOptions,
  };
}
