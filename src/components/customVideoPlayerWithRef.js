import React, { useMemo, useCallback } from 'react';

import { Animated, StyleSheet, Image } from 'react-native';

import { useIsFocused } from '@react-navigation/native';

import { Video } from 'expo-av';

// import { Asset } from 'expo-asset';

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

  const opacity = React.useMemo(() => new Animated.Value(0.75), []);

  const thumbOpacity = React.useMemo(() => new Animated.Value(0.75), []);

  // const [cachedUri, setCachedUri] = useState(null);
  //
  // useMemo(() => {
  //   (async () => {
  //     try {
  //       const [{ localUri }] = await Asset.loadAsync(videoUri);
  //
  //       await setCachedUri(localUri);
  //     } catch (e) {
  //       const err = e;
  //     }
  //   })();
  // }, [videoUri]);

  const INITIAL_STATUS = useMemo(
    () => ({
      shouldPlay: isFocused,
      isLooping: true,
      isMuted,
    }),
    [isFocused, isMuted],
  );

  const handleVideoRef = useCallback(
    (component) => {
      const videoObj = component;

      if (!videoObj) return;

      (async () => {
        try {
          const { isLoaded } = await videoObj.getStatusAsync();

          if (isFocused && !isLoaded) {
            await videoObj.loadAsync({ uri: videoUri }, INITIAL_STATUS);
          }

          if (!isFocused && isLoaded) {
            await videoObj.unloadAsync();
          }
        } catch (e) {
          const msg = e;
        }
      })();
    },
    [INITIAL_STATUS, videoUri, isFocused],
  );

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
        onLoad={() => {
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
            ref={handleVideoRef}
            onLoad={() => {
              Animated.timing(opacity, {
                toValue: 1,
                useNativeDriver: true,
                duration: 1000,
              }).start();
            }}
            resizeMode="cover"
            style={[style, { flex: 1 }]}
          />
        </Animated.View>
      </Layout>
    ),
    [opacity, style, handleVideoRef],
  );
}
