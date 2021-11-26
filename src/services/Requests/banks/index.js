import React, { useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

import { getEmail, getToken } from '../../../api/index';
// import { baseUrl } from '../index';

const { CancelToken } = axios;

const baseUrl = 'https://s.moneymatters.woozeee.com/api/v1/';

const source = CancelToken.source();

//Globus Bank Requests

// export const createGlobusAccount = async (form) => {
//   //   console.log('from create Globus', form);

//   const maritalStatusValues = {
//     Single: 'UNMAR',
//     Divorced: 'DIVOR',
//     Married: 'MARR',
//     Widow: 'WIDOW',
//     Widower: 'WIDOWR',
//     'Legally Separated': 'LEGSP',
//     'Live-in Relationship': 'LIVTO',
//   };

//   const data = {
//     salutation: form.title,
//     firstname: form.firstName,
//     middlename: form.middleName,
//     lastname: form.lastName,
//     bvn: form.bvn,
//     streetName: form.street,
//     city: form.lga,
//     state: form.state,
//     dob: form.dob,
//     sex: form.gender.split('')[0],
//     postalCode: form.postalCode,
//     phoneNo: form.mobileNumber,
//     email: form.email,
//     maritalstatus: maritalStatusValues[form.maritalStatus],
//   };

//   const token = await getToken();

//   const config = {
//     method: 'POST',
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//       Authorization: token,
//     },
//     data: JSON.stringify(data),
//     url: `${baseUrl}banks/globusbank/AccountOpening`,
//   };

//   let res;

//   try {
//     res = await axios(config);
//     return res;
//   } catch (error) {
//     console.log(error);
//   }
// };

export const getAccountDetails = async () => {
  const account = [];
  const token = await getToken();
  const accountDetails = await AsyncStorage.getItem('finaTrustAccount');
  const { CustomerID } = JSON.parse(accountDetails);
  try {
    await fetch(`${baseUrl}finaTrust/AccountDetails?customerId=${CustomerID}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token,
      },
    })
      .then((response) => response.json())
      .then((res) => {
        account.push(res);
      });
  } catch (error) {
    console.log(error);
  }
  return account;
};

export const createFinaAccount = async (form) => {
  const body = {
    OtherNames: form.middleName,
    LastName: form.firstName,
    BVN: form.bvn,
    Gender: form.gender === 'Female' ? 0 : 1,
    DateOfBirth: '1997-09-12',
    PhoneNo: form.mobileNumber,
    Email: form.email,
  };

  console.log('from create finatrust', body);

  const token = await getToken();

  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    data: JSON.stringify(body),
    url: `${baseUrl}finaTrust/customer/createAccount`,
  };

  let res;

  try {
    res = await axios(config);
    await AsyncStorage.setItem(
      'finaTrustAccount',
      JSON.stringify(res.data.Message),
    );
    getAccountDetails();
    return res;
  } catch (error) {
    console.log(error);
  }
};
