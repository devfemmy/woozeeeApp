import axios from 'axios';

const baseUrl = 'https://apis.woozeee.com/api/v1/user/';

export const postAction = async (userInfo, actionType, methodType) => {
  const config = {
    method: { methodType },
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(userInfo),
  };
  const res = await axios.post(baseUrl + actionType, userInfo, config);
  return res;
};

export const getAction = async (actionType) => {
  const res = await fetch(baseUrl + actionType);
};
