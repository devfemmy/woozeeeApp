import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.jsonbin.io/',
  timeout: 60000,
  timeoutErrorMessage: 'Request took too long to process',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json:charset=utf-8',
    'secret-key':
      '$2b$10$BifoVKHdKq1J9E8C1YK1nuvsaD4wY9dVW5jNPuy4/mvioQJ84wZ1O',
  },
});

export default {
  // prettier-ignore
  getVideos: (url) => instance({
    method: 'GET',
    url,
    params: {},
  }),
};
