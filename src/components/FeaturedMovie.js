import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Video } from 'expo-av';
import MovieDescription from './MovieDescription';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from '../services/api/index';
import { useNavigation } from '@react-navigation/native';

const FeaturedMovie = (props) => {
    const handleVideoRef = React.useRef(null);
    const [loading, setLoading] = useState(false);
    const [movieData, setMovieData] = useState([]);
    const navigation = useNavigation();
    const shuffleArray = (a) => {
      for (let i = a.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
  }

    const getFeaturedMovies = () => {
      setLoading(true);
      AsyncStorage.getItem('USER_AUTH_TOKEN')
        .then((res) => {
          if (props.category_id === '') {
            axios
            .get(`movies/groupings/featured?movieType=${props.movieType}`, {
              headers: { Authorization: res },
            })
            .then((response) => {
              setLoading(false);
              const movieDataArr = response.data.data;
              // const movieDataArr = [1,2, 3,4]
              const shuffledArr = shuffleArray(movieDataArr);
              const firstIndexArr = shuffledArr[0];
              console.log(firstIndexArr, "shuffled Arr");
              setMovieData(firstIndexArr)
              // setMovieData(movieDataArr)

              console.log(response)
            })
            .catch((err) => {
              setLoading(false);
              console.log(err.response);
            });
          }else if (props.category_id === 'all') {
            axios
            .get(`movies/groupings/featured`, {
              headers: { Authorization: res },
            })
            .then((response) => {
              setLoading(false);
              const movieDataArr = response.data.data;
              // const movieDataArr = [1,2, 3,4]
              const shuffledArr = shuffleArray(movieDataArr);
              const firstIndexArr = shuffledArr[0];
              console.log(firstIndexArr, "shuffled Arr");
              setMovieData(firstIndexArr)
              // setMovieData(movieDataArr)

              console.log(response)
            })
            .catch((err) => {
              setLoading(false);
              console.log(err.response);
            });
          }else {
            axios
            .get(`movies/groupings/featured?categoryId=${props.category_id}`, {
              headers: { Authorization: res },
            })
            .then((response) => {
              setLoading(false);
              const movieDataArr = response.data.data;
              // const movieDataArr = [1,2, 3,4]
              const shuffledArr = shuffleArray(movieDataArr);
              const firstIndexArr = shuffledArr[0];
              console.log(firstIndexArr, "shuffled Arr");
              setMovieData(firstIndexArr)
              // setMovieData(movieDataArr)

              console.log(response)
            })
            .catch((err) => {
              setLoading(false);
              console.log(err.response);
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    useEffect(() => {
      getFeaturedMovies()
    }, [])
    
    const VideoPreview = () => (
          <View
            style={{
              //   flex: 1,
              paddingTop: 10,
              paddingHorizontal: 15,
              marginBottom: 20,
            }}
          >
            <Video
              ref={handleVideoRef}
              // isMuted={false}
              isLooping
              source = {{uri: props.uri ? movieData.landscapePreviewURL : props?.url?.landscapePreviewURL}}
              // source = {{uri: videoUri}}
              shouldPlay
              resizeMode="cover"
              style={{ height: 250, width: '100%' }}
            />
          </View>
        );
    const styles = StyleSheet.create({

    });
    if (loading) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Image
          style= {{width: '100%', height: 270}} 
          source= {require('../assets/images/movies/movie_placeholder.png')} />
        </View>
      );
    }
    return (
        <View>
            <VideoPreview />
            {props.active ? 
            null: 
            <MovieDescription
            onPress= {() => navigation.navigate('FlutterPay', {data:movieData})} 
            inList= {movieData?.movieData?.inList} 
            featured = {movieData}
            price = {`₦${movieData?.price}`}
            description = {movieData?.description}
            paid />     
          }
        </View>
    )
    
}

export default FeaturedMovie;
