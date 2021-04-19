import axios from 'axios';

const { CancelToken } = axios;

const source = CancelToken.source();

const instance = axios.create({
  baseURL: 'https://api.jsonbin.io/',
  timeout: 60000,
  timeoutErrorMessage: 'Request took too long, please try again',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json:charset=utf-8',
    'secret-key':
      '$2b$10$Pi1RPDrKJH7S3a8Ke49Z1.9aNDp.xJ1jnkYibTnPFTIE15eV424lS',
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
