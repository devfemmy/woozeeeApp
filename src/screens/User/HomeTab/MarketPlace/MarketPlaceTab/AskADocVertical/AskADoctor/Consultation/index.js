import React from 'react';
import {
    Layout,Text,Datepicker,Button
  } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';
import TopNavigationArea from 'src/components/TopNavigationArea/index';
import { ScrollView } from 'react-native-gesture-handler';
import DocCard from 'src/components/DocCard/index';

const Consultation = (props) => {
    return (
        <Layout level="6" style={{ flex: 1 }}>
            <TopNavigationArea
            title={`Video/Audio Consultation`}
            navigation={props.navigation}
            screen="auth"
            />
            <ScrollView style= {styles.container}>
                <Text style= {{fontWeight: 'bold'}} category= "h6">
                    All Cardiologist
                </Text>
                <View style= {styles.cardContainer}>
                    <DocCard image= {require('../../../../../../../../assets/images/askADoc/doc1.png')} doc= "Dr. Jules Wazobia" />
                    <DocCard image= {require('../../../../../../../../assets/images/askADoc/doc1.png')} doc= "Dr. Wasiu Wazobia" />
                    <DocCard image= {require('../../../../../../../../assets/images/askADoc/doc1.png')} doc= "Dr. Sifu Wazobia" />
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

    }
})
export default Consultation;