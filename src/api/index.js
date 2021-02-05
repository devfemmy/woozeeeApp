import axios from 'axios';

import { SECRET_KEY } from '@env';

const { CancelToken } = axios;

const source = CancelToken.source();

const instance = axios.create({
  baseURL: 'https://api.jsonbin.io/',
  timeout: 60000,
  timeoutErrorMessage: 'Request took too long, please try again',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json:charset=utf-8',
    'secret-key': SECRET_KEY,
  },
});

export default {
  getVideos: async (url, page, cursor = 1) => ({
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
