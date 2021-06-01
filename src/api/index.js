import React, { useState } from 'react';
import axios from 'axios';

// import { firestore } from 'firebase';

import AsyncStorage from '@react-native-async-storage/async-storage';

const { CancelToken } = axios;

// const db = firestore();

const source = CancelToken.source();

export const getToken = () => {
  // firebase.initializeApp();
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
  getComments: async () => {
    // const [comments, setComments] = useState([]);
    // const res = db.collection('entryComments');
    // const data = await res.get();
    // console.log(data);
    // data.docs.forEach((comment) => {
    //   console.log(setComments(comment));
    // });
    // return comments;
  },
  getStories: async () => {
    const instance = await createInstance();

    const res = await instance.get('stories');
    const { data } = res;
    return {
      pageData: data,
      previousID: 1,
    };
  },
  getMovies: async () => {
    const instance = await createInstance();

    const res = await instance.get('movies?pageNumber=1&pageSize=10');

    const { data } = res;
    return {
      pageData: data,
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
  getChallenges: async () => {
    const instance = await createInstance();

    const res = await instance.get(`challenge-groups`);

    const { data } = res;
    // console.log(data);
    return {
      pageData: data,
    };
  },
  getExplore: async () => {
    const instance = await createInstance();

    const res = await instance.get(`category-groups`);

    const { data } = res;
    // console.log(data);
    return {
      pageData: data,
    };
  },
  getWoozData: async (id) => {
    const instance = await createInstance();

    const res = await instance.get(`entries?challengeId=${id}`);
    const { data } = res;
    // console.log('from fetch => ', );
    return {
      pageData: data,
    };
  },
  cancelRequest: (msg) => source.cancel(msg),
};
