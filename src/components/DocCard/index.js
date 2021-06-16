import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import {
    Layout, Text, List,
  } from '@ui-kitten/components';
import { TouchableOpacity } from 'react-native-gesture-handler';

const DocCard = (props) => {
    return (
        <TouchableOpacity style= {styles.container}>
            <View style= {styles.imagecard}>
                <Image style= {styles.image} source= {props.image} />
            </View>
            <View style= {{width: '80%', marginLeft: 15}}>
                <Text category= "h5" style= {styles.text}>
                    {props.doc}
                </Text>

            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        // borderRadius: 5,
        width: '100%',
        minHeight: 120,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 10,
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOffset: {width: 3, height: 3},
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 10,
        borderWidth: 1,
        borderColor: '#E8E8E8',
        marginVertical: 10,
        marginRight: 5
    },
    image: {
        width: 100,
        height: 100,
        resizeMode: 'contain'
    },
    text: {
        // textAlign: 'center'
    },
    imagecard: {
        backgroundColor: '#EFF4F8',
        borderRadius: 5,
    }
});

export default DocCard;