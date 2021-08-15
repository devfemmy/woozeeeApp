import React, { useState, useEffect } from 'react';
import { Layout, List, Text } from '@ui-kitten/components';
import { StyleSheet, View, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import TopNavigationArea from 'src/components/TopNavigationArea/index';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from '../../../../../../services/api/index';

const PreviouslyViewed = (props) => {
    const [prevList, setPrevList] = useState(null);
    const [prevListData, setPrevListData] = useState([]);
    const [loading, setLoading] = useState(false)

    const getPrevViewed = () => {
        setLoading(true);
        AsyncStorage.getItem('USER_AUTH_TOKEN')
          .then((res) => {
            axios
              .get(`movies/groupings/viewed`, {
                headers: { Authorization: res },
              })
              .then((response) => {
                console.log("response", response)
                setLoading(false);
                const prevViewd = response.data.message;
                const data = response.data.data;
                setPrevList(prevViewd);
                setPrevListData(data)
              })
              .catch((err) => {
                setLoading(false);
                console.log(err.response);
              });
          })
          .catch((err) => {
            console.log(err);
          });
      };
    useEffect(() => {
        getPrevViewed()
    }, [])
    const data = [
        {
            id: 1,
            imageSource: require('../../../../../../assets/images/movies/list.png')
        },
        {
            id: 2,
            imageSource: require('../../../../../../assets/images/movies/list6.png')
        },
        {
            id: 3,
            imageSource: require('../../../../../../assets/images/movies/list.png')
        },
        {
            id: 4,
            imageSource: require('../../../../../../assets/images/movies/list6.png')
        },
        {
            id: 5,
            imageSource: require('../../../../../../assets/images/movies/list5.png')
        },
        {
            id: 6,
            imageSource: require('../../../../../../assets/images/movies/list4.png')
        },
        {
            id: 7,
            imageSource: require('../../../../../../assets/images/movies/list3.png')
        },
        {
            id: 8,
            imageSource: require('../../../../../../assets/images/movies/list2.png')
        },
        {
            id: 9,
            imageSource: require('../../../../../../assets/images/movies/list.png')
        },
        {
            id: 10,
            imageSource: require('../../../../../../assets/images/movies/list2.png')
        },
        {
            id: 7,
            imageSource: require('../../../../../../assets/images/movies/list3.png')
        },
        {
            id: 8,
            imageSource: require('../../../../../../assets/images/movies/list2.png')
        },
        {
            id: 9,
            imageSource: require('../../../../../../assets/images/movies/list.png')
        },
        {
            id: 10,
            imageSource: require('../../../../../../assets/images/movies/list2.png')
        },
        {
            id: 7,
            imageSource: require('../../../../../../assets/images/movies/list3.png')
        },
        {
            id: 8,
            imageSource: require('../../../../../../assets/images/movies/list2.png')
        },
        {
            id: 9,
            imageSource: require('../../../../../../assets/images/movies/list.png')
        },
        {
            id: 10,
            imageSource: require('../../../../../../assets/images/movies/list2.png')
        },

    ]
    if (loading) {
        return (
        <>
        <TopNavigationArea
        title={`Previously Viewed`}
        navigation={props.navigation}
        screen="auth"
            />
          <Layout level= "6" style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
           <ActivityIndicator  size="large" color="#FF5757" />
          </Layout>
        </>
        );
      }
    return (
        <Layout level="6" style={{ flex: 1 }}>
            <TopNavigationArea
            title={`Previously Viewed`}
            navigation={props.navigation}
            screen="auth"
        />
        <ScrollView style= {styles.container}>
            {prevListData.length === 0 ? 
        <View style= {{justifyContent: 'center', alignItems: 'center', flex: 1, paddingVertical: 20}}>
            <Text>You have no Previously Viewed</Text>
        </View> : 
        <View style= {styles.flexContainer} >
                   {data.map (
                       item => {
                           return (
                               <TouchableOpacity>
                               <Image 
                               style= {styles.image}
                               source= {item.imageSource} />
                               </TouchableOpacity>
                           )
                       }
                   )}
   
        </View> 
        
        }
        </ScrollView>
        </Layout>
    )
}
const styles = StyleSheet.create({
    flexContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        flexWrap: 'wrap',
    },
    container: {
        margin: 4
    },
    image: {
        width: wp('31%'),
        height: hp('20%'),
        resizeMode: 'cover',
        margin: 2
    }
})
export default PreviouslyViewed;