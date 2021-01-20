import React, { useState, useMemo, useCallback } from 'react';

import { Pressable } from 'react-native';

// prettier-ignore
import {
  Radio, RadioGroup, Text, Input,
} from '@ui-kitten/components';

import { verifyWithoutCaption } from '~src/components/FormVerification';

import { IconEye, IconInputState } from '~src/components/CustomIcons';

const CAPTION_ICON = {
  basic: 'alert-circle-outline',
  success: 'checkmark-circle-outline',
  danger: 'alert-triangle-outline',
};

const CaptionIcon = (props) => {
  // eslint-disable-next-line react/prop-types
  const { icon, ...otherProps } = props;

  return (
    <IconInputState
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...otherProps}
      iconType={CAPTION_ICON[icon]}
    />
  );
};

const SecureToggleIcon = (props) => {
  // eslint-disable-next-line react/prop-types
  const { isSecure, toggleSecure, ...otherProps } = props;

  const handlePress = () => {
    toggleSecure((prevState) => !prevState);
  };

  return (
    <Pressable onPress={handlePress}>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <IconEye {...otherProps} isOpen={isSecure} />
    </Pressable>
  );
};

export function GeneralTextField(props) {
  const {
    label,
    type,
    androidComplete,
    iosComplete,
    caption,
    multiline,
    size,
    validate,
    setFormValues,
    secure,
    ...otherProps
  } = props;

  const [inputVal, setInputVal] = useState({
    value: '',
    status: 'basic',
  });

  const [isSecureEntry, setSecureEntry] = useState(secure);

  const handleChange = useCallback(
    (input) => {
      const currentState = verifyWithoutCaption(input, validate);

      setInputVal((prevState) => ({
        ...prevState,
        ...currentState,
        value: input,
      }));
    },
    [validate],
  );

  const handleBlur = useCallback(() => {
    setFormValues((prevState) => ({ ...prevState, [type]: inputVal.value }));
  }, [inputVal.value, setFormValues, type]);

  return useMemo(
    () => (
      <Input
        /* eslint-disable-next-line react/jsx-props-no-spreading */
        {...otherProps}
        accessibilityLiveRegion="polite"
        maxFontSizeMultiplier={1.5}
        autoCorrect={false}
        multiline={multiline || false}
        size={size || 'large'}
        caption={caption}
        value={inputVal.value}
        label={label}
        secureTextEntry={isSecureEntry}
        accessibilityLabel={label}
        placeholder={`Enter ${label}`}
        autoCompleteType={androidComplete}
        textContentType={iosComplete}
        status={inputVal.status}
        onChangeText={handleChange}
        onBlur={handleBlur}
        /* prettier-ignore */
        accessoryRight={
          secure
            ? (evaProps) => (
              <SecureToggleIcon
                  // eslint-disable-next-line react/jsx-props-no-spreading
                {...evaProps}
                isSecure={isSecureEntry}
                toggleSecure={setSecureEntry}
              />
            )
            : null
        }
        /* prettier-ignore */
        captionIcon={
          // eslint-disable-next-line react/jsx-props-no-spreading
          (evaProps) => (caption ? <CaptionIcon {...evaProps} icon={inputVal.status} /> : null)
        }
      />
    ),
    [
      inputVal.value,
      inputVal.status,
      label,
      androidComplete,
      iosComplete,
      caption,
      multiline,
      size,
      secure,
      otherProps,
      handleChange,
      handleBlur,
      isSecureEntry,
    ],
  );
}

export function GeneralRadioGroup(props) {
  // prettier-ignore
  const {
  // eslint-disable-next-line react/prop-types
    label, data, type, setFormValues,
  } = props;

  const [selectedOption, setGender] = useState(0);

  const handleChange = (index) => setGender(index);

  const handleBlur = useCallback(() => {
    setFormValues((prevState) => ({
      ...prevState,
      [type]: data[selectedOption],
    }));
  }, [setFormValues, type, data, selectedOption]);

  return (
    <>
      <Text category="label" appearance="hint">
        {label}
      </Text>
      <RadioGroup
        selectedIndex={selectedOption}
        onChange={handleChange}
        onBlur={handleBlur}
      >
        {/* eslint-disable-next-line react/prop-types */}
        {data.map((option) => (
          <Radio key={option}>{option}</Radio>
        ))}
      </RadioGroup>
    </>
  );
}
