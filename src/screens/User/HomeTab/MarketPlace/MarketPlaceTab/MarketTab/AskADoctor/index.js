import React, { useState } from 'react';
import {
    Layout,Text,Datepicker,Button
  } from '@ui-kitten/components';
import Carousel from 'react-native-snap-carousel';
import TopNavigationArea from 'src/components/TopNavigationArea/index';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Image, StyleSheet, View } from 'react-native';
import { TextIcon } from 'src/components/IconPacks/TextIcon';
import { IconCalendar } from 'src/components/CustomIcons';
import { GeneralSelect } from 'src/components/FormFields/index';
import services from './services.json';
import specialty from './specialty.json'
import DocLabel from 'src/components/DocLabel/index';

const AskADoctor = ({navigation}) => {
    const [date, setDate] = useState(new Date());
    const [form, setFormValues] = useState({
        fName: '',
        sName: '',
        displayName: '',
        sex: '',
        dob: '',
        country: '',
        state: '',
        bio: '',
        imgUrl: ''
      });
    const sliders = [
        {
          id: 1,
          banner: require('../../../../../../../assets/images/banner/doctor.png'),
        },
        {
          id: 2,
          banner: require('../../../../../../../assets/images/banner/woozeee-ad.jpg'),
        },
        {
          id: 3,
          banner: require('../../../../../../../assets/images/banner/doctor.png'),
        },
      ];

    const _renderItem = ({item, index}) => {
        return (
            <View key= {index} style={styles.slide}>
                <TouchableOpacity>
                    <Image  
                    // defaultSource= {require('../assets/sliders/images/placeholder2.png')} 
                    style= {styles.slider} source= {item.banner} />
                </TouchableOpacity>
            </View>
        );
    }

    const setNewDateHandler = (date) => {
        setDate(date);
      }
    const SERVICES = services;
    const SPECIALTY = specialty;
    return (
        <Layout level="6" style={{ flex: 1 }}>
            <TopNavigationArea
            title={`Ask A Doctor`}
            navigation={navigation}
            screen="auth"
            />
            <View>
                <Carousel
                    // ref={(c) => { _carousel = c; }}
                    data={sliders}
                    renderItem={_renderItem}
                    sliderWidth={400}
                    itemWidth={350}
                    autoplay= {true}
                    lockScrollWhileSnapping= {true}
                    loop= {true}
                    />
            </View>
            <ScrollView style= {styles.container}>
                {/* <TextIcon 
                bold= "bold"
                start
                show
                bg= "transparent"
                color= "#043F7C" fill= "#043F7C" 
                text= "Video/Audio Consultation" 
                icon_name= "arrow-ios-downward-outline" /> */}
                <View style= {{marginVertical: 10}}>
                    <GeneralSelect
                        type="services"
                        label={'How do you want to access our Service?'}
                        data={SERVICES}
                        setFormValues={setFormValues}
                        />
                </View>
                <View style= {{marginVertical: 15}}>
                    <GeneralSelect
                        type="specialty"
                        label={'Select Specialty'}
                        data={SPECIALTY}
                        setFormValues={setFormValues}
                        />
                </View>
                    <Datepicker
                    label={'Select Date'}
                    date={date}
                    onSelect={nextDate => setNewDateHandler(nextDate)}
                    min = {new Date ('12-05-1880')}
                    max= {new Date()}
                    accessoryLeft={IconCalendar}
                />
                <View style={{ paddingVertical: 20 }}>
                <Button
                    status="danger"
                    size="large"
                    accessibilityLiveRegion="assertive"
                    accessibilityComponentType="button"
                    accessibilityLabel="Continue"
                    // disabled={isLoading}
                    onPress= {() => navigation.navigate('Consultation')}
                >
                    <Text status="control">{'Search'}</Text>
                </Button>
                </View>
                <View style= {styles.lowerContainer}>
                    <Text category= "h5">
                        Categories
                    </Text>
                    <ScrollView horizontal>
                        
                        <DocLabel 
                        text= "Talk to a Doctor"
                        image= {require('../../../../../../../assets/images/askADoc/label1.png')} />
                        <DocLabel 
                        text= "Hospital"
                        image= {require('../../../../../../../assets/images/askADoc/label2.png')} />
                        <DocLabel 
                        text= "Pharmacy"
                        image= {require('../../../../../../../assets/images/askADoc/label3.png')} />
                       <DocLabel 
                        text= "Hospital"
                        image= {require('../../../../../../../assets/images/askADoc/label2.png')} />
                    </ScrollView>
                </View>
            </ScrollView>

        </Layout>
    )
    
}
const styles = StyleSheet.create({
    slide: {
        height: 200,
    },
    slider: {
        width: 350,
        height: 200,
        resizeMode: 'contain'
    },
    container: {
        paddingHorizontal: 20
    }
})

export default AskADoctor