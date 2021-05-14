import React, { useContext } from 'react';
import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage';

const { CancelToken } = axios;

const source = CancelToken.source();

const instance = axios.create({
  baseURL: 'https://apis.woozeee.com/api/v1/',
  timeout: 60000,
  timeoutErrorMessage: 'Request took too long, please try again',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json:charset=utf-8',
    // Authorization: 'Bearer ',
  },
});

export default {
  getVideos: async (url, page = 1, cursor = 1) => ({
    pageData: await instance({
      method: 'GET',
      
      url,
      params: {},
      cancelToken: source.token,
    }),
    previousID: 1,
    nextID: 2,
  }),
  cancelRequest: (msg) => source.cancel(msg),
};
