/* eslint-disable no-console */
/* eslint-disable eqeqeq */
/* eslint-disable quotes */
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

// prettier-ignore
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
            // //('token Async222', tokenAsync);
            token = await tokenAsync;
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

      signup: async (userData) => {
        const userInfo = {
          email: userData.email,
          fName: userData.firstName,
          sName: userData.lastName,
          username: userData.firstName,
          password: userData.password,
        };

        const res = await fetch('https://apis.woozeee.com/api/v1/user/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(userInfo),
        });

        // console.log(res);
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

        let token = null;
        let msg = null;

        try {
          //  TODO: implement authenticate login details:{email, password}

          // prettier-ignore
          msg = await result.error == true
            ? 'loginNotFound'
            : null;

          if (!msg) {
            token = await result.token;
            const userImage = await result.user.imgUrl;
            const email = await result.user.email;

            await AsyncStorage.setItem('USER_AUTH_TOKEN', `Bearer ${token}`);
            await AsyncStorage.setItem('userImage', userImage);
            AsyncStorage.setItem('email', email);

            const user_id = result.user._id;

            const insure_num = result.user.insurranceCard.cardNumber;
            const insureamt = result.user.insurranceCard.credits;
            const stringedAmt = insureamt.toString();
            //(stringedAmt);
            const wallet_num = result.user.walletCard.cardNumber;
            const wallet_amt = result.user.walletCard.credits;
            const stringedWallet = wallet_amt.toString();
            //(stringedWallet);
            const reward_num = result.user.rewardCard.cardNumber;
            const reward_amt = result.user.rewardCard.credits;
            const stringedReward = reward_amt.toString();
            //(stringedReward);
            const fullname = `${result.user.fName.toUpperCase()} ${result.user.sName.toUpperCase()}`;
            AsyncStorage.setItem('insureCardNo', insure_num);
            AsyncStorage.setItem('walletCardNo', wallet_num);
            AsyncStorage.setItem('rewardCardNo', reward_num);
            AsyncStorage.setItem('insureAmt', stringedAmt);
            AsyncStorage.setItem('walletAmt', stringedWallet);
            AsyncStorage.setItem('rewardAmt', stringedReward);
            AsyncStorage.setItem('fullName', fullname);
            AsyncStorage.setItem('userid', user_id);
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

      googleSignup: async (userData) => {
        // alert('Google sign in called!');
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

        const email = result.user.email;
        const userImage = result.user.imgUrl;
        AsyncStorage.setItem('email', email);
        const user_id = result.user._id;
        const insure_num = result.user.insurranceCard.cardNumber;
        const insureamt = result.user.insurranceCard.credits;
        const stringedAmt = insureamt.toString();
        //(stringedAmt);
        const wallet_num = result.user.walletCard.cardNumber;
        const wallet_amt = result.user.walletCard.credits;
        const stringedWallet = wallet_amt.toString();
        //(stringedWallet);
        const reward_num = result.user.rewardCard.cardNumber;
        const reward_amt = result.user.rewardCard.credits;
        const stringedReward = reward_amt.toString();
        //(stringedReward);
        const fullname = `${result.user.fName.toUpperCase()} ${result.user.sName.toUpperCase()}`;
        AsyncStorage.setItem('insureCardNo', insure_num);
        AsyncStorage.setItem('walletCardNo', wallet_num);
        AsyncStorage.setItem('rewardCardNo', reward_num);
        AsyncStorage.setItem('insureAmt', stringedAmt);
        AsyncStorage.setItem('walletAmt', stringedWallet);
        AsyncStorage.setItem('rewardAmt', stringedReward);
        AsyncStorage.setItem('fullName', fullname);
        AsyncStorage.setItem('userid', user_id);

        let token = null;
        let msg = null;

        try {
          //  TODO: implement authenticate login details:{email, password}

          // prettier-ignore
          msg = await result.error == true
            ? console.log("login not found")
            : null;

          if (!msg) {
            token = await result.token;

            await AsyncStorage.setItem('USER_AUTH_TOKEN', `Bearer ${token}`);
            await AsyncStorage.setItem('userImage', userImage);
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

        const result = await res.json();
        // console.log('Result is -> ', result);
        // const result = await res.json();
        const email = result.user.email;
        const userImage = result.user.imgUrl;

        // AsyncStorage.setItem('email', email);

        const user_id = result.user._id;
        const insure_num = result.user.insurranceCard.cardNumber;
        const insureamt = result.user.insurranceCard.credits;
        const stringedAmt = insureamt.toString();
        //(stringedAmt);
        const wallet_num = result.user.walletCard.cardNumber;
        const wallet_amt = result.user.walletCard.credits;
        const stringedWallet = wallet_amt.toString();
        //(stringedWallet);
        const reward_num = result.user.rewardCard.cardNumber;
        const reward_amt = result.user.rewardCard.credits;
        const stringedReward = reward_amt.toString();
        //(stringedReward);
        const fullname = `${result.user.fName.toUpperCase()} ${result.user.sName.toUpperCase()}`;
        AsyncStorage.setItem('insureCardNo', insure_num);
        AsyncStorage.setItem('walletCardNo', wallet_num);
        AsyncStorage.setItem('rewardCardNo', reward_num);
        AsyncStorage.setItem('insureAmt', stringedAmt);
        AsyncStorage.setItem('walletAmt', stringedWallet);
        AsyncStorage.setItem('rewardAmt', stringedReward);
        AsyncStorage.setItem('fullName', fullname);
        AsyncStorage.setItem('userid', user_id);
        let token = null;
        let msg = null;

        try {
          //  TODO: implement authenticate login details:{email, password}

          // prettier-ignore
          msg = await result.error == true
            ? console.log("login not found")
            : null;

          if (!msg) {
            token = await userInfo.token;
            await AsyncStorage.setItem('USER_AUTH_TOKEN', `Bearer ${token}`);
            await AsyncStorage.setItem('userImage', userImage);
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
        const result = await res.json();
        // //('results', result);
        // const result = await res.json();
        const email = result.user.email;
        const userImage = result.user.imgUrl;
        AsyncStorage.setItem('email', email);
        const user_id = result.user._id;
        const insure_num = result.user.insurranceCard.cardNumber;
        const insureamt = result.user.insurranceCard.credits;
        const stringedAmt = insureamt.toString();
        //(stringedAmt);
        const wallet_num = result.user.walletCard.cardNumber;
        const wallet_amt = result.user.walletCard.credits;
        const stringedWallet = wallet_amt.toString();
        //(stringedWallet);
        const reward_num = result.user.rewardCard.cardNumber;
        const reward_amt = result.user.rewardCard.credits;
        const stringedReward = reward_amt.toString();
        //(stringedReward);
        const fullname = `${result.user.fName.toUpperCase()} ${result.user.sName.toUpperCase()}`;
        AsyncStorage.setItem('insureCardNo', insure_num);
        AsyncStorage.setItem('walletCardNo', wallet_num);
        AsyncStorage.setItem('rewardCardNo', reward_num);
        AsyncStorage.setItem('insureAmt', stringedAmt);
        AsyncStorage.setItem('walletAmt', stringedWallet);
        AsyncStorage.setItem('rewardAmt', stringedReward);
        AsyncStorage.setItem('fullName', fullname);
        AsyncStorage.setItem('userid', user_id);
        let token = null;
        let msg = null;

        try {
          //  TODO: implement authenticate login details:{email, password}

          // prettier-ignore
          msg = await result.error == true
            ? console.log("login not found")
            : null;

          if (!msg) {
            token = await userInfo.token;
            await AsyncStorage.setItem('USER_AUTH_TOKEN', `Bearer ${token}`);
            await AsyncStorage.setItem('userImage', userImage);
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

      forgotPassword: async (data) => {
        // const res = await fetch(
        //   'https://apis.woozeee.com/api/v1/reset',
        //   {
        //     method: 'PUT',
        //     headers: {
        //       'Content-Type': 'application/json',
        //       Accept: 'application/json',
        //     },
        //     body: data,
        //   },
        // );
        // const result = await res.json();
        // //('from forgotPassword fn -> ', data);
      },

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

        // const result = await res.json();
        const result = await res.json();
        const email = result.user.email;
        AsyncStorage.setItem('email', email);
        const user_id = result.user._id;
        const insure_num = result.user.insurranceCard.cardNumber;
        const insureamt = result.user.insurranceCard.credits;
        const stringedAmt = insureamt.toString();
        //(stringedAmt);
        const wallet_num = result.user.walletCard.cardNumber;
        const wallet_amt = result.user.walletCard.credits;
        const stringedWallet = wallet_amt.toString();
        //(stringedWallet);
        const reward_num = result.user.rewardCard.cardNumber;
        const reward_amt = result.user.rewardCard.credits;
        const stringedReward = reward_amt.toString();
        //(stringedReward);
        const fullname = `${result.user.fName.toUpperCase()} ${result.user.sName.toUpperCase()}`;
        AsyncStorage.setItem('insureCardNo', insure_num);
        AsyncStorage.setItem('walletCardNo', wallet_num);
        AsyncStorage.setItem('rewardCardNo', reward_num);
        AsyncStorage.setItem('insureAmt', stringedAmt);
        AsyncStorage.setItem('walletAmt', stringedWallet);
        AsyncStorage.setItem('rewardAmt', stringedReward);
        AsyncStorage.setItem('fullName', fullname);
        AsyncStorage.setItem('userid', user_id);

        let token = null;
        let msg = null;

        try {
          //  TODO: implement authenticate login details:{email, password}
          // prettier-ignore
          msg = await result.error == true
            ? 'tokenError'
            : null;

          if (!msg) {
            token = await result.token;

            await AsyncStorage.setItem('USER_AUTH_TOKEN', `Bearer ${token}`);
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
          await AsyncStorage.removeItem('USER_AUTH_TOKEN');

          dispatch({
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
