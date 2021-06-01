import axios from 'axios';

import firebase, { firestore } from 'firebase';

// firebase.initializeApp();
// const db = firestore();

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

export const sendReport = async (userReason, userId) => {
  const data = {
    reason: userReason.reason,
    section: 'socials',
    entryId: userId,
    resolved: false,
  };

  const token = await getToken();

  const config = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token,
    },
    data: data,
    url: `${baseUrl}complaints`,
  };

  let res;

  try {
    res = await axios(config);
    return res.data;
  } catch (error) {
    console.log(error);
  }
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

export const handleFollow = async (userId, following) => {
  const data = {
    userId,
    isFollow: true,
  };

  const token = await getToken();

  const config = {
    method: following ? 'post' : 'delete',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token,
    },
    data,
    url: `${baseUrl}user-data`,
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

export const getUserEntries = async (id) => {
  const config = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `${await getToken()}`,
    },
  };
  const res = await axios.get(baseUrl + `entries?userId=${id}`, config);
  return res;
};

export const sendComment = async () => {
  // const res = db.collection('entryComments');
  // const data = await res.get();
  // console.log(data);
};

export const viewVideo = async (id) => {
  const data = {
    entryId: id,
    isView: true,
  };

  const token = await getToken();

  const config = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token,
    },
    data: data,
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

export const handleBookmark = async (id, isBookmarked) => {
  const data = {
    entryId: id,
    isBookmark: true,
  };

  const token = await getToken();

  const config = {
    method: !isBookmarked ? 'delete' : 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token,
    },
    data: data,
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
