import React, { useState } from 'react';
import {
    Layout,Text,CheckBox,Button
  } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';
import TopNavigationArea from 'src/components/TopNavigationArea/index';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from '../../../../services/api/index';
import { Toast,  Root } from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';


const WoozeePaySummary = (props) => {
    const{title, total, numberOfDays, amount, rate, scheme, slug} = props.route.params;
    const [checked, setChecked] = React.useState(false);
    const [isLoading, setIsLoading] = useState(false)
    // /loan/request
    // title: title, total: total, numberOfDays: numOfDays, amount: amount, rate: interestRate, scheme: scheme;
    const navigateToNext = () => {
        props.navigation.replace('ActivateCareSoloPlan', {slug: slug, amount: amount,})
    }
    const requestLoan = () => {
        setIsLoading(true)
        AsyncStorage.getItem('USER_AUTH_TOKEN').then(res => {
            const data = {
                scheme: 'asset-matrix',
                paymentDetails: {
                    amount: amount,
                    interest: rate/100,
                    numberOfDays: numberOfDays,
                },
                offer: slug,
            }
            axios.post(`loan/request`, data, {
                headers: { Authorization: res },
              }).then(res => {
                setIsLoading(false)
                  console.log("loan", res);
                  Toast.show({
                    text: 'Loan Request Successful',
                    buttonText: 'Okay',
                    position: 'bottom',
                    type: 'success',
                    duration: 2000,
                  });
                  setTimeout(() => {
                    navigateToNext()
                  }, 2000)
              }).catch(err => {
                setIsLoading(false)
                Toast.show({
                    text: 'Loan Request Failed',
                    buttonText: 'Okay',
                    position: 'bottom',
                    type: 'danger',
                    duration: 2000,
                  });
                //   alert('Network Error')
              })
        }
        ).catch(err => err)
    }
    return (
        <Root>
        <Layout level="6" style={{ flex: 1 }}>
            <TopNavigationArea
            title={`Payment Summary`}
            navigation={props.navigation}
            screen="auth"
            />
            <ScrollView style= {styles.container}>
                <Text style= {{color: '#043F7C'}}>Woozee Care Payment Summary</Text>
                <Text>{title}</Text>
                <View style= {styles.flexContainer}>
                    <Text style= {styles.opacity}>
                        Plan
                    </Text>
                    <Text>
                        {title}
                    </Text>
                </View>
                <View style= {styles.flexContainer}>
                    <Text style= {styles.opacity}>
                        Amount
                    </Text>
                    <Text>
                        {amount}
                    </Text>
                </View>
                <View style= {styles.flexContainer}>
                    <Text style= {styles.opacity}>
                        Rate
                    </Text>
                    <Text>
                        {rate}%
                    </Text>
                </View>
                <View style= {styles.flexContainer}>
                    <Text style= {styles.opacity}>
                        Number of Days to be repayed
                    </Text>
                    <Text>
                        {numberOfDays} days
                    </Text>
                </View>
                <View style= {styles.flexContainer}>
                    <Text style= {styles.opacity}>
                        Total Amount to be repayed
                    </Text>
                    <Text category="h5">
                         ₦{total}
                    </Text>
                </View>
                    <View style= {{marginVertical: 20}}>
                        <CheckBox
                        checked={checked}
                        onChange={nextChecked => setChecked(nextChecked)}>
                        Accept Terms and Conditions
                        </CheckBox>
                    </View>
                    <View style= {{marginVertical: 25}}>
                        <Button
                        disabled={!checked}
                        status="danger"
                        onPress={requestLoan}
                        >
                        <Text status="control" category="h6">
                            Proceed
                        </Text>
                        </Button>
                    </View>
                    <Spinner
                    visible={isLoading}
                    />
            </ScrollView>
        </Layout>
        </Root>
    )
    
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    opacity: {
        opacity: 0.7
    },
    flexContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        minHeight: 30,
        marginVertical: 5,
        paddingVertical: 10,
        borderBottomColor: 'rgba(0, 0, 0, 0.2)',
        borderBottomWidth: 1
    }
})

export default WoozeePaySummary