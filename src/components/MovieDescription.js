import React, {useRef, useContext, useState} from 'react';
import { StyleSheet, View, Image } from 'react-native';
import {widthPercentageToDP as wp, 
    heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Layout, List, Text } from '@ui-kitten/components';
import { TextIcon } from './IconPacks/TextIcon';
import MovieComponent from './MovieComponent';
import { LocaleContext, AppSettingsContext } from 'src/contexts';
import { Rating, AirbnbRating } from 'react-native-ratings';
import RBSheet from 'react-native-raw-bottom-sheet';


const MovieDescription = (props) => {
  const sheetRef = useRef(null);
  const [inlist, setInList] = useState(false);

  const handleOpenSheet = () => sheetRef.current.open();
  const { appState } = useContext(AppSettingsContext);
  const BG_THEME = appState.darkMode ? '#070A0F' : '#F7F9FC';
  console.log("movie data", props.data);
  const movie_data = props.data;

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
    const  ratingCompleted = (rating) => {
      // setRatings(rating)
    }
    return (
        <Layout level= "6" style= {styles.container}>
            <Text category='h1' style= {styles.textStyle}>
                   {props.title}
                {/* {movie_data.title} */}
            </Text>  
            <MovieComponent
                data = {props.data}
                label= {props.label}
                year= {props.year}
                rating= "13+"
                duration= "1hr 44min"
                quality= "HD"
                toplist= "10"
                trend= "#1"/>

            <Text category= "h4">
                {props.price}
            </Text>
            <View>
            {props.paid ? 
                <TextIcon 
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
                {`Casts: ${props.casts}`}
                </Text>
                <Text numberOfLines= {1}>
                Director: {props.director}
                </Text>
              </View>
              <View style= {styles.actions}>
                <TextIcon 
                bg= "transparent"
                color= "grey" fill= "grey" 
                text= "My List" 
                icon_name= "checkmark-outline" />
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
                    {/* {movie_data.title} */}
                  </Text>
                  <Text style= {styles.textAlign}>
                      {/* {movie_data.description} */}
                  </Text>
                </View>
              </View>
            </RBSheet>
            </View>
        </Layout>
    )
}


export default MovieDescription