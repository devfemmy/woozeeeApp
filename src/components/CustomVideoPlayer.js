import React from 'react';

import Video from 'react-native-video';

import { useIsFocused } from '@react-navigation/native';

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

  return (shouldDisplay || isPreloaded) && isFocused ? (
    <Video
      {...otherProps}
      source={{ uri: videoUri }}
      resizeMode={resizeMode}
      poster={'https://i.postimg.cc/x8Stv6cG/placeholder-image.png'}
      posterResizeMode={resizeMode}
      style={{ flex: 1 }}
      paused={!(shouldPlay && shouldDisplay && isFocused)}
      bufferConfig={{
        minBufferMs: 15000,
        maxBufferMs: 30000,
        bufferForPlaybackMs: 2500,
        bufferForPlaybackAfterRebufferMs: 5000,
      }}
    />
  ) : null;
}
