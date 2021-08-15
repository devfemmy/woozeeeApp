import React, { useState, useEffect } from 'react';
import { Layout, List, Text } from '@ui-kitten/components';
import { StyleSheet, View, Image, ActivityIndicator } from 'react-native';
import TopNavigationArea from 'src/components/TopNavigationArea/index';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from '../../../../../../services/api/index';
const ComingSoon = (props) => {
    const [comingSoonData, setComingSoonData] = useState([]);
    const [loading, setLoading] = useState(false)

    const getComingSoon = () => {
        setLoading(true);
        AsyncStorage.getItem('USER_AUTH_TOKEN')
          .then((res) => {
            axios
              .get(`movies/groupings/soon`, {
                headers: { Authorization: res },
              })
              .then((response) => {
                setLoading(false);
                const data = response.data.data;
                setComingSoonData(data)
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
        getComingSoon()
    }, [])
    const banner = [
        {
            id: 1,
            image: require('../../../../../../assets/images/movies/soon1.png'),
            type: 'New Arrival',
            title: 'Oloture',
            release: '5 days ago'
        },
        {
            id: 2,
            image: require('../../../../../../assets/images/movies/soon2.png'),
            type: 'New Arrival',
            title: 'Omo Ghetto',
            release: '5 days ago'
        },
        {
            id: 3,
            image: require('../../../../../../assets/images/movies/soon3.png'),
            type: 'New Arrival',
            title: 'Sugar Rush',
            release: '5 days ago'
        },
        {
            id: 4,
            image: require('../../../../../../assets/images/movies/soon4.png'),
            type: 'New Arrival',
            title: 'King of Boys',
            release: '5 days ago'
        },

    ]
    if (loading) {
        return (
        <>
        <TopNavigationArea
        title={`Coming Soon`}
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
        title={`Coming Soon`}
        navigation={props.navigation}
        screen="auth"
      />
      {comingSoonData.length === 0 ? 
    <View style= {{justifyContent: 'center', alignItems: 'center', flex: 1, paddingVertical: 20}}>
        <Text>No Coming Soon Data</Text>
    </View>  : 
      <ScrollView>
      {banner.map(
          item => {
            return (
                <View style= {styles.flexCont}>
                    <Image style= {styles.image} source= {item.image} />
                    <View style= {{width: '60%'}}>
                        <Text>
                            {item.type}
                        </Text>
                        <Text category= "h5">
                            {item.title}
                        </Text>
                        <Text category= "c1">
                            {item.release}
                        </Text>
                    </View>
                 </View>
            )
          }
      )}

    </ScrollView>
    }
        </Layout>
    )
}
const styles = StyleSheet.create({
    flexCont: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderColor: 'rgba(148, 148, 149, 0.3)'
    },
    image: {
        resizeMode: 'contain'
    }
})
export default ComingSoon;