import React from 'react';
import { StyleSheet } from 'react-native';

import { BlurView } from 'expo-blur';

import { Spinner } from '@ui-kitten/components';

const styles = StyleSheet.create({
  overlayCentered: {
    flex: 1,
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 99,
  },
});

export default function OverlayLoader(props) {
  // eslint-disable-next-line react/prop-types
  const { isLoading } = props;

  return isLoading ? (
    <BlurView intensity="25" tint="dark" style={styles.overlayCentered}>
      <Spinner
        size="giant"
        status="danger"
        accessibilityLiveRegion="polite"
        accessibilityHint="Please wait"
      />
    </BlurView>
  ) : null;
}
