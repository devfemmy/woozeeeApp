import React, { useMemo, useState } from 'react';

import { View, useWindowDimensions } from 'react-native';

import { Video } from 'expo-av';

import { useIsFocused } from '@react-navigation/native';

import Placeholders from '../Placeholders';

export default function CustomVideoPlayer(props) {
  // eslint-disable-next-line react/prop-types
  // prettier-ignore
  const {
    videoUri, shouldPlay, shouldDisplay, isPreloaded, ...otherProps
  } = props;

  const isFocused = useIsFocused();

  const { width, height } = useWindowDimensions();

  const [isVideoLoaded, setVideoLoaded] = useState(false);

  // const [playProgress, setPlayProgress] = useState('0%');

  // const handlePlaybackStatusUpdate = useCallback(
  //   (status) => {
  //     const { positionMillis, durationMillis } = status;

  //     const currentPercent = (positionMillis / durationMillis) * 100;

  //     setPlayProgress(`${currentPercent}%`);
  //   },
  //   [setPlayProgress],
  // );

  // prettier-ignore
  const VideoThumb = () => (!shouldDisplay || !isVideoLoaded ? (
    <View style={{
      flex: 1, position: 'absolute', top: 0, left: 0,
    }}
    >
      <Placeholders maxWidth={width} maxHeight={height * 0.65} count={1} numColumns={1} />
    </View>

  ) : null);

  return useMemo(
    // prettier-ignore
    () => ((shouldDisplay || isPreloaded) && isFocused ? (
      <>
        <VideoThumb />
        <Video
            // eslint-disable-next-line react/jsx-props-no-spreading
          {...otherProps}
          source={{ uri: videoUri }}
          shouldCorrectPitch
          onLoad={() => setVideoLoaded(true)}
          resizeMode="contain"
          style={{ flex: 1 }}
          progressUpdateIntervalMillis={1000}
            // onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
          shouldPlay={shouldPlay && shouldDisplay && isFocused}
        />
        {/* <View
            style={{
              paddingHorizontal: 10,
              position: 'absolute',
              zIndex: 39,
              bottom: 30,
              width: '100%',
            }}
          >
            <View
              style={{
                height: 2,
                width: '100%',
                backgroundColor: 'white',
              }}
            >
              <View
                style={{
                  height: 2,
                  width: playProgress,
                  backgroundColor: '#ff5757',
                }}
              />
            </View>
          </View> */}
      </>
    ) : null),
    [
      videoUri,
      shouldPlay,
      shouldDisplay,
      // handlePlaybackStatusUpdate,
      // playProgress,
      isPreloaded,
      isFocused,
      otherProps,
    ],
  );
}
