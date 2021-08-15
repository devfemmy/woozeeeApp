import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Video } from 'expo-av';

const FeaturedMovie = () => {
    const handleVideoRef = React.useRef(null);
    const videoUri = 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'
    
    const VideoPreview = () => (
          <View
            style={{
              //   flex: 1,
              paddingTop: 10,
              paddingHorizontal: 15,
              marginBottom: 20,
            }}
          >
            <Video
              ref={handleVideoRef}
              isLooping
              isMuted
              source = {{uri: videoUri}}
              shouldPlay
              resizeMode="cover"
              style={{ height: 250, width: '100%' }}
            />
          </View>
        );
    const styles = StyleSheet.create({

    });
    return (
        <View>
            <VideoPreview />
        </View>
    )
    
}

export default FeaturedMovie;
