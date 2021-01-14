import React, { useMemo, useState } from 'react';

import { Animated, StyleSheet, Image } from 'react-native';

import { useIsFocused } from '@react-navigation/native';

import { Video } from 'expo-av';

import { Asset } from 'expo-asset';

import { Layout } from '@ui-kitten/components';

const styles = StyleSheet.create({
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  backgroundViewWrapper: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default function BackgroundVideo(props) {
  // eslint-disable-next-line react/prop-types
  // prettier-ignore
  const {
    videoUri, thumbUri, style, isMuted, resizeMode,
  } = props;

  const isFocused = useIsFocused();

  const opacity = React.useMemo(() => new Animated.Value(0), []);

  const thumbOpacity = React.useMemo(() => new Animated.Value(0.25), []);

  const [cachedUri, setCachedUri] = useState(null);

  useMemo(() => {
    const getCachedUri = async () => {
      try {
        const [{ localUri }] = await Asset.loadAsync(videoUri);

        await setCachedUri(localUri);
      } catch (e) {
        const err = e;
      }
    };

    getCachedUri().then(() => {});
  }, [videoUri]);

  return useMemo(
    () => (
      <Layout level="1" style={styles.background}>
        {thumbUri ? (
          <Animated.View
            style={[styles.backgroundViewWrapper, { opacity: thumbOpacity }]}
          >
            <Image
              source={thumbUri}
              style={[
                style,
                {
                  resizeMode: 'cover',
                  width: '100%',
                  height: '100%',
                },
              ]}
              onLoadStart={() => {
                Animated.timing(thumbOpacity, {
                  toValue: 1,
                  useNativeDriver: true,
                  duration: 1000,
                }).start();
              }}
            />
          </Animated.View>
        ) : null}
        <Animated.View style={[styles.backgroundViewWrapper, { opacity }]}>
          <Video
            isLooping
            isMuted={isMuted}
            positionMillis={500}
            onLoadStart={() => {
              Animated.timing(opacity, {
                toValue: 1,
                useNativeDriver: true,
                duration: 1000,
              }).start();
            }}
            resizeMode={resizeMode || 'cover'}
            autoPlay
            shouldPlay={isFocused || isFocused === undefined}
            source={{ uri: cachedUri }}
            style={[style, { flex: 1 }]}
          />
        </Animated.View>
      </Layout>
    ),
    [
      isFocused,
      opacity,
      cachedUri,
      thumbUri,
      thumbOpacity,
      isMuted,
      style,
      resizeMode,
    ],
  );
}
