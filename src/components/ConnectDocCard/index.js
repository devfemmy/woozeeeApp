import React from 'react';
import { StyleSheet, TouchableOpacity, Image, View } from 'react-native';
import {
    Layout, Text, List,
  } from '@ui-kitten/components';
import RateLabel from '../RatingLabel/index';

const ConnectDocCard = (props) => {

    const styles = StyleSheet.create({

    });
    return(
        <TouchableOpacity onPress= {props.onPress} style= {styles.container}>
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
            minHeight: props.mheight,
            paddingHorizontal: 2,
            marginVertical: 10
            }}
        >
         <View style= {{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <Image source= {props.source} />
            <View>
                <View style= {{ marginLeft: 15}}>
                        <Text category= "h6" style= {styles.text}>
                            {props.doc}
                        </Text>
                        <RateLabel rate= "4.6" source= {require('../../assets/images/askADoc/rate.png')} />    
                </View>
            </View>
         </View>
    </Layout>
    </TouchableOpacity>
    )

}

export default ConnectDocCard

