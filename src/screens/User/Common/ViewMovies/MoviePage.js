import React, { useRef, useState } from 'react';
import Video from 'react-native-video';
import { StyleSheet } from 'react-native';
import { Layout, List, Text } from '@ui-kitten/components';
import TopNavigationArea from 'src/components/TopNavigationArea/index';

const MoviePage = ({navigation, route}) => {
const {item} = route.params;
const [videoPlayer, setVideoPlayer] = useState(null);

console.log("player", videoPlayer);
const onReadyForDisplay = () => {
  // setTimeout(() => videoPlayer.presentFullscreenPlayer(), 1000)
  
}

    return(
<Layout level="6" style={{ flex: 1 }}>
    <TopNavigationArea
        title={item.title}
        // navigation={navigation}
        screen="auth"
      />
        <Video
        // poster= {item.posterURL[0]} 
        controls= {true}
        resizeMode= "contain"
        fullscreen= {true}
        onReadyForDisplay = {onReadyForDisplay}
        fullscreenOrientation= "landscape"
        source={{uri: item.mediaURL}}   // Can be a URL or a local file.
       ref={(ref) => {
          setVideoPlayer(ref)
       }}                                      // Store reference
    //    onBuffer={this.onBuffer}                // Callback when remote video is buffering
    //    onError={this.videoError}               // Callback when video cannot be loaded
       style={styles.backgroundVideo} />
</Layout>
    )
}
var styles = StyleSheet.create({
    backgroundVideo: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      flex: 1,
      backgroundColor: 'black',
      // alignItems: 'center',
      // justifyContent: 'center'
    },
  });

export default MoviePage;
