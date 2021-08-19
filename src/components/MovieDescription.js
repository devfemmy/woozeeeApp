import React, {useRef, useContext, useState, useEffect} from 'react';
import { StyleSheet, View, Image } from 'react-native';
import {widthPercentageToDP as wp, 
    heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Layout, List, Text } from '@ui-kitten/components';
import { TextIcon } from './IconPacks/TextIcon';
import MovieComponent from './MovieComponent';
import { LocaleContext, AppSettingsContext } from 'src/contexts';
import { Rating, AirbnbRating } from 'react-native-ratings';
import RBSheet from 'react-native-raw-bottom-sheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from '../services/api/index'


const MovieDescription = (props) => {
  const sheetRef = useRef(null);
  const [inlist, setInList] = useState(true);
  const [token, setToken] = useState(null)

  const handleOpenSheet = () => sheetRef.current.open();
  const { appState } = useContext(AppSettingsContext);
  const BG_THEME = appState.darkMode ? '#070A0F' : '#F7F9FC';
  let movie_data;
  let duration;
  // console.log("inlist", props.inList)
  function secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? " hour " : " hours ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " min " : " mins ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " sec" : " sec") : "";
    return hDisplay + mDisplay + sDisplay; 
}
  if (props.featured) {
    movie_data = props.featured
    // duration = new Date(props.featured?.duration * 1000).toISOString().substr(11, 5);
    duration = secondsToHms(props.featured?.duration)
  } else {
    movie_data = props.data
    // duration = new Date(props.data?.duration * 1000).toISOString().substr(11, 5);
    duration = secondsToHms(props.data?.duration)
  }
  const addToMyList = () => {
    setInList(false);
    upDateMyList()
  }
  const removeFromMyList = () => {
    setInList(true);
    upDateMyList()
  }

  const upDateMyList = () => {
    const data = {
      movieId: movie_data?._id,
      inList: inlist
    };
    axios
      .post(`movie-data`, data, {
        headers: { Authorization: token },
      })
      .then((res) => {
        console.log(res, "response")
      })
      .catch((err) => {
        console.log("err", err.response)
      });
  };
  useEffect(() => {
      AsyncStorage.getItem('USER_AUTH_TOKEN')
        .then((res) => {
          setToken(res);
          // setInList(props.inList)
        })
        .catch((err) => err);
  }, []);
    return (
        <Layout level= "6" style= {styles.container}>
            <Text category='h1' style= {styles.textStyle}>
                   {/* {props.title} */}
                {movie_data?.title}
            </Text>  
            <MovieComponent
                // data = {movie_data}
                label= {"New"}
                year= {movie_data?.year}
                rating= "18+"
                duration={duration}
                // duration= {new Date(movie_data?.duration * 1000).toISOString().substr(11, 8)}
                quality= "HD"
                toplist= "10"
                trend= "#1"/>

            <Text category= "h4">
                {props.price === '$undefined' ? null : props.price}
            </Text>
            <View>
            {props.paid ? 
                <TextIcon 
                onPress= {props.onPress}
                bg= "#FF5757"
                color= "white" fill= "white" 
                text= "Purchase" 
                icon_name= "shopping-cart-outline" />
          :
                <TextIcon
                // onPress= {() => console.log('Hello')}
                
                // onPress= {() => navigation.navigate('MoviePage', {item: movie_data.item})} 
                onPress= {() => navigation.navigate('FlutterPay')} 
                bg= "#FF5757"
                color= "white" fill= "white" 
                text= "Purchase" 
                icon_name= "shopping-cart-outline" />          
          }

            </View>
            <View>
              {/* <Text>
                {movie_data.item.description}
              </Text> */}
              <View style= {{marginVertical: 5}}>
                <Text style= {{marginBottom: 5}} numberOfLines= {1}>
                    {props.description}
                </Text>
                <Text numberOfLines= {1}>
                {`Casts: `}
                </Text>
                {/* <Text numberOfLines= {1}>
                Director: {props.director}
                </Text> */}
              </View>
              <View style= {styles.actions}>
                {!inlist ? 
                <TextIcon 
                onPress = {removeFromMyList}
                bg= "transparent"
                color= "grey" fill= "grey" 
                text= "My List" 
                icon_name= {"checkmark-outline"}
                
                />  
                : 
                <TextIcon 
                onPress = {addToMyList}
                bg= "transparent"
                color= "grey" fill= "grey" 
                text= "My List" 
                icon_name= {"plus-outline" }
                
                />      
              }
                {/* <TextIcon 
                onPress= {handleOpenSheet}
                bg= "transparent"
                color= "#494949" fill= "#494949" 
                text= "Rate" 
                icon_name= "star-outline" /> */}
                <TextIcon 
                onPress= {handleOpenSheet}
                bg= "transparent"
                color= "grey" fill= "grey" 
                text= "More Info" 
                icon_name= "alert-circle-outline" />
              </View>
            </View>
            <View>
            <RBSheet
              ref={sheetRef}
              height={180}
              closeOnDragDown
              animationType="fade"
              customStyles={{
                container: {
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: BG_THEME,
                },
              }}
            >
              <View style= {styles.ratingContainer}>
                <View>
                  <Text style= {styles.textAlign} category= "h5">
                    {movie_data?.title}
                  </Text>
                  <Text style= {styles.textAlign}>
                      {movie_data?.description}
                  </Text>
                  {/* <Text>
                    casts: {movie_data.casts[0]}
                  </Text> */}
                </View>
              </View>
            </RBSheet>
            </View>
        </Layout>
    )
}
const styles = StyleSheet.create({
  container: {
      padding: 10,
      paddingTop: 0
    },
    textStyle: {
      fontSize: 20,
      fontWeight: '700'
    },
    actions: {
      width: wp('70%'),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    textAlign: {
      textAlign: 'center'
    },
    ratingContainer: {
      // backgroundColor: 'red',
      height: 150,
      paddingBottom: 50,
      paddingHorizontal: 10
    }
});

export default MovieDescription