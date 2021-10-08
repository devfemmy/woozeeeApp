import React, { useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { getEmail, getToken } from '../../../api/index';
import { baseUrl } from '../index';

const { CancelToken } = axios;

const source = CancelToken.source();

//Globus Bank Requests

export const searchLoans = async (amount) => {
  const token = await getToken();

  const config = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token,
    },
    url: `${baseUrl}loan/search?amount=${amount}`,
  };

  let res;

  try {
    res = await axios(config);
    return res;
  } catch (error) {
    console.log(error);
  }
};
