import React, { useMemo } from 'react';

import { View, useWindowDimensions } from 'react-native';

import { Button, Text } from '@ui-kitten/components';

export default function InteractIcon(props) {
  // eslint-disable-next-line react/prop-types
  const { accessory, textContent, onPress } = props;

  const { width, height } = useWindowDimensions();

  const isPortrait = height > width;

  return useMemo(
    () => (
      <View
        style={{
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.0125)',
          marginBottom: 5,
        }}
      >
        <Button
          appearance="ghost"
          status={isPortrait ? 'control' : 'basic'}
          size="large"
          accessoryLeft={accessory}
          onPress={onPress}
        />
        <Text status={isPortrait ? 'control' : 'basic'} category="label">
          {textContent}
        </Text>
      </View>
    ),
    [accessory, textContent, onPress, isPortrait],
  );
}
