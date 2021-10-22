import React, { useState } from 'react';
import {
    Layout,Text,Datepicker,Button,
    Spinner
  } from '@ui-kitten/components';
import { StyleSheet, View, Image } from 'react-native';
import TopNavigationArea from 'src/components/TopNavigationArea/index';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import DocCard from 'src/components/DocCard/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from '../../../../../../../../services/api/index';
import qs from 'qs';

const ConfirmationPage = (props) => {
    const {profile, slot, care, form} = props.route.params;
    const [isLoading, setIsLoading] = useState(false);
    const completePayment= () => {
        setIsLoading(true)
        AsyncStorage.getItem('USER_AUTH_TOKEN')
        .then((res) => {
        console.log("start");
        const data = {
            type: slot.type,
            price: slot.price,
            duration: slot.session,
            booking_date: slot.appointmentDate,
            time :  new Array(slot.time),
            reason: form.reason,
            complaint: form.complaint,
            professional_id: profile.professional_id,
            location: slot.location,
            group_practice_id: profile.professional_id,
            reference: 'hdhdhdhdhjdj',
            total_price: slot.price + 500,
            health_condition: new Array (form.reason, form.complaint),
        }
          axios
            .post(`care/appointments/book`, data, {
              headers: {
                // 'content-type': 'application/x-www-form-urlencoded',
                Authorization: res, 
                'Care-Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9hbXMuZG9jdG9vcmEuY29tXC9hcGlcL2F1dGhcL2NvcnBvcmF0ZXNcL2FkbWluXC9sb2dpbiIsImlhdCI6MTYzMDQzMTM5MiwiZXhwIjoxNjMxMDM2MTkyLCJuYmYiOjE2MzA0MzEzOTIsImp0aSI6ImNpUjQ4bVdlRVZGbjJNT3ciLCJzdWIiOjE3MCwicHJ2IjoiNzUyODk1NjcxMGQxYzc1YjY3MTMwZDRlNGM1YzBlZTlhMGFlYjYxNCJ9.8Mm7XgT818WudYASQSNp_YtbjGaLsYHxibVFxkoGRUo' 
              },
            })
            .then((res) => {
            console.log("response", res)
              setIsLoading(false);
            })
            .catch((err) => {
              setIsLoading(false);
              console.log(err.response);
              //   alert('Network Error')
            });
        })
        .catch((err) => err);
    }
    const renderSpinner = () => <Spinner size="tiny" status="danger" />;

    return (
        <Layout level="6" style={{ flex: 1 }}>
            <TopNavigationArea
            title={`Confirmation`}
            navigation={props.navigation}
            screen="auth"
            />
            <ScrollView style= {{padding: 20}}>
                <DocCard
                profile 
                // title= {specialty}
                onPress= {() => props.navigation.navigate('DoctorProfile', {profile: data})} 
                mheight= {100} 
                email={profile.email}
                image= {{uri: profile.dp}} 
                doc= {`${profile.title} ${profile.firstname} ${profile.lastname}`} /> 
                <View style= {{marginVertical: 10}}>
                    <View style= {styles.lowerCon}>
                        <Text style= {styles.catText} category= "h5">
                            Appointment Details
                        </Text>
                        <View>
                            <Text style= {styles.header} category= "h6">
                            Date
                            </Text>
                            <Text style= {{marginBottom: 10}} category= "c1">
                            {slot.appointmentDate} | {slot.time}
                            </Text>
                            <Text style= {styles.header} category= "h6">
                            Type
                            </Text>
                            <Text style= {{marginBottom: 10}} category= "c1">
                                {slot.type}
                            </Text>
                            <Text style= {styles.header} category= "h6">
                            Payment Method
                            </Text>
                            <View style= {{flexDirection: 'row'}}>
                            <Image style= {styles.cardStyle} source= {require('../../../../../../../../assets/images/card/card3.png')} />
                                <View style= {{marginLeft: 15}}>
                                    <Text style= {{color: '#043F7C'}}>Woozee Care Bundle</Text>
                                    <Text style= {{color: '#00B272'}} category= "c2">ELITE PLAN</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style= {styles.lowerCon}>
                        <Text style= {styles.catText} category= "h5">
                            Cancellation Policy
                        </Text>
                        <Text style= {styles.header} category= "h6">
                        Non-refundable (₦ {slot.price}.00)
                        </Text>
                        <Text category= "c1">
                        Non-refundable: Cancel before you start apointment  
                        </Text>
                    </View>
                    <View style= {styles.lowerCon}>
                    <Text style= {styles.catText} category= "h5">
                        Price Details
                    </Text>
                    <View style= {styles.flexContainer}>
                        <View>
                            <Text style= {{marginBottom: 10}} category= "s1">
                            {slot.type}
                            </Text>
                            {/* <Text style= {{marginBottom: 10}} category= "s1">
                            Service Charge
                            </Text> */}
                        </View>
                        <View>
                            <Text style= {{marginBottom: 10, textAlign: 'right'}} category= "s1">
                            ₦{slot.price}.00
                            </Text>
                            {/* <Text style= {{marginBottom: 10, textAlign: 'right'}} category= "s1">
                            ₦ 500.00
                            </Text> */}
                        </View>
                    </View>
                    <View style= {styles.flexContainer}>
                            <Text style= {{marginBottom: 10, color: '#043F7C'}} category= "h5">
                                Total
                            </Text>
                            <Text style= {{marginBottom: 10, color: '#043F7C'}} category= "h5">
                            ₦ {slot.price}.00
                            </Text>

                    </View>
                    </View>
                </View>
            </ScrollView>
            <View style= {styles.footer}>
                {care ? 
                <Button
                        status="danger"
                        size="large"
                        accessibilityLiveRegion="assertive"
                        accessibilityComponentType="button"
                        accessibilityLabel="Continue"
                        accessoryLeft={isLoading ? renderSpinner : null}
                        disabled={isLoading}
                        onPress= {completePayment}
                    >
                        <Text status="control">{'Complete'}</Text>
                </Button> 
            :  
                <Button
                status="danger"
                size="large"
                accessibilityLiveRegion="assertive"
                accessibilityComponentType="button"
                accessibilityLabel="Continue"
                // disabled={isLoading}
                onPress= {() => props.navigation.navigate('BillPaymentSuccess',
                {success: 'Your Hospital Visit appointment with Dr. Jules Wazobia has been successfully confirmed. A notification will be sent to your inbox'})}
                >
                <Text status="control">{'Complete'}</Text>
                </Button>             
            }

            </View>
        </Layout>
    )
    
}

const styles = StyleSheet.create({
    catText: {
         color: '#043F7C',
         marginVertical: 10
    },
    footer: {
        paddingHorizontal: 20
    },
    flexContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
    },
    header: {
        marginVertical: 8
    },
    lowerCon: {
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 0, 0, 0.1)',
        paddingBottom: 10
    },
    slot: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    cardStyle: {
        width: 30,
        height: 30,
        resizeMode: 'contain'
    } 
})


export default ConfirmationPage