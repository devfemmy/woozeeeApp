import React from 'react';
import { Image, View } from 'react-native';
import { Text } from '@ui-kitten/components';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

const MovieScroll = (props) => {
    return (
        <View style= {{marginVertical: 10}}>
            {props.show ? 
            <Text style={{color: '#0959AB', marginBottom: 5}} category= "h5">
               {props.title}
             </Text>  : null     
        }

            <ScrollView horizontal>
                <TouchableOpacity>
                    <Image style= {{width: 110, height: 140, resizeMode: 'contain'}} source= {props.img} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image style= {{width: 110, height: 140, resizeMode: 'contain'}} source= {props.img} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image style= {{width: 110, height: 140, resizeMode: 'contain'}} source= {props.img} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image style= {{width: 110, height: 140, resizeMode: 'contain'}} source= {props.img} />
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

export default MovieScroll