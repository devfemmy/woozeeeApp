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
    videoUri, thumbUri, style, isMuted,
  } = props;

  const isFocused = useIsFocused();

  const opacity = React.useMemo(() => new Animated.Value(0.5), []);

  const thumbOpacity = React.useMemo(() => new Animated.Value(0.75), []);

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

  // prettier-ignore
  const VideoThumb = () => (thumbUri ? (
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
  ) : null);

  return useMemo(
    () => (
      <Layout level="1" style={styles.background}>
        <VideoThumb />
        <Animated.View style={[styles.backgroundViewWrapper, { opacity }]}>
          <Video
            isLooping
            isMuted={isMuted}
            onLoadStart={() => {
              Animated.timing(opacity, {
                toValue: 1,
                useNativeDriver: true,
                duration: 1000,
              }).start();
            }}
            resizeMode="cover"
            autoPlay
            preload="auto"
            shouldPlay={isFocused || isFocused === undefined}
            source={{ uri: cachedUri }}
            style={[style, { flex: 1 }]}
          />
        </Animated.View>
      </Layout>
    ),
    [isFocused, opacity, cachedUri, isMuted, style],
  );
}
