import React, { useState } from 'react';
import {
    Layout,Text,Datepicker,Button,Spinner
  } from '@ui-kitten/components';
import Carousel from 'react-native-snap-carousel';
import TopNavigationArea from 'src/components/TopNavigationArea/index';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Image, StyleSheet, View } from 'react-native';
import { TextIcon } from 'src/components/IconPacks/TextIcon';
import qs from 'qs';
import { IconCalendar } from 'src/components/CustomIcons';
import { GeneralDatePicker, GeneralSelect } from 'src/components/FormFields/index';
import services from './services.json';
import specialty from './specialty.json';
import location from './location.json';
import DocLabel from 'src/components/DocLabel/index';
import BackgroundVideo from 'src/components/BackgroundVideo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from '../../../../../../../services/api/index';
import ConnectDocCard from 'src/components/ConnectDocCard/index';
const AskADoctor = ({navigation}) => {
    const [date, setDate] = useState(new Date());
    const [_carousel, setCarousel] = useState(null);
    const [isLoading, setIsLoading] = useState(false)
    const [form, setFormValues] = useState({
          visit_type: '',
          location: '',
          specialization: '',
          date: ''
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

      const videoSliders = [
        {
          title: 'social',
          banner: require('assets/images/banner/woozeee-socials.jpg'),
          video:
            'https://firebasestorage.googleapis.com/v0/b/woozeee-d7f6c.appspot.com/o/app-assets%2Fsocial.mp4?alt=media&token=afc818c3-7857-4368-88b9-3d2d16baea09',
          screen: 'SocialRoute',
        },
        {
          title: 'marketplace',
          banner: require('assets/images/banner/woozeee-marketplace.jpg'),
          video:
            'https://firebasestorage.googleapis.com/v0/b/woozeee-d7f6c.appspot.com/o/app-assets%2Fmarket.mp4?alt=media&token=2709a1b4-8d3b-4d74-a364-63a276e94493',
          screen: 'MarketPlaceRoute',
          // screen: 'openComingSoonMarket',
        },
        {
          title: 'charity',
          banner: require('assets/images/banner/woozeee-charity.jpg'),
          video:
            'https://firebasestorage.googleapis.com/v0/b/woozeee-d7f6c.appspot.com/o/app-assets%2Fcharity.mp4?alt=media&token=c837385b-fef5-4df3-ad36-c36560fe0ee0',
          // screen: 'CharityRoute',
          screen: 'openComingSoonCharity',
        },
      ];

    const _renderItem = ({item, index}) => {
        return (
            // <View key= {index}>
            //     <BackgroundVideo
            //     videoUri={item.video}
            //     thumbUri={item.banner}
            //     style={{ borderRadius: 5 }}
            //     isMuted
            // />
            // </View>
            <View key= {index} style={styles.slide}>
                <TouchableOpacity>
                    <Image  
                    style= {styles.slider} source= {item.banner} />
                </TouchableOpacity>
            </View>
        );
    }
    const renderSpinner = () => <Spinner size="tiny" status="danger" />;

    const setNewDateHandler = (date) => {
        setDate(date);
      }
    const SERVICES = services;
    const SPECIALTY = specialty;
    const AVAILABLE_LOCATIONS = location;

    const doctors = [
      {
        id: 1,
        image: require('assets/images/askADoc/ad1.png'),
        name: 'Dr Wazobia Faleti',
        experience: '8 Years',
        patients: '22.5k',
        review: '3',
        title: 'Neurosurgeon'
      },
      {
        id: 2,
        image: require('assets/images/askADoc/ad1.png'),
        name: 'Dr Wazobia Faleti',
        experience: '7 Years',
        patients: '2.5k',
        review: '3',
        title: 'Dentist'
      },
      {
        id: 3,
        image: require('assets/images/askADoc/ad1.png'),
        name: 'Dr Blessing Faleti',
        experience: '6 Years',
        patients: '22.1k',
        review: '4',
        title: 'Neurosurgeon'
      },
      {
        id: 4,
        image: require('assets/images/askADoc/ad1.png'),
        name: 'Dr Wazobia Blessed',
        experience: '8 Years',
        patients: '22.5k',
        review: '3',
        title: 'Optician'
      },
      {
        id: 5,
        image: require('assets/images/askADoc/ad1.png'),
        name: 'Dr Wazobia Faleti',
        experience: '8 Years',
        patients: '22.5k',
        review: '3',
        title: 'Orthopadician'
      },

    ]
    const searchProfessionals = () => {
      setIsLoading(true);
      const formattedDate =  form.date.split("/").reverse().join("-");
      AsyncStorage.getItem('USER_AUTH_TOKEN')
      .then((res) => {
        // const data = form;
        // axios({
        //   method: 'post',
        //   url: 'https://apis.woozeee.com/api/v1/care/professionals/search',
        //   data: qs.stringify({
        //     visit_type: form.visit_type,
        //     location: form.location,
        //     specialization: form.specialization,
        //     date: formattedDate
        //   }),
        //   headers: {
        //     'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        //     Authorization: res,
        //     'Care-Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9hbXMuZG9jdG9vcmEuY29tXC9hcGlcL2F1dGhcL2NvcnBvcmF0ZXNcL2FkbWluXC9sb2dpbiIsImlhdCI6MTYzMDQzMTM5MiwiZXhwIjoxNjMxMDM2MTkyLCJuYmYiOjE2MzA0MzEzOTIsImp0aSI6ImNpUjQ4bVdlRVZGbjJNT3ciLCJzdWIiOjE3MCwicHJ2IjoiNzUyODk1NjcxMGQxYzc1YjY3MTMwZDRlNGM1YzBlZTlhMGFlYjYxNCJ9.8Mm7XgT818WudYASQSNp_YtbjGaLsYHxibVFxkoGRUo' 

        //   }
        // })
        axios
          .post(`care/professionals/search`, qs.stringify({
            visit_type: form.visit_type,
            location: form.location,
            specialization: form.specialization,
            date: formattedDate
          }), {
            headers: {
              'content-type': 'application/x-www-form-urlencoded',
              Authorization: res, 
              'Care-Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9hbXMuZG9jdG9vcmEuY29tXC9hcGlcL2F1dGhcL2NvcnBvcmF0ZXNcL2FkbWluXC9sb2dpbiIsImlhdCI6MTYzMDQzMTM5MiwiZXhwIjoxNjMxMDM2MTkyLCJuYmYiOjE2MzA0MzEzOTIsImp0aSI6ImNpUjQ4bVdlRVZGbjJNT3ciLCJzdWIiOjE3MCwicHJ2IjoiNzUyODk1NjcxMGQxYzc1YjY3MTMwZDRlNGM1YzBlZTlhMGFlYjYxNCJ9.8Mm7XgT818WudYASQSNp_YtbjGaLsYHxibVFxkoGRUo' 
            },
          })
          .then((res) => {
            console.log("response", res.data.message.alternateResult);
            const professionals = res.data.message.alternateResult;
            navigation.navigate('Consultation', {results: professionals, specialty: form.specialization, visit_type: form.visit_type})
            setIsLoading(false);
          })
          .catch((err) => {
            setIsLoading(false);
            console.log(err.response);
            //   alert('Network Error')
          });
      })
      .catch((err) => err);
      // navigation.navigate('Consultation')
    }
    console.log("forms collected", form)
    return (
        <Layout level="6" style={{ flex: 1 }}>
            <TopNavigationArea
            title={`Ask A Doctor`}
            navigation={navigation}
            screen="auth"
            />
            <View>
                <Carousel
                    ref={(c) => setCarousel(c)}
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
                        type="visit_type"
                        label={'How do you want to access our Service?'}
                        data={SERVICES}
                        setFormValues={setFormValues}
                        />
                </View>
                <View style= {{marginVertical: 10}}>
                    <GeneralSelect
                        type="specialization"
                        label={'Select Specialty'}
                        data={SPECIALTY}
                        setFormValues={setFormValues}
                        />
                </View>
                <View style= {{marginVertical: 10}}>
                    <GeneralSelect
                        type="location"
                        label={'Select Location'}
                        data={AVAILABLE_LOCATIONS}
                        setFormValues={setFormValues}
                        />
                </View>
                <View style= {{marginVertical: 10}}>
                    {/* <Datepicker
                    label={'Select Date'}
                    type="date"
                    date={date}
                    onSelect={nextDate => setNewDateHandler(nextDate)}
                    min = {new Date ('12-05-1880')}
                    max= {new Date('12-05-3030')}
                    accessoryRight={IconCalendar}
                /> */}
                  <GeneralDatePicker
                      show
                      type="date"
                      label={'Date'}
                      date={date}
                      onSelect={(nextDate) => setNewDateHandler(nextDate)}
                      setFormValues={setFormValues}
                      accessoryRight={IconCalendar}
                    />
                </View>
                <View style={{ paddingVertical: 20 }}>
                <Button
                    status="danger"
                    size="large"
                    accessibilityLiveRegion="assertive"
                    accessibilityComponentType="button"
                    accessibilityLabel="Continue"
                    accessoryLeft={isLoading ? renderSpinner : null}
                    disabled={isLoading}
                    onPress= {searchProfessionals}
                >
                    <Text status="control">{'Search'}</Text>
                </Button>
                </View>
                <View style= {styles.lowerContainer}>
                    <Text style= {{marginVertical: 5}} category= "h5">
                        Categories
                    </Text>
                    <ScrollView horizontal>
                        
                        <DocLabel
                        onPress= {() => navigation.navigate('InnerPages', {title: 'Available Doctors', 
                        address: null,
                        name: 'Doctor Ade',
                        image: require('../../../../../../../assets/images/askADoc/doc1.png')})} 
                        text= "Doctor"
                        image= {require('../../../../../../../assets/images/askADoc/label1.png')} />
                        <DocLabel
                        onPress= {() => navigation.navigate('InnerPages', {title: 'Hospitals', 
                        name: 'Mayo Clinic',
                        address: "15C Admiralty Way, Lekki Phase 1, Lagos",
                        image: require('../../../../../../../assets/images/askADoc/item1.png')})}  
                        text= "Hospital"
                        image= {require('../../../../../../../assets/images/askADoc/label2.png')} />
                        <DocLabel
                        onPress= {() => navigation.navigate('InnerPages', {title: 'Pharmacy', 
                        name: 'Queens Park Pharmacy',
                        address: "15C Admiralty Way, Lekki Phase 1, Lagos",
                        image: require('../../../../../../../assets/images/askADoc/item2.png')})}  
                        text= "Pharmacy"
                        image= {require('../../../../../../../assets/images/askADoc/label3.png')} />
                       <DocLabel
                        onPress= {() => navigation.navigate('InnerPages', {title: 'Laboratories', 
                        name: 'Clina-Lancet Laboratories',
                        address: "15C Admiralty Way, Lekki Phase 1, Lagos",
                        image: require('../../../../../../../assets/images/askADoc/item3.png')})}  
                        text= "Laboratories"
                        image= {require('../../../../../../../assets/images/askADoc/label2.png')} />
                    </ScrollView>
                    <View style= {{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Text category= "h5">
                            Available Doctors
                        </Text>
                        <Text
                         onPress= {() => navigation.navigate('InnerPages', {title: 'Available Doctors', 
                         address: null,
                         name: 'Doctor Ade',
                         image: require('../../../../../../../assets/images/askADoc/doc1.png')})} 
                         text= "Talk to a Doctor"
                         image= {require('../../../../../../../assets/images/askADoc/label1.png')} 
                        category= "h6" style= {{color: '#043F7C', fontWeight: 'bold'}}>
                            See All
                        </Text>
                    </View>
                    <ScrollView horizontal>
                      {doctors.map(
                        (item, index) => {
                          return(
                            <View key= {index}>
                              <ConnectDocCard
                              onPress= {() => navigation.navigate('DoctorProfile')}
                              patient= {item.patients}
                              review= {item.review}
                              experience= {item.experience} 
                              title= {item.title}
                              source= {item.image} 
                              doc= {item.name} />
                            </View>
                          )
                        }
                      )}
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