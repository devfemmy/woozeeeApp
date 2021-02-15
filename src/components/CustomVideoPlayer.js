import React from 'react';

import Video from 'react-native-video';

import { useIsFocused } from '@react-navigation/native';

import useVideoThumb from 'src/hooks/useVideoThumb';

export default function CustomVideoPlayer(props) {
  const {
    videoUri,
    shouldPlay,
    shouldDisplay,
    isPreloaded,
    resizeMode,
    ...otherProps
  } = props;

  const isFocused = useIsFocused();

  const thumbUri = useVideoThumb(videoUri);

  // const thumbUri = null;

  const bufferConfig = {
    minBufferMs: shouldPlay ? 15000 : 0,
    maxBufferMs: shouldPlay ? 50000 : 0,
    bufferForPlaybackMs: shouldPlay ? 2500 : 0,
    bufferForPlaybackAfterRebufferMs: shouldPlay ? 5000 : 0,
  };

  return (shouldDisplay || isPreloaded) && isFocused ? (
    <Video
      {...otherProps}
      source={{ uri: videoUri }}
      resizeMode={resizeMode}
      poster={thumbUri ?? 'https://i.postimg.cc/x8Stv6cG/placeholder-image.png'}
      posterResizeMode={resizeMode}
      style={{ flex: 1 }}
      paused={!(shouldPlay && shouldDisplay && isFocused)}
      bufferConfig={bufferConfig}
    />
  ) : null;
}
