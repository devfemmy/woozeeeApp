import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import DocCard from 'src/components/DocCard/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from '../../../../../../../services/api/index'
const Upcoming = (props) => {
    const navigation = useNavigation();
    const [loading, setIsLoading] = useState(false)
    
    useEffect(() => {
        AsyncStorage.getItem('USER_AUTH_TOKEN')
        .then((res) => {
          axios
            .get(`care/appointments/upcoming`, {
              headers: {
                'content-type': 'application/x-www-form-urlencoded',
                Authorization: res, 
                'Care-Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9hbXMuZG9jdG9vcmEuY29tXC9hcGlcL2F1dGhcL2NvcnBvcmF0ZXNcL2FkbWluXC9sb2dpbiIsImlhdCI6MTYzMDQzMTM5MiwiZXhwIjoxNjMxMDM2MTkyLCJuYmYiOjE2MzA0MzEzOTIsImp0aSI6ImNpUjQ4bVdlRVZGbjJNT3ciLCJzdWIiOjE3MCwicHJ2IjoiNzUyODk1NjcxMGQxYzc1YjY3MTMwZDRlNGM1YzBlZTlhMGFlYjYxNCJ9.8Mm7XgT818WudYASQSNp_YtbjGaLsYHxibVFxkoGRUo' 
              },
            })
            .then((res) => {
              console.log("response", res);
              setIsLoading(false);
            })
            .catch((err) => {
              setIsLoading(false);
              console.log(err.response);
              //   alert('Network Error')
            });
        })
        .catch((err) => err);
    }, [])
    return(
        <ScrollView style= {styles.container}>
        <DocCard
                upcoming
                profile 
                date= "20 July, 2021, 10:00AM"
                purpose= "Video Consultation"
                hname= "Louis Med Hospital, Lekki, Lagos"
                title= "General Practitioner"
                onPress= {() => navigation.navigate('AppointmentDetails')} 
                mheight= {100} image= {require('../../../../../../../assets/images/askADoc/doc1.png')} 
                doc= "Dr. Jules Wazobia" />
        <DocCard
                upcoming
                profile 
                date= "20 July, 2021, 10:00AM"
                purpose= "Family Visit"
                hname= "Louis Med Hospital, Lekki, Lagos"
                title= "Cardiologist"
                onPress= {() => navigation.navigate('AppointmentDetails')} 
                mheight= {100} image= {require('../../../../../../../assets/images/askADoc/doc2.png')} 
                doc= "Dr. Jules Wazobia" />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    }
});

export default Upcoming