import React from 'react';
import { Layout, List, Text } from '@ui-kitten/components';
import { StyleSheet, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import TopNavigationArea from 'src/components/TopNavigationArea/index';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const MyList = (props) => {
    const data = [
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


    ]
    return (
        <Layout level="6" style={{ flex: 1 }}>
            <TopNavigationArea
            title={`My List`}
            navigation={props.navigation}
            screen="auth"
        />
        <ScrollView style= {styles.container}>
            <View style= {styles.flexContainer} >
                {data.map (
                    (item, index) => {
                        return (
                            <TouchableOpacity key= {index}>
                            <Image 
                            style= {styles.image}
                            source= {item.imageSource} />
                            </TouchableOpacity>
                        )
                    }
                )}

            </View>
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
export default MyList;