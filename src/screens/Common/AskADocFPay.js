import React, { useState } from 'react';
import { Layout, Text, Datepicker, Button } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';
import TopNavigationArea from 'src/components/TopNavigationArea/index';
import { PayWithFlutterwave } from 'flutterwave-react-native';
import { v4 as uuidv4 } from 'uuid';

import { getEmail, getToken } from '../../api/index';

const AskADoctorFlutterPay = ({ route, navigation }) => {
  const {slot, profile } = route.params;
  const [emailAddress, setEmail] = useState('');
  const email = async () => {
    const res = await getEmail();
    setEmail(res);
  };
  email();

  const handleRedirect = (response) => {
    console.log("response", response)
    if (response.status === 'cancelled') {
      return;
    } else if (response.status === 'successful') {
      // navigation.navigate('MoviePage', { item: data });
      navigation.replace('ConfirmationPage', 
      {slot: slot, profile: profile, trans_id: response.transaction_id, })
    }else {
      return;
    }
  };

  return (
    <Layout level="6" style={{ flex: 1 }}>
      <TopNavigationArea
        title={`Flutterwave Payment`}
        navigation={navigation}
        screen="auth"
      />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <PayWithFlutterwave
          onRedirect={handleRedirect}
          options={{
            tx_ref: uuidv4(),
            authorization: 'FLWPUBK_TEST-6de3d70ac2e4f0b11def04ff70ca74fd-X',
            customer: {
              email: emailAddress,
            },
            amount: 3000,
            currency: 'NGN',
            payment_options: 'card',
          }}
        />
      </View>
    </Layout>
  );
};

export default AskADoctorFlutterPay;
