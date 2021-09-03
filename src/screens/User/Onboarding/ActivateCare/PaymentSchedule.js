import React, { useState } from 'react';
import {
    Layout,Text,Datepicker,Button
  } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';
import TopNavigationArea from 'src/components/TopNavigationArea/index';
import { ScrollView } from 'react-native-gesture-handler';
import RangeSlider from '@jesster2k10/react-native-range-slider';

const PaymentSchedule = (props) => {
    const {amount, scheme, interestRate,title, slug } = props.route.params;
    const [numOfDays, setNumOfDays] = useState(30);
    let price = amount;
    let rate = interestRate/100;
    const onChange = (min, max) => {
        console.log('min: ', min)
        console.log('max: ', max);
        const diff = max-min;
        setNumOfDays(diff + 30)

      }
    // Interest per 30 days
    let interestPer30days = price * rate;
    // Interesr per days chosen;
    let interest = (numOfDays * interestPer30days)/30;
    const total = interest + price
    return (
        <Layout level="6" style={{ flex: 1, }}>
            <TopNavigationArea
            title={`Payment Schedule`}
            navigation={props.navigation}
            screen="auth"
            />
        <ScrollView style= {styles.container} >
        <View style= {styles.wrapper}>
            <Text style= {styles.textStyle}>
                {title}
            </Text>
            <Text style= {styles.textStyle}>
                Loan Amount: ₦{price}
            </Text>
            <Text style= {styles.textStyle}>Loan Repayment at {interestRate}% rate per month</Text>
        </View>
        <Text style= {styles.opacity}>Number of Days ({numOfDays})</Text>
            <View style= {{ paddingHorizontal: 20}}>
                <RangeSlider
                type="range" // ios only
                suffix= " Days"
                minLabelColor="#FF5757"
                maxLabelColor= "#FF5757"
                min={30}
                max={365}
                tintColor="#FF5757"
                handleColor="#043F7C"
                handlePressedColor="#FF5757"
                tintColorBetweenHandles="#043F7C"
                onChange={onChange}
            />
            </View>
        <View style= {styles.flexContainer}>
        <Text style= {styles.opacity}>Total Amount to be paid</Text>
        <Text category= "h5">₦{total}</Text>
        </View>
        <View style= {{marginVertical: 25}}>
            <Button
            status="danger"
            onPress={() => props.navigation.navigate('WoozeePaySummary', {title: title, total: total, numberOfDays: numOfDays, amount: amount, rate: interestRate, scheme: scheme, slug: slug})}
            >
            <Text status="control" category="h6">
                Proceed to Summary
            </Text>
            </Button>
        </View>
        </ScrollView>
        </Layout>
    )
    
}
const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    flexContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },
    textStyle: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    opacity: {
        opacity: 0.5
    },
    wrapper: {
        marginBottom: 15,
        borderBottomColor: 'rgba(0, 0, 0, 0.2)',
        paddingVertical: 10,
        borderBottomWidth: 1
    }
})


export default PaymentSchedule