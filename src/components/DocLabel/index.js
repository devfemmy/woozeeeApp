import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import {
    Layout, Text, List,
  } from '@ui-kitten/components';
import { TouchableOpacity } from 'react-native-gesture-handler';

const DocLabel = (props) => {
    return (
        <TouchableOpacity style= {styles.container}>
            <Image style= {styles.image} source= {props.image} />
            <Text style= {styles.text}>
                {props.text}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        // borderRadius: 5,
        width: 120,
        minHeight: 120,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 2,
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
        width: 50,
        height: 50,
        resizeMode: 'contain'
    },
    text: {
        textAlign: 'center'
    }
});

export default DocLabel;