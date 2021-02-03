import React, { useMemo } from 'react';

import { View } from 'react-native';

import { Button, Text } from '@ui-kitten/components';

export default function InteractIcon(props) {
  // eslint-disable-next-line react/prop-types
  const {
    Accessory,
    textContent,
    onPress,
    status,
    height,
    width,
    style,
  } = props;

  return useMemo(
    () => (
      <View
        style={[
          style,
          {
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.0125)',
          },
        ]}
      >
        <Button
          appearance="ghost"
          status={status ?? 'control'}
          size="tiny"
          style={{
            paddingVertical: 0,
            paddingHorizontal: 0,
          }}
          accessoryLeft={(evaProps) => (
            <Accessory
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...evaProps}
              height={height ?? 32}
              width={width ?? 32}
            />
          )}
          onPress={onPress}
        />
        {textContent ? (
          <Text status="control" category="label">
            {textContent}
          </Text>
        ) : null}
      </View>
    ),
    [textContent, onPress, height, width, status, style],
  );
}
