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
  getStories: async () => {
    const instance = await createInstance();

    const res = await instance.get('stories');
    const { data } = res;
    return {
      pageData: data,
      previousID: 1,
    };
  },
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
  cancelRequest: (msg) => source.cancel(msg),
};
