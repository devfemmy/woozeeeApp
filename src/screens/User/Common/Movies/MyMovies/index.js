import React from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import { Layout, List, Text } from '@ui-kitten/components';
import { TextIcon } from 'src/components/IconPacks/TextIcon';
import MovieScroll from 'src/components/MovieScroll';
import { ScrollView } from 'react-native-gesture-handler';

const MyMovies = () => {
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
            <ScrollView>
                <View style= {styles.imageCon}>
                    <Image 
                    style= {{width: '100%'}}
                    source= {require('../../../../../assets/images/movies/movie4.png')} />
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
                    <View style= {styles.buttonContainer}>
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
                    </View>
                </View>
                <View style= {styles.lowerContainer}>
                    <MovieScroll
                        show
                        title = "Popular on woozeee"
                        img= {require('../../../../../assets/images/movies/movie2.png')}
                        />
                        <MovieScroll
                        show
                        title = "Continue Watching"
                        img= {require('../../../../../assets/images/movies/movie3.png')}
                        />
                        <MovieScroll
                        show
                        title = "Top 10 in woozeee today"
                        img= {require('../../../../../assets/images/movies/movie2.png')}
                        />
                        <MovieScroll
                        show
                        title = "Trending Now"
                        img= {require('../../../../../assets/images/movies/movie3.png')}
                        />
                        <MovieScroll
                        show
                        title = "My list"
                        img= {require('../../../../../assets/images/movies/movie2.png')}
                        />
                        <MovieScroll
                        show
                        title = "Coming soon"
                        img= {require('../../../../../assets/images/movies/movie3.png')}
                        />
                        <MovieScroll
                        show
                        title = "Because you watched My name is Tayo"
                        img= {require('../../../../../assets/images/movies/movie2.png')}
                        />
                </View>
            </ScrollView>

        </Layout>
    )
}

export default MyMovies