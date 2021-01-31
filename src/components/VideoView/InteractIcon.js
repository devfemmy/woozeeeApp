import React, { useMemo } from 'react';

import { View } from 'react-native';

import { Button, Text } from '@ui-kitten/components';

export default function InteractIcon(props) {
  // eslint-disable-next-line react/prop-types
  const { Accessory, textContent, onPress } = props;

  return useMemo(
    () => (
      <View
        style={{
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.0125)',
          marginVertical: 3,
        }}
      >
        <Button
          style={{ height: 36, width: 36 }}
          appearance="ghost"
          status="control"
          size="large"
          accessoryLeft={(evaProps) => (
            // eslint-disable-next-line react/jsx-props-no-spreading
            <Accessory {...evaProps} height={32} width={32} />
          )}
          onPress={onPress}
        />
        <Text status="control" category="label">
          {textContent}
        </Text>
      </View>
    ),
    [textContent, onPress],
  );
}
