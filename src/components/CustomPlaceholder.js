import React, { useMemo } from 'react';

import {
  Placeholder,
  PlaceholderLine,
  PlaceholderMedia,
  ShineOverlay,
  Shine,
} from 'rn-placeholder';

export function CustomPlaceholder(props) {
  // eslint-disable-next-line react/prop-types
  const { width, height } = props;

  return useMemo(
    () => (
      <Placeholder
        Animation={ShineOverlay}
        Left={PlaceholderMedia}
        style={{
          width,
          paddingHorizontal: 10,
          height,
        }}
      >
        <PlaceholderLine style={{ width: '80%' }} />
        <PlaceholderLine
          style={{
            borderRadius: 5,
            height: height - 50,
            width: '100%',
          }}
        />
      </Placeholder>
    ),
    [height, width],
  );
}

export function FullPlaceholder(props) {
  // eslint-disable-next-line react/prop-types
  const { width, height } = props;

  return useMemo(
    () => (
      <Placeholder
        Animation={Shine}
        style={{
          width,
          paddingHorizontal: 10,
          height,
        }}
      >
        <PlaceholderLine style={{ width: '80%' }} />
        <PlaceholderLine
          style={{
            borderRadius: 5,
            height: height - 50,
            width: '100%',
          }}
        />
      </Placeholder>
    ),
    [height, width],
  );
}

export function ListPlaceholder(props) {
  // eslint-disable-next-line react/prop-types
  const { width, height } = props;

  return useMemo(
    () => (
      <Placeholder
        Animation={Shine}
        style={{
          width,
          paddingHorizontal: 10,
          height,
        }}
      >
        <PlaceholderLine
          style={{
            borderRadius: 5,
            height: height / 3,
            width: '100%',
          }}
        />
        <PlaceholderLine
          style={{
            borderRadius: 5,
            height: height / 3,
            width: '100%',
          }}
        />
        <PlaceholderLine
          style={{
            borderRadius: 5,
            height: height / 3,
            width: '100%',
          }}
        />
      </Placeholder>
    ),
    [height, width],
  );
}
