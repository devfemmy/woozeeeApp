import axios from 'axios';

import { getToken } from '../../api/index';

const baseUrl = 'https://apis.woozeee.com/api/v1/';

const axiosReq = async (methodType, reqData) => {
  const config = {
    method: { methodType },
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `${await getToken()}`,
    },
    body: JSON.stringify(reqData),
  };
  let action = methodType.toLowerCase();
  const res = await axios[action](baseUrl + 'entry-data', reqData, config);
  // console.log(res.data);
  // return res;
};

export const handleLike = async (likeData) => {
  console.log(likeData);
  if (likeData.isLike == true) {
    const config = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `${await getToken()}`,
      },
      body: likeData,
    };
    const res = await axios.post(baseUrl + 'entry-data', likeData, config);

    return res;
  } else {
    console.log('Aleem, see oo. It ran!!');
    const config = {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `${await getToken()}`,
      },
      body: JSON.stringify(likeData),
    };
    try {
      const res = await axios.delete(baseUrl + 'entry-data', likeData, config);
      console.log('you unliked');
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  }
};

export const getUserData = async (id) => {
  const config = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `${await getToken()}`,
    },
  };
  const res = await axios.get(baseUrl + `user/user?userId=${id}`, config);
  return res;
};

export const sendComment = (comment) => {
  console.log(comment);
};
