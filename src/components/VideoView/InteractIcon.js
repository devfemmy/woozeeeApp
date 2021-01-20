import React, { useMemo } from 'react';

import { View } from 'react-native';

import { Button, Text } from '@ui-kitten/components';

export default function InteractIcon(props) {
  // eslint-disable-next-line react/prop-types
  const { accessory, textContent, onPress } = props;

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
          status="control"
          size="large"
          accessoryLeft={accessory}
          onPress={onPress}
        />
        <Text status="control" category="label">
          {textContent}
        </Text>
      </View>
    ),
    [accessory, textContent, onPress],
  );
}
