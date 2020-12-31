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
  const { videoUri, thumbUri } = props;

  const isFocused = useIsFocused();

  const opacity = React.useMemo(() => new Animated.Value(0), []);

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
      <Layout style={styles.background}>
        <Image
          source={thumbUri}
          style={{
            flex: 1,
            resizeMode: 'cover',
            width: '100%',
            height: '100%',
            position: 'absolute',
          }}
        />
        <Animated.View style={[styles.backgroundViewWrapper, { opacity }]}>
          <Video
            isLooping
            isMuted
            positionMillis={500}
            onLoadStart={() => {
              Animated.timing(opacity, {
                toValue: 1,
                useNativeDriver: true,
                duration: 1000,
              }).start();
            }}
            resizeMode="cover"
            shouldPlay={isFocused || isFocused === undefined}
            source={{ uri: cachedUri }}
            style={{ flex: 1 }}
          />
        </Animated.View>
      </Layout>
    ),
    [isFocused, opacity, cachedUri, thumbUri],
  );
}
