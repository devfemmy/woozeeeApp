import React from 'react';
import {
    Layout,Text,Datepicker,Button
  } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';
import TopNavigationArea from 'src/components/TopNavigationArea/index';
import {PayWithFlutterwave} from 'flutterwave-react-native';

const FlutterPay = (props) => {
    return (
        <Layout level="6" style={{ flex: 1 }}>
            <TopNavigationArea
            title={`Flutterwave Payment`}
            navigation={props.navigation}
            screen="auth"
            />
            <PayWithFlutterwave
                onRedirect={() => alert('successful')}
                options={{
                    tx_ref: '1234535353',
                    authorization: 'FLWPUBK_TEST-6de3d70ac2e4f0b11def04ff70ca74fd-X',
                    customer: {
                    email: 'customer-email@example.com'
                    },
                    amount: 2000,
                    currency: 'NGN',
                    payment_options: 'card'
                }}
                />
        </Layout>
    )
    
}


export default FlutterPay