import React from 'react';
import { StyleSheet } from 'react-native';

import { BlurView } from 'expo-blur';

import { Spinner } from '@ui-kitten/components';

const styles = StyleSheet.create({
  overlayCentered: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 99,
  },
});

export default function OverlayLoader(props) {
  // eslint-disable-next-line react/prop-types
  const { isLoading } = props;

  return isLoading ? (
    <BlurView intensity="50" tint="dark" style={styles.overlayCentered}>
      <Spinner
        size="giant"
        status="danger"
        accessibilityLiveRegion="polite"
        accessibilityHint="Please wait"
      />
    </BlurView>
  ) : null;
}
