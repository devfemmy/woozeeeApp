import React, { useState } from 'react';
import {
    Layout,Text,Datepicker,Button, Toggle
  } from '@ui-kitten/components';
import { StyleSheet, View, Image } from 'react-native';
import TopNavigationArea from 'src/components/TopNavigationArea/index';
import TimeSlotCard from 'src/components/TimeSlot';
import { GeneralTextField } from 'src/components/FormFields/index';

const AppDetails = (props) => {
    const {profile, slot} = props.route.params;
    const [form, setFormValues] = useState({
        reason: '',
        complaint: '',
      });
    const styles = StyleSheet.create({
       cardStyle: {
           width: 30,
           height: 30,
           resizeMode: 'contain'
       } 
    });
    return (
        <Layout level="6" style={{ flex: 1 }}>
            <TopNavigationArea
            title={`Appointment Details`}
            navigation={props.navigation}
            screen="auth"
            />
            <View style= {{paddingHorizontal: 20}}>
            <TimeSlotCard
                type={slot.type}
                time={slot.time} price={slot.price}
                session={slot.session} />
            <View style= {{paddingVertical: 20}}>
             <GeneralTextField
                  multiline
                  numberOfLines={5}
                  type="reason"
                  label={'Reason'}
                  setFormValues={setFormValues}
                />
            </View>
            <View style= {{paddingVertical: 20}}>
                <GeneralTextField
                  numberOfLines={5}
                  multiline
                  type="complaint"
                  label={'Complaint'}
                  setFormValues={setFormValues}
                />
            </View>
            <Button
                status="danger"
                size="large"
                accessibilityLiveRegion="assertive"
                accessibilityComponentType="button"
                accessibilityLabel="Continue"
                disabled={!form.reason}
                onPress= {() => props.navigation.navigate('ConfirmationPage', {profile: profile, slot: slot})}
                    >
                <Text status="control">{`Book Dr ${profile.firstname} ${profile.lastname}`}</Text>
                </Button>
            </View>
        </Layout>
    )
    
}


export default AppDetails