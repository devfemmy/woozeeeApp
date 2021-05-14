import React, { useEffect } from 'react';
import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage';

const { CancelToken } = axios;

const source = CancelToken.source();

export const getToken = () => {
  return AsyncStorage.getItem('USER_AUTH_TOKEN');
};

const createInstance = async () => {
  return axios.create({
    baseURL: `https://apis.woozeee.com/api/v1/`,
    timeout: 60000,
    timeoutErrorMessage: 'Request took too long, please try again',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json:charset=utf-8',
      Authorization: `${await getToken()}`,
    },
  });
};

export default {
<<<<<<< HEAD
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
=======
  getVideos: async (page = 1, cursor = 1) => {
    const instance = await createInstance();

    const res = await instance.get(`entries?pageSize=10&pageNumber=${page}`);

    const { data } = res;
    return {
      pageData: data,
      previousID: 1,
      nextID: page + 1,
    };
  },
>>>>>>> 85ae0a62f78c4f5e898ba12a30a1ea54f9653561
  cancelRequest: (msg) => source.cancel(msg),
};
