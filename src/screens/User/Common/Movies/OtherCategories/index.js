import React from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import { Layout, List, Text } from '@ui-kitten/components';
import { TextIcon } from 'src/components/IconPacks/TextIcon';
import MovieScroll from 'src/components/MovieScroll';
import { ScrollView } from 'react-native-gesture-handler';
import TopNavigationArea from 'src/components/TopNavigationArea/index';

// Some test

const OtherCategories = (props) => {
    const {name, category_id} = props.route.params;
    const styles = StyleSheet.create({
        imageCon: {
            paddingVertical: 15
        },
        description: {
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        },
        buttonContainer: {
            width: Dimensions.get('window').width,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: '20%'
        },
        lowerContainer: {
            paddingHorizontal: 10
        }
    })
    return (
        <Layout level="6" style={{ flex: 1 }}>
            <TopNavigationArea
                title={name}
                navigation={props.navigation}
                screen="auth"
            />
            <ScrollView>
                <View style= {styles.imageCon}>
                    <Image 
                    style= {{width: '100%'}}
                    source= {require('../../../../../assets/images/movies/movie5.png')} />
                </View>
                <View style= {styles.description}>
                    <Text category= "h4" style= {{color: '#0959AB'}}>
                        #1 in woozeee today
                    </Text>
                    <View>
                        <Text>
                        Exciting     Dramas     Comedy     Nollywood
                        </Text>
                    </View>
                    {/* <View style= {styles.buttonContainer}>
                        <TextIcon 
                        width= "88%"
                        bg= "#FF5757"
                        color= "white" fill= "white" 
                        text= "Play" 
                        icon_name= "play-circle-outline" />   
                        <TextIcon
                        width= "88%"
                        borderColor= "#FF5757" 
                        borderWidth= {1}
                        bg= "transparent"
                        color= "#FF5757" fill= "#FF5757" 
                        text= "Info" 
                        icon_name= "alert-circle-outline" />  
                    </View> */}
                    
                </View>
                <View style= {{paddingHorizontal: 20, paddingVertical: 5}}>
                <TextIcon 
                    // width= "88%"
                    bg= "#FF5757"
                    color= "white" fill= "white" 
                    text= "Purchase" 
                    icon_name= "shopping-cart-outline" /> 
                <View style= {{marginVertical: 5, alignItems: 'center'}}>
                <Text>
                Cast: Sir Dee, Seyi Awolowo, Avala
                </Text>
                <Text>
                Director: Stephanie Dadet
                </Text>
              </View> 
                </View>
                <View style= {styles.lowerContainer}>
                <MovieScroll
                show
                        />
                </View>
            </ScrollView>

        </Layout>
    )
}

export default OtherCategories