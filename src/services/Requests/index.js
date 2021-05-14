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
  const body = {
    entryId: likeData.entryId,
    isLike: true,
  };
  const token = await getToken();

  const config = {
    method: likeData.isLike ? 'delete' : 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token,
    },
    data: body,
    url: `${baseUrl}entry-data`,
  };

  let res;

  try {
    res = await axios(config);
    return res.data;
  } catch (error) {
    console.log(error);
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
  // console.log(comment);
};
