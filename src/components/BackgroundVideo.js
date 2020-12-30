import React, { useMemo } from 'react';

import { Animated, StyleSheet } from 'react-native';

import { useIsFocused } from '@react-navigation/native';

import { Video } from 'expo-av';

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
  const { videoUri } = props;

  const opacity = React.useMemo(() => new Animated.Value(0), []);

  const isFocused = useIsFocused();

  return useMemo(
    () => (
      <Layout style={styles.background}>
        <Animated.View style={[styles.backgroundViewWrapper, { opacity }]}>
          <Video
            isLooping
            isMuted
            positionMillis={500}
            onLoad={() => {
              Animated.timing(opacity, {
                toValue: 1,
                useNativeDriver: true,
              }).start();
            }}
            resizeMode="cover"
            shouldPlay={isFocused || undefined}
            source={videoUri}
            style={{ flex: 1 }}
          />
        </Animated.View>
      </Layout>
    ),
    [],
  );
}
