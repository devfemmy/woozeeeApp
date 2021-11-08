import React from 'react';
import {
    Layout,Text,Datepicker,Button
  } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';
import TopNavigationArea from 'src/components/TopNavigationArea/index';
import { ScrollView } from 'react-native-gesture-handler';
import DocCard from 'src/components/DocCard/index';

const Consultation = (props) => {
    const {results, specialty, visit_type, dayOfTheWeek, location} = props.route.params;
    console.log("results", results)
    return (
        <Layout level="6" style={{ flex: 1 }}>
            <TopNavigationArea
            title={`Video/Audio Consultation`}
            navigation={props.navigation}
            screen="auth"
            />
            <ScrollView style= {styles.container}>
                {results.length === 0 ? 
                <Text style= {{...styles.textStyle, textAlign: 'center', marginVertical: 20}} category= "h5">
                    No Specialist available
                </Text> :
                <Text style= {styles.textStyle} category= "h5">
                    All {specialty}(s)
                </Text>         
            }
                <View style= {styles.cardContainer}>
                    {results.map((data, index) => {
                        return (
                            <DocCard 
                            key={index}
                            onPress= {() => props.navigation.navigate('DoctorProfile', {profile: data, 
                            visit_type: visit_type, location: location,
                            specialty: specialty, dayOfTheWeek: dayOfTheWeek})} 
                            mheight= {100} 
                            email={data.email}
                            image= {{uri: data.dp}} 
                            doc= {`${data.title} ${data.firstname} ${data.lastname}`} /> 
                        )
                    })}
                </View>
            </ScrollView>
        </Layout>
    )
}
const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    cardContainer: {

    },
    textStyle: {
        textDecorationStyle: 'solid',
        marginBottom: 10
        // textDecorationLine: 'underline'
    }
})
export default Consultation;