import React, { useEffect, useState } from 'react';
import Video from 'react-native-video';
import { Dimensions, StyleSheet, Platform, View } from 'react-native';
import { Layout, List, Text } from '@ui-kitten/components';
import TopNavigationArea from 'src/components/TopNavigationArea/index';
import Orientation from "react-native-orientation";
// import {  } from 'react-native';


const MoviePage = ({navigation, route}) => {
  const {item} = route.params;
  const [videoPlayer, setVideoPlayer] = useState(null);

  const onReadyForDisplay = () => {
  // setTimeout(() => videoPlayer.presentFullscreenPlayer(), 1000)
  
  }

  useEffect(() => {
    if (Platform.OS === 'android') {
      const subscribe = navigation.addListener('focus', () => {
        Orientation.lockToLandscape()
        });
  
      const unsubscribe = navigation.addListener('blur', () => {
        Orientation.lockToPortrait();
  
       //    cancelAppointment()
       //    clearInterval()
       });
      return subscribe, unsubscribe;
    }
  }, [navigation]);



  return(
<View onLayout={(event) => {
   const { width, height } = Dimensions.get('window')
}}  style={styles.fullScreen}>
    {/* <TopNavigationArea
        title={item.title}
        // navigation={navigation}
        screen="auth"
      /> */}
          <View style= {styles.videoView}>
          <Video
                  // poster= {item.posterURL[0]} 
                  controls= {true}
                  resizeMode= {Platform.OS === 'android' ? 'cover' : 'contain'}
                  // fullscreen= {true}
                  onReadyForDisplay = {onReadyForDisplay}
                  // fullscreenOrientation= "landscape"
                  source={{uri: item.mediaURL}}
                  // source= {{uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'}}
                ref={(ref) => {
                  setVideoPlayer(ref)
                }}                                      // Store reference
              //    onBuffer={this.onBuffer}                // Callback when remote video is buffering
              //    onError={this.videoError}               // Callback when video cannot be loaded
                style={styles.backgroundVideo} />
          </View>

</View>
  )
}
var styles = StyleSheet.create({
  backgroundVideo: {
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // bottom: 0,
    // right: 0,
    // flex: 1,
    backgroundColor: 'black',
    height: Dimensions.get('screen').width,
    width: Dimensions.get('screen').height
    // alignItems: 'center',
    // justifyContent: 'center'
  },
  videoView: {
    // flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    // backgroundColor: 'yellow'
},
  fullScreen: {
    flex: 1,
    backgroundColor: 'black',
    height: Dimensions.get('screen').width,
    width: Dimensions.get('screen').height
    
},
});

export default MoviePage;