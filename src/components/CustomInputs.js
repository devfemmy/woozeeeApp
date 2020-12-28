import React, { useState } from 'react';

import { Pressable } from 'react-native';

import { Input } from '@ui-kitten/components';

import { BoldText, RegularText } from './CustomTexts';

import { IconEye, IconInputState } from './CustomIcons';

import fonts from '~src/constants/fonts';

const iconType = (condition) => {
  switch (condition) {
    case 'success':
      return 'checkmark-circle-outline';
    case 'danger':
      return 'alert-triangle-outline';
    default:
      return 'alert-circle-outline';
  }
};

const InputLabel = (props) => {
  // eslint-disable-next-line react/prop-types
  const { label, ...otherProps } = props;
  return (
    <BoldText
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...otherProps}
    >
      {label}
    </BoldText>
  );
};

const InputCaption = (props) => {
  // eslint-disable-next-line react/prop-types
  const { caption, ...otherProps } = props;
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <RegularText {...otherProps}>{caption}</RegularText>;
};

const CaptionIcon = (props) => {
  // eslint-disable-next-line react/prop-types
  const { captionIcon, ...otherProps } = props;

  return (
    <IconInputState
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...otherProps}
      iconType={iconType(captionIcon)}
    />
  );
};

function SecureInput(props) {
  const {
    //  prettier-ignore
    // eslint-disable-next-line react/prop-types
    label,
    // eslint-disable-next-line react/prop-types
    caption,
    // eslint-disable-next-line react/prop-types
    captionIcon,
    ...otherProps
  } = props;

  const [isSecureEntry, setSecureEntry] = useState(true);

  const toggleSecureEntry = () => {
    setSecureEntry((prevState) => !prevState);
  };

  const secureToggleIcon = (propsIcon) => (
    <Pressable onPress={toggleSecureEntry}>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <IconEye {...propsIcon} isOpen={isSecureEntry} />
    </Pressable>
  );

  // eslint-disable-next-line react/prop-types

  return (
    <Input
      /* eslint-disable-next-line react/jsx-props-no-spreading */
      {...otherProps}
      size="large"
      accessibilityLiveRegion="polite"
      secureTextEntry={isSecureEntry}
      accessoryRight={secureToggleIcon}
      maxFontSizeMultiplier={1.5}
      textStyle={fonts.fontRegular}
      /* eslint-disable-next-line react/jsx-props-no-spreading */
      label={(evaProps) => <InputLabel {...evaProps} label={label} />}
      caption={
        /* prettier-ignore */
        /* eslint-disable-next-line react/jsx-props-no-spreading */
        (evaProps) => (caption ? <InputCaption {...evaProps} caption={caption} /> : null)
      }
      captionIcon={
        /* prettier-ignore */
        /* eslint-disable-next-line react/jsx-props-no-spreading */
        (evaProps) => (captionIcon ? <CaptionIcon {...evaProps} captionIcon={captionIcon} /> : null)
      }
    />
  );
}

function RegularInput(props) {
  const {
    //  prettier-ignore
    // eslint-disable-next-line react/prop-types
    label,
    // eslint-disable-next-line react/prop-types
    caption,
    // eslint-disable-next-line react/prop-types
    captionIcon,
    ...otherProps
  } = props;

  return (
    <Input
      /* eslint-disable-next-line react/jsx-props-no-spreading */
      {...otherProps}
      size="large"
      accessibilityLiveRegion="polite"
      maxFontSizeMultiplier={1.5}
      textStyle={fonts.fontRegular}
      /* eslint-disable-next-line react/jsx-props-no-spreading */
      label={(evaProps) => <InputLabel {...evaProps} label={label} />}
      caption={
        /* prettier-ignore */
        /* eslint-disable-next-line react/jsx-props-no-spreading */
        (evaProps) => (caption ? <InputCaption {...evaProps} caption={caption} /> : null)
      }
      captionIcon={
        /* prettier-ignore */
        /* eslint-disable-next-line react/jsx-props-no-spreading */
        (evaProps) => (captionIcon ? <CaptionIcon {...evaProps} captionIcon={captionIcon} /> : null)
      }
    />
  );
}

export { RegularInput, SecureInput };
