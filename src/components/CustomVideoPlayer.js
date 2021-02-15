import React from 'react';

import { Video } from 'expo-av';

import { useIsFocused } from '@react-navigation/native';

import useVideoThumb from 'src/hooks/useVideoThumb';

export default function CustomVideoPlayer(props) {
  // prettier-ignore
  const {
    videoUri, shouldPlay, shouldDisplay, isPreloaded, resizeMode, ...otherProps
  } = props;

  const isFocused = useIsFocused();

  const thumbUri = useVideoThumb(videoUri);

  // const thumbUri = null;

  return (shouldDisplay || isPreloaded) && isFocused ? (
    <Video
      {...otherProps}
      source={{ uri: videoUri }}
      shouldCorrectPitch
      resizeMode={resizeMode}
      usePoster
      posterSource={
        thumbUri
          ? { uri: thumbUri }
          : require('assets/images/banner/placeholder-image.png')
      }
      posterStyle={{ resizeMode, height: '100%', width: '100%' }}
      style={{ flex: 1 }}
      shouldPlay={shouldPlay && shouldDisplay && isFocused}
    />
  ) : null;
}
