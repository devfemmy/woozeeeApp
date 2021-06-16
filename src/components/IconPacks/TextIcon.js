import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Icon, Layout, Text } from '@ui-kitten/components';
import { TouchableOpacity } from 'react-native-gesture-handler';


export const TextIcon = (props) => {

    const styles = StyleSheet.create({
        button: {
          height: props.show ? 30 : 40,
          justifyContent: props.start ? 'flex-start' : 'center',
          alignItems: 'center',
          flexDirection: 'row',
          backgroundColor: props.bg,
          marginVertical: 8,
          borderColor: props.borderColor,
          borderWidth: props.borderWidth,
          width: props.width
          
        },
        icon: {
          width: 22,
          height: 22,
          marginRight: 5
        },
        color: {
            color: props.color,
            fontWeight: props.bold
        }
      
      });
  return (
    <>
       <TouchableOpacity onPress= {props.onPress} style= {styles.button}>
           <View style= {{justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center'}}>
              {props.show ? 
                <Text category= "p1" style= {styles.color}>
                              {props.text}
                </Text> : null
            }
                <Icon
                            style={styles.icon}
                            fill={props.fill}
                            name={props.icon_name}
                        />
                {props.show ? null : 
                    <Text category= "p1" style= {styles.color}>
                         {props.text}
                    </Text>       
                }
           </View>
       </TouchableOpacity>
    </>
  );
};


