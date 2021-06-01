import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, Dimensions, Image } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import {Ionicons} from 'react-native-vector-icons';
import { Stopwatch, Timer } from 'react-native-stopwatch-timer';

export default function UploadEntries() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [cameraRef, setCameraRef] = useState(null)
  const [recording, setRecording] = useState(false)
  const [isTimerStart, setIsTimerStart] = useState(false);
  const [isStopwatchStart, setIsStopwatchStart] = useState(false);
  const [timerDuration, setTimerDuration] = useState(90000);
  const [resetTimer, setResetTimer] = useState(false);
  const [resetStopwatch, setResetStopwatch] = useState(false);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const takePicture = async () => {
    if (cameraRef) {
        const data = await cameraRef.takePictureAsync(null);
        setImage(data.uri);
        console.log(data.uri)
      }
  }
  const recordCamera = async () => {
      if (camera) {
        const data = await camera.recordAsync(null);
      }
  }

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
        {recording?<View style= {styles.stopWatch}>
        <Stopwatch
            laps
            secs
            start={isStopwatchStart}
            //To start
            reset={resetStopwatch}
            //To reset
            options={options}
            //options for the styling
            getTime={(time) => {
              console.log(time);
            }}
          />
        </View>: null}
        <View style= {styles.cameraContainer}>
            <Camera 
        ref={ref => setCameraRef(ref)}
        style={styles.camera} type={type} />
        </View> 
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
        <Ionicons name={ Platform.OS === 'ios' ? "ios-reverse-camera" : 'md-reverse-camera'} size={40} color="white" />
          </TouchableOpacity>
          <Button title="Take Picture" onPress={takePicture} />
          <TouchableOpacity 
     style={{alignSelf: 'center'}} 
     onPress={async() => {
              if(!recording){
                setRecording(true)
                setIsStopwatchStart(true)
              let video = await cameraRef.recordAsync();
              console.log('video', video);
            } else {
                setRecording(false)
                setIsStopwatchStart(false)
                cameraRef.stopRecording()
            }
          }}>
            <View style={{ 
               borderWidth: 2,
               borderRadius:25,
               borderColor: 'red',
               height: 50,
               width:50,
               display: 'flex',
               justifyContent: 'center',
               alignItems: 'center'}}
            >
              <View style={{
                 borderWidth: 2,
                 borderRadius:25,
                 borderColor: recording ? "blue":'red',
                 height: 40,
                 width:40,
                 backgroundColor: recording ? "blue":'red'
                 
                 }} >
              </View>
            </View>
          </TouchableOpacity>
          <Button title="Gallery" onPress={pickImage} />
          {image && <Image source={{ uri: image }} style={{ flex: 1 }} />}
        </View>
    </View>
  );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
     cameraContainer: {
            flex: 1,
            flexDirection: 'row',
            height: Dimensions.get('window').height,
            backgroundColor: 'red'
    ,
    },
    camera: {
      flex: 1,
    },
    buttonContainer: {
    //   flex: 1,
      backgroundColor: 'transparent',
      flexDirection: 'row',
      justifyContent: 'space-between',
      margin: 20,
      position: 'absolute',
      bottom: 12,
      width: '100%'
    },
    stopWatch: {
        position: 'absolute',
        top: 10,
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        zIndex: 99999
    },

    text: {
      fontSize: 18,
      color: 'white',
    },
  });
  const options = {
    container: {
      backgroundColor: 'white',
      padding: 5,
      borderRadius: 5,
      width: 200,
      alignItems: 'center',
    },
    text: {
      fontSize: 18,
      color: 'red',
      marginLeft: 7,
    },
  };