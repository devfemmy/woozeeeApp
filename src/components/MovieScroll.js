import React, { useState, useEffect } from 'react';
import { Image, View, ActivityIndicator } from 'react-native';
import { Text } from '@ui-kitten/components';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from '../services/api/index';

const MovieScroll = (props) => {
    const [loading, setLoading] = useState(true);
    const [topTen, setTopTen] = useState(null);
    const [TopTenArr, setTopTenArray] = useState([]);
    const [popular, setPopular] = useState(null);
    const [popularArray, setPopularArray] = useState([]);
    const [comingSoon, setComingSoon] = useState(null);
    const [comingSoonData, setComingSoonData] = useState([]);

    const navigation = useNavigation();

    const getTopTenMovies = () => {
        setLoading(true);
        AsyncStorage.getItem('USER_AUTH_TOKEN')
          .then((res) => {
            axios
              .get(`movies/groupings/topten`, {
                headers: { Authorization: res },
              })
              .then((response) => {
                setLoading(false);
                const topTen = response.data.message;
                const data = response.data.data;
                setTopTen(topTen);
                setTopTenArray(data)
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
      const getPopularMovies = () => {
        setLoading(true);
        AsyncStorage.getItem('USER_AUTH_TOKEN')
          .then((res) => {
            axios
              .get(`movies/groupings/popular`, {
                headers: { Authorization: res },
              })
              .then((response) => {
                setLoading(false);
                const popular = response.data.message;
                const data = response.data.data;
                setPopular(popular);
                setPopularArray(data)
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
                const comingSoon = response.data.message;
                const data = response.data.data;
                setComingSoon(comingSoon);
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
        getPopularMovies();
        getTopTenMovies();
        getComingSoon();

      }, []);
      if (loading) {
        return (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
           <ActivityIndicator  size="large" color="#FF5757" />
          </View>
        );
      }
    return (
        <>
                <View style= {{marginVertical: 10}}>
            {props.show ? 
            <Text style={{color: '#0959AB', marginBottom: 5}} category= "h5">
               {"Top Ten in woozeee"}
             </Text>  : null     
        }

            <ScrollView horizontal>
                {TopTenArr.map(
                    (data, index) => {
                        return(
                        <TouchableOpacity  onPress= {() => navigation.navigate('ViewMovies', {movie_data: data, signal: true})}
                          key= {index}>
                            <Image 
                            defaultSource={require('../assets/images/movies/movie_placeholder.png')}
                            style= {{width: 130, height: 150, resizeMode: 'contain'}} 
                            source= {{uri: data.posterURL[0]}} />
                        </TouchableOpacity>
                        )
                    }
                )}
            </ScrollView>
        </View>
        <View style= {{marginVertical: 10}}>
            {props.show ? 
            <Text style={{color: '#0959AB', marginBottom: 5}} category= "h5">
               {popular}
             </Text>  : null     
        }
            {popularArray.length === 0 ? 
        <Text style= {{textAlign: 'center'}}>No data for this</Text> : 
        <ScrollView horizontal>
        {popularArray.map(
            (data, index) => {
                return(
                <TouchableOpacity onPress= {() =>
                    navigation.navigate('ViewMovies', { movie_data: data })
                  } key= {index}>
                    <Image 
                    defaultSource={require('../assets/images/movies/movie_placeholder.png')}
                    style= {{width: 130, height: 150, resizeMode: 'contain'}} 
                    source= {{uri: data.posterURL[0]}} />
                </TouchableOpacity>
                )
            }
        )}
    </ScrollView>    
        
        }
        </View>
        <View style= {{marginVertical: 10}}>
            {props.show ? 
            <Text style={{color: '#0959AB', marginBottom: 5}} category= "h5">
               {comingSoon}
             </Text>  : null     
        }
            {comingSoonData.length === 0 ? 
        <Text style= {{textAlign: 'center'}}>No data for this</Text> : 
        <ScrollView horizontal>
        {comingSoonData.map(
            (data, index) => {

                return(
                <TouchableOpacity onPress= {() => navigation.navigate('MoviePage', {item: movie_data.item})}  key= {index}>
                    <Image 
                    defaultSource={require('../assets/images/movies/movie_placeholder.png')}
                    style= {{width: 130, height: 150, resizeMode: 'contain'}} 
                    source= {{uri: data.posterURL[0]}} />
                </TouchableOpacity>
                )
            }
        )}
    </ScrollView>    
        
        }
        </View>
        </>
    )
}

export default MovieScroll