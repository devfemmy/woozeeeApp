// prettier-ignore
import React, {
  useMemo, useState, useCallback,
} from 'react';

// prettier-ignore
import {
  StyleSheet, View, useWindowDimensions,
} from 'react-native';

import { Video } from 'expo-av';

import { useIsFocused } from '@react-navigation/native';

import { FullPlaceholder } from '~src/components/CustomPlaceholder';

const styles = StyleSheet.create({
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#101426',
  },
  backgroundViewWrapper: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default function CustomVideoPlayer(props) {
  // eslint-disable-next-line react/prop-types
  // prettier-ignore
  const {
    videoUri, style, shouldPlay, shouldDisplay, isPreloaded,
  } = props;

  const isFocused = useIsFocused();

  const { width, height } = useWindowDimensions();

  const [isVideoLoaded, setVideoLoaded] = useState(false);

  const [playProgress, setPlayProgress] = useState('0%');

  const handlePlaybackStatusUpdate = useCallback(
    (status) => {
      const { positionMillis, durationMillis } = status;

      const currentPercent = (positionMillis / durationMillis) * 100;

      setPlayProgress(`${currentPercent}%`);
    },
    [setPlayProgress],
  );

  // prettier-ignore
  const VideoThumb = () => (!shouldDisplay || !isVideoLoaded ? (
    <View style={{ paddingTop: 100 }}>
      <FullPlaceholder width={width} height={height - 150} />
    </View>

  ) : null);

  return useMemo(
    () => (
      <View style={styles.background}>
        <VideoThumb />
        <>
          <View style={styles.backgroundViewWrapper}>
            <Video
              source={{ uri: shouldDisplay || isPreloaded ? videoUri : null }}
              isLooping
              shouldCorrectPitch
              onReadyForDisplay={() => setVideoLoaded(true)}
              resizeMode="contain"
              style={[style, { flex: 1 }]}
              progressUpdateIntervalMillis={1000}
              onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
              shouldPlay={shouldPlay && shouldDisplay && isFocused}
            />
          </View>
          <View
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
          </View>
        </>
      </View>
    ),
    [
      videoUri,
      style,
      shouldPlay,
      shouldDisplay,
      handlePlaybackStatusUpdate,
      playProgress,
      isPreloaded,
      isFocused,
    ],
  );
}
