import React, { useMemo } from 'react';

import { Video } from 'expo-av';

import { useIsFocused } from '@react-navigation/native';

export default function CustomVideoPlayer(props) {
  // eslint-disable-next-line react/prop-types
  // prettier-ignore
  const {
    videoUri, shouldPlay, shouldDisplay, isPreloaded, resizeMode, ...otherProps
  } = props;

  const isFocused = useIsFocused();

  return useMemo(
    // prettier-ignore
    () => ((shouldDisplay || isPreloaded) && isFocused ? (
      <Video
          // eslint-disable-next-line react/jsx-props-no-spreading
        {...otherProps}
        source={{ uri: videoUri }}
        shouldCorrectPitch
        resizeMode={resizeMode}
        usePoster
        posterSource={require('assets/images/banner/placeholder-image.png')}
        posterStyle={{ resizeMode, height: '100%', width: '100%' }}
        style={{ flex: 1 }}
        progressUpdateIntervalMillis={1000}
        shouldPlay={shouldPlay && shouldDisplay && isFocused}
      />
    ) : null),
    [
      videoUri,
      shouldPlay,
      shouldDisplay,
      isPreloaded,
      isFocused,
      resizeMode,
      otherProps,
    ],
  );
}
