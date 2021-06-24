import React, { useState, useEffect } from 'react';
import { Layout, List, Text } from '@ui-kitten/components';
import { Overlay } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';

const MyCategories = (props) => {
    const [visible, setVisible] = useState(true);
    const navigation = useNavigation()

    useEffect(() => {
        const unsubscribe = props.route.key;
        console.log(unsubscribe)
        if (unsubscribe === 'fourth') {
            setVisible(true)
        }else if (unsubscribe === 'first') {
            setVisible(false)
        }
   
      });
    //   useEffect(() => {
    //     const unsubscribe = navigation.addListener('focus', () => {
    //           setVisible(true)
    //       });
  
        
    //     return unsubscribe;
    //   }, [navigation]);
  
      const toggleOverlay = () => {
        setVisible(false);
        // setTimeout(() =>, 3000)
        props.jumpTo('first')
        // navigation.navigate('Movies')
      };

      const styles = StyleSheet.create({
        overlay: {
            backgroundColor: 'rgba(0,0,0,0.8)',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1
          },
          backdropStyle: {
            backgroundColor: 'rgba(0,0,0,0.8)'
          },
          scroll: {
            paddingVertical: 20,
            marginVertical: 5
          },
          textStyle: {
            color: 'white',
            fontWeight: 'bold',
            fontSize: 20,
            textAlign: 'center',
            marginVertical: 10
          }
      })
      return (
        <Layout level="6" style={{ flex: 1 }}>
        {/* <Overlay 
        fullScreen = {false}
        overlayStyle= {styles.overlay}
        backdropStyle= {styles.backdropStyle} 
        isVisible={visible} onBackdropPress={() => {}}>
          <ScrollView showsVerticalScrollIndicator= {false} style= {styles.scroll}>
              <Text onPress= {() => navigation.navigate('EditProfile')} category= "c2" style= {styles.textStyle}>
                All
              </Text>
              <Text category= "c2" style= {styles.textStyle}>
                My View
              </Text>
              <Text category= "c2" style= {styles.textStyle}>
                Comedy
              </Text>
              <Text category= "c2" style= {styles.textStyle}>
                Anime
              </Text>
              <Text category= "c2" style= {styles.textStyle}>
                All
              </Text>
              <Text category= "c2" style= {styles.textStyle}>
                All
              </Text>
              <Text category= "c2" style= {styles.textStyle}>
                Action
              </Text>
              <Text category= "c2" style= {styles.textStyle}>
                Anime
              </Text>
              <Text category= "c2" style= {styles.textStyle}>
                Comedy
              </Text>
              <Text category= "c2" style= {styles.textStyle}>
                All
              </Text>
              <Text category= "c2" style= {styles.textStyle}>
                All
              </Text>
              <Text category= "c2" style= {styles.textStyle}>
                My View
              </Text>
              <Text category= "c2" style= {styles.textStyle}>
                Comedy
              </Text>
              <Text category= "c2" style= {styles.textStyle}>
                Anime
              </Text>
              <Text category= "c2" style= {styles.textStyle}>
                All
              </Text>
              <Text category= "c2" style= {styles.textStyle}>
                All
              </Text>
              <Text category= "c2" style= {styles.textStyle}>
                My View
              </Text>
              <Text category= "c2" style= {styles.textStyle}>
                Comedy
              </Text>
              <Text category= "c2" style= {styles.textStyle}>
                Anime
              </Text>
              <Text category= "c2" style= {styles.textStyle}>
                All
              </Text>
              <Text category= "c2" style= {styles.textStyle}>
                All
              </Text>
          </ScrollView>
          <View>
              <TouchableOpacity onPress= {toggleOverlay}>
                  <Image 
                  style= {{width: 40, height: 40}}
                  source= {require('../../../../../assets/images/movies/Vector.png')} 
                  />
              </TouchableOpacity>
          </View>
        </Overlay> */}
        <View style= {styles.overlay}>  
        <ScrollView showsVerticalScrollIndicator= {false} style= {styles.scroll}>
              <Text onPress= {() => navigation.navigate('EditProfile')} category= "c2" style= {styles.textStyle}>
                All
              </Text>
              <Text category= "c2" style= {styles.textStyle}>
                My View
              </Text>
              <Text category= "c2" style= {styles.textStyle}>
                Comedy
              </Text>
              <Text category= "c2" style= {styles.textStyle}>
                Anime
              </Text>
              <Text category= "c2" style= {styles.textStyle}>
                All
              </Text>
              <Text category= "c2" style= {styles.textStyle}>
                All
              </Text>
              <Text category= "c2" style= {styles.textStyle}>
                Action
              </Text>
              <Text category= "c2" style= {styles.textStyle}>
                Anime
              </Text>
              <Text category= "c2" style= {styles.textStyle}>
                Comedy
              </Text>
              <Text category= "c2" style= {styles.textStyle}>
                All
              </Text>
              <Text category= "c2" style= {styles.textStyle}>
                All
              </Text>
              <Text category= "c2" style= {styles.textStyle}>
                My View
              </Text>
              <Text category= "c2" style= {styles.textStyle}>
                Comedy
              </Text>
              <Text category= "c2" style= {styles.textStyle}>
                Anime
              </Text>
              <Text category= "c2" style= {styles.textStyle}>
                All
              </Text>
              <Text category= "c2" style= {styles.textStyle}>
                All
              </Text>
              <Text category= "c2" style= {styles.textStyle}>
                My View
              </Text>
              <Text category= "c2" style= {styles.textStyle}>
                Comedy
              </Text>
              <Text category= "c2" style= {styles.textStyle}>
                Anime
              </Text>
              <Text category= "c2" style= {styles.textStyle}>
                All
              </Text>
              <Text category= "c2" style= {styles.textStyle}>
                All
              </Text>
          </ScrollView>
          <View>
              <TouchableOpacity onPress= {toggleOverlay}>
                  <Image 
                  style= {{width: 40, height: 40}}
                  source= {require('../../../../../assets/images/movies/Vector.png')} 
                  />
              </TouchableOpacity>
          </View>
        </View>
        </Layout>
      )
}

export default MyCategories