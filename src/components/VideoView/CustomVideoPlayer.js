import React, { useMemo } from 'react';

import { Video } from 'expo-av';

import { useIsFocused } from '@react-navigation/native';

import PlaceholderImage from '~src/constants/PlaceholderImage';

export default function CustomVideoPlayer(props) {
  // eslint-disable-next-line react/prop-types
  // prettier-ignore
  const {
    videoUri, style, shouldPlay, shouldDisplay, isPreloaded, ...otherProps
  } = props;

  const isFocused = useIsFocused();

  const POSTER_IMAGE = PlaceholderImage();

  return useMemo(
    // prettier-ignore
    () => ((shouldDisplay || isPreloaded) && isFocused ? (
      <Video
          // eslint-disable-next-line react/jsx-props-no-spreading
        {...otherProps}
        source={{ uri: videoUri }}
        shouldCorrectPitch
        resizeMode="contain"
        usePoster
        posterSource={POSTER_IMAGE}
        posterStyle={{ resizeMode: 'contain', height: '100%', width: '100%' }}
        style={[style, { flex: 1 }]}
        progressUpdateIntervalMillis={1000}
        shouldPlay={shouldPlay && shouldDisplay && isFocused}
      />
    ) : null),
    [
      videoUri,
      style,
      shouldPlay,
      shouldDisplay,
      isPreloaded,
      isFocused,
      otherProps,
      POSTER_IMAGE,
    ],
  );
}
