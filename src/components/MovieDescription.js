import React from 'react';
import { StyleSheet, View } from 'react-native';
import {widthPercentageToDP as wp, 
    heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Layout, List, Text } from '@ui-kitten/components';
import { TextIcon } from './IconPacks/TextIcon';
import MovieComponent from './MovieComponent';


const MovieDescription = (props) => {

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
            width: wp('75%'),
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
          },
    });
    return (
        <Layout style= {styles.container}>
            <Text category='h1' style= {styles.textStyle}>
                    My Name is Tayo
                {/* {movie_data.title} */}
            </Text>  
            <MovieComponent
                label= "New"
                year= "2020"
                rating= "16+"
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
                <Text style= {{marginBottom: 5}} numberOfLines= {2}>
                    {props.description}
                </Text>
                <Text numberOfLines= {1}>
                Cast: Sir Dee, Seyi Awolowo, Avala 
                </Text>
                <Text numberOfLines= {1}>
                Director: Stephanie Dadet
                </Text>
              </View>
              <View style= {styles.actions}>
                <TextIcon 
                bg= "transparent"
                color= "#494949" fill= "#494949" 
                text= "My List" 
                icon_name= "checkmark-outline" />
                <TextIcon 
                bg= "transparent"
                color= "#494949" fill= "#494949" 
                text= "Rate" 
                icon_name= "star-outline" />
                <TextIcon 
                bg= "transparent"
                color= "#494949" fill= "#494949" 
                text= "Share" 
                icon_name= "share-outline" />
              </View>
            </View>
            <View>
                {/* <MovieScroll
                img= {require('../../../../assets/images/movies/movie3.png')}
                /> */}
            </View>
        </Layout>
    )
}


export default MovieDescription