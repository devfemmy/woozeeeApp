import React, { useMemo, useState, useCallback } from 'react';

// prettier-ignore
import {
  Animated, StyleSheet, View, useWindowDimensions,
} from 'react-native';

import { useIsFocused } from '@react-navigation/native';

import { Video } from 'expo-av';

import { Layout } from '@ui-kitten/components';

import { FullPlaceholder } from '~src/components/CustomPlaceholder';

const styles = StyleSheet.create({
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  backgroundViewWrapper: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default function CustomVideoPlayer(props) {
  const { width, height } = useWindowDimensions();

  // eslint-disable-next-line react/prop-types
  // prettier-ignore
  const {
    videoUri, thumbUri, style, resizeMode, shouldPlay, setPlayProgress,
  } = props;

  const isFocused = useIsFocused();

  const opacity = React.useMemo(() => new Animated.Value(0.5), []);

  const [isVideoLoaded, setVideoLoaded] = useState(false);

  const handlePlaybackStatusUpdate = useCallback(
    (status) => {
      const { positionMillis, durationMillis } = status;

      const currentPercent = (positionMillis / durationMillis) * 100;

      setPlayProgress({ width: `${currentPercent}%` });
    },
    [setPlayProgress],
  );

  // prettier-ignore
  const VideoThumb = () => (thumbUri && !isVideoLoaded ? (
    <View style={{ paddingTop: 100 }}>
      <FullPlaceholder width={width} height={height - 125} />
    </View>

  ) : null);

  return useMemo(
    () => (
      <Layout level="1" style={styles.background}>
        <VideoThumb />
        <Animated.View style={[styles.backgroundViewWrapper, { opacity }]}>
          <Video
            isLooping
            onLoadStart={() => {
              setVideoLoaded(true);
              Animated.timing(opacity, {
                toValue: 1,
                useNativeDriver: true,
                duration: 1000,
              }).start();
            }}
            resizeMode={resizeMode || 'cover'}
            autoPlay
            progressUpdateIntervalMillis={1000}
            onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
            shouldPlay={(shouldPlay && isFocused) || isFocused === undefined}
            source={{ uri: videoUri }}
            style={[style, { flex: 1 }]}
          />
        </Animated.View>
      </Layout>
    ),
    [
      videoUri,
      isFocused,
      opacity,
      style,
      resizeMode,
      shouldPlay,
      handlePlaybackStatusUpdate,
    ],
  );
}
