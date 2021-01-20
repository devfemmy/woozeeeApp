import React, { useState, useMemo, useCallback } from 'react';

import { Pressable } from 'react-native';

import { Input } from '@ui-kitten/components';

import { IconEye, IconInputState } from './CustomIcons';

const CAPTION_ICON = {
  basic: 'alert-circle-outline',
  success: 'checkmark-circle-outline',
  danger: 'alert-triangle-outline',
};

function SecureInput(props) {
  // prettier-ignore
  const {
    value, label, caption, captionIcon, size, ...otherProps
  } = props;

  const [isSecureEntry, setSecureEntry] = useState(true);

  const toggleSecureEntry = () => {
    setSecureEntry((prevState) => !prevState);
  };

  const secureToggleIcon = useCallback(
    (propsIcon) => (
      <Pressable onPress={toggleSecureEntry}>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <IconEye {...propsIcon} isOpen={isSecureEntry} />
      </Pressable>
    ),
    [isSecureEntry],
  );

  return useMemo(
    () => (
      <Input
        /* eslint-disable-next-line react/jsx-props-no-spreading */
        {...otherProps}
        value={value}
        size={size || 'large'}
        accessibilityLiveRegion="polite"
        secureTextEntry={isSecureEntry}
        accessoryRight={secureToggleIcon}
        maxFontSizeMultiplier={1.5}
        label={label}
        caption={caption}
        /* prettier-ignore */
        captionIcon={(evaProps) => (captionIcon ? (
          <IconInputState
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...evaProps}
            iconType={CAPTION_ICON[captionIcon]}
          />
        ) : null)}
      />
    ),
    [
      value,
      isSecureEntry,
      secureToggleIcon,
      caption,
      captionIcon,
      label,
      otherProps,
      size,
    ],
  );
}

function RegularInput(props) {
  // prettier-ignore
  const {
    value, label, caption, captionIcon, size, multiline, ...otherProps
  } = props;

  return useMemo(
    () => (
      <Input
        /* eslint-disable-next-line react/jsx-props-no-spreading */
        {...otherProps}
        value={value}
        size={size || 'large'}
        multiline={multiline || false}
        accessibilityLiveRegion="polite"
        maxFontSizeMultiplier={1.5}
        label={label}
        caption={caption}
        /* prettier-ignore */
        captionIcon={(evaProps) => (captionIcon ? (
          <IconInputState
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...evaProps}
            iconType={CAPTION_ICON[captionIcon]}
          />
        ) : null)}
      />
    ),
    [value, caption, captionIcon, label, otherProps, size, multiline],
  );
}

export { RegularInput, SecureInput };
