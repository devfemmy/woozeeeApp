import React, { useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { getEmail, getToken } from '../../../api/index';
import { baseUrl } from '../index';

const { CancelToken } = axios;

const source = CancelToken.source();

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

export const searchSavings = async (amount) => {
  const token = await getToken();

  const config = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token,
    },
    url: `${baseUrl}savings/search?amount=${amount}`,
  };

  let res;

  try {
    res = await axios(config);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const apply = async (
  type,
  amount,
  offerId,
  provider,
  account_name,
  account_number,
  bank,
) => {
  const token = await getToken();

  const body = {
    amount: amount,
    offer: offerId,
    provider: 'lapo',
    account_name: account_name,
    account_number: account_number,
    bank: bank,
    paymentDetails: {},
    channel: 'mobile',
  };

  const config = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token,
    },
    data: JSON.stringify(body),
    url: `${baseUrl}${type.toLowerCase()}/apply`,
  };

  let res;

  try {
    res = await axios(config);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
