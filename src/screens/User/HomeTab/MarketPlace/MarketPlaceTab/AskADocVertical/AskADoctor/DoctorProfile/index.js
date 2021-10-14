import React, { useState } from 'react';
import {
    Layout,Text,Datepicker,Button
  } from '@ui-kitten/components';
import { StyleSheet, View, Image } from 'react-native';
import TopNavigationArea from 'src/components/TopNavigationArea/index';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import DocCard from 'src/components/DocCard/index';
import CustomLabel from 'src/components/CustomLabel/index';
import DoctorSlot from 'src/components/DoctorSlot/index';

const DoctorProfile = (props) => {
    const {profile, visit_type, specialty} = props.route.params;
    const data = profile;
    const [active, setActive] = useState(true)
    return (
        <Layout level="6" style={{ flex: 1 }}>
            <TopNavigationArea
            title={`Doctor's Profile`}
            navigation={props.navigation}
            screen="auth"
            />
            <ScrollView style= {{padding: 20}}>
                <DocCard
                profile 
                title= {specialty}
                onPress= {() => props.navigation.navigate('DoctorProfile', {profile: data})} 
                mheight= {100} 
                email={data.email}
                image= {{uri: data.dp}} 
                doc= {`${data.title} ${data.firstname} ${data.lastname}`} /> 
                <View style= {{marginVertical: 10}}>
                    <View style= {styles.lowerCon}>
                        <Text style= {styles.catText} category= "h5">
                            About
                        </Text>
                        <Text category= "s2">
                        {data.info}
                        </Text>
                    </View>
                    <View style= {styles.lowerCon}>
                        <TouchableOpacity onPress= {() => setActive(!active)} style= {{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                            <Text style= {styles.catText} category= "h5">
                                Available Schedule
                            </Text>
                            <Image source= {require('../../../../../../../../assets/images/askADoc/arrow_down.png')} />
                        </TouchableOpacity>
                        {active ? 
                        <View style= {styles.slot}>
                            <DoctorSlot slot= "8:00" />
                            <DoctorSlot slot= "10:00" />
                            <DoctorSlot slot= "13:00" />
                            <DoctorSlot slot= "15:00" />
                            <DoctorSlot slot= "17:00" />
                            <DoctorSlot slot= "18:00" />
                         
                        </View>  : null       
                    }
                    </View>
                    {/* <View style= {styles.lowerCon}>
                        <Text style= {styles.catText} category= "h5">
                            Language
                        </Text>
                        <View style= {styles.flexContainer}>
                        <CustomLabel country text= "English" 
                        source= {require('../../../../../../../../assets/images/askADoc/eng.png')} />
                        <CustomLabel country text= "France" 
                        source= {require('../../../../../../../../assets/images/askADoc/france.png')} />
                        <CustomLabel country text= "German" 
                        source= {require('../../../../../../../../assets/images/askADoc/german.png')} />
                    </View>
                    </View> */}
                    <View style= {styles.lowerCon}>
                        <Text style= {styles.catText} category= "h5">
                             Location
                        </Text>
                        <Text category= "s2">
                        {data.address}
                        </Text>
                    </View>
                    <View style= {styles.lowerCon}>
                    <Text style= {styles.catText} category= "h5">
                        Visit Type
                    </Text>
                    <Text category= "s2">
                        {visit_type}
                    </Text>
                    </View>
                    <View style= {styles.lowerCon}>
                    <Text style= {styles.catText} category= "h5">
                        Session
                    </Text>
                    <Text category= "s1">
                        60 mins
                    </Text>
                    </View>
                    <View style= {styles.lowerCon}>
                    <Text style= {styles.catText} category= "h5">
                        Price
                    </Text>
                    <Text category= "s1">
                        20,000
                    </Text>
                    </View>
                </View>
            </ScrollView>
            <View style= {styles.footer}>
                <Button
                        status="danger"
                        size="large"
                        accessibilityLiveRegion="assertive"
                        accessibilityComponentType="button"
                        accessibilityLabel="Continue"
                        // disabled={isLoading}
                        onPress= {() => props.navigation.navigate('PaymentPage')}
                    >
                        <Text status="control">{'Book Dr Jules Wazobia'}</Text>
                </Button>
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
        width: '80%'
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
    }
})


export default DoctorProfile