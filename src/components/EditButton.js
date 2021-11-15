import React from 'react';
import { Image, View } from 'react-native';
// import { Images } from '../../assets/images';
import TouchableOpacity  from "./TouchableOpacity"

const EditButton = (props) => {
    const { onPress } = props;
    return (
        <TouchableOpacity
            onPress={() => onPress && onPress()}
            containerStyle={{
                width: 25,
                height: 25,
                justifyContent: 'center',
                alignItems: "center"
            }}>
            <View

                style={{
                    width: 15,
                    height: 15,
                }}
            >
            <Image source={require('../assets/images/askALawyer/edit_icon.png')} />
                {/* <Images.edit /> */}
            </View>
        </TouchableOpacity>
    );
};

export default EditButton;
