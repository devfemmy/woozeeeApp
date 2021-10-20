import React from 'react';
import { Image, StyleSheet, View, Dimensions } from 'react-native';
import {
    Layout, Text, List,
  } from '@ui-kitten/components';
import { TouchableOpacity } from 'react-native-gesture-handler';


const TimeSlotCard = (props) => {
    return (
        <Layout
            level="1"
            style={{
            borderRadius: 5,
            paddingHorizontal: 10,
            paddingVertical: 10,
            marginBottom: 10,
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 3,
            },
            shadowOpacity: 0.05,
            shadowRadius: 3,
            elevation: 2,
            // borderRadius: 5,
            width: '100%',
            minHeight: 80,
            paddingHorizontal: 20,
            marginVertical: 10,
            }}
        >
        <TouchableOpacity onPress={props.pressed} style= {styles.container}>
        <View>
            <Text style= {styles.opacity}>Time:</Text>
            <Text>{props.time}</Text>
            <Text style= {styles.opacity}>Price:</Text>
            <Text>{props.price}</Text>
        </View>
        <View>
            <Text style= {{...styles.opacity, ...styles.textRight}}>Session:</Text>
            <Text style= {styles.textRight}>{props.session}</Text>
            <Text style= {{...styles.opacity, ...styles.textRight}}>Type:</Text>
            <Text style= {styles.textRight}>{props.type}</Text>
        </View>
        </TouchableOpacity>

        </Layout>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    opacity: {
        opacity: 0.4,
        marginTop: 5
    },
    textRight: {
        textAlign: 'right'
    },
    text: {
        // textAlign: 'center'
    },
    imagecard: {
        // backgroundColor: '#fff',
        borderRadius: 5,
        width: '25%'
       
    }
});

export default TimeSlotCard;