import React, { useState, useMemo, useCallback } from 'react';

import { Pressable } from 'react-native';

import {
  Radio,
  RadioGroup,
  Text,
  Input,
  Autocomplete,
  AutocompleteItem,
  Select,
  SelectItem,
  IndexPath,
  Datepicker,
} from '@ui-kitten/components';

import { verifyWithoutCaption } from 'src/utilities/FormVerification';

import { IconEye, IconInputState } from 'src/components/CustomIcons';

const CAPTION_ICON = {
  basic: 'alert-circle-outline',
  success: 'checkmark-circle-outline',
  danger: 'alert-triangle-outline',
};

const CaptionIcon = (props) => {
  const { icon, ...otherProps } = props;

  return <IconInputState {...otherProps} iconType={CAPTION_ICON[icon]} />;
};

const SecureToggleIcon = (props) => {
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

export const GeneralTextField = (props) => {
  const {
    label,
    type,
    androidComplete,
    iosComplete,
    caption,
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
        {...otherProps}
        scrollEnabled
        accessibilityLiveRegion="polite"
        maxFontSizeMultiplier={1.5}
        autoCorrect={false}
        size={size || 'large'}
        caption={caption}
        value={inputVal.value}
        label={label}
        secureTextEntry={isSecureEntry}
        accessibilityLabel={label}
        placeholder={label}
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
                              {...evaProps}
                isSecure={isSecureEntry}
                toggleSecure={setSecureEntry}
              />
            )
            : null
        }
        /* prettier-ignore */
        captionIcon={
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
      size,
      secure,
      otherProps,
      handleChange,
      handleBlur,
      isSecureEntry,
    ],
  );
};

export const GeneralRadioGroup = (props) => {
  // prettier-ignore
  const {
    label, data, type, setFormValues,
  } = props;

  const [selectedOption, setSelectedOption] = useState(0);

  const handleChange = useCallback(
    (index) => {
      setSelectedOption(index);
      setFormValues((prevState) => ({
        ...prevState,
        [type]: data[index],
      }));
    },
    [setFormValues, type, data],
  );

  return useMemo(
    () => (
      <>
        <Text category="label" appearance="hint">
          {label}
        </Text>
        <RadioGroup selectedIndex={selectedOption} onChange={handleChange}>
          {/* eslint-disable-next-line react/prop-types */}
          {data.map((option) => (
            <Radio key={option}>{option}</Radio>
          ))}
        </RadioGroup>
      </>
    ),
    [data, handleChange, label, selectedOption],
  );
};

export const GeneralAutocomplete = (props) => {
  // prettier-ignore
  const {
    label, data, type, setFormValues,
  } = props;

  const [value, setValue] = useState('');

  const [list, setList] = useState(data);

  // prettier-ignore
  const filterData = (item, query) => item.title.toLowerCase().includes(query.toLowerCase());

  const handleChange = useCallback(
    (query) => {
      setValue(query);
      setList(() => data.filter((item) => filterData(item, query)));
    },
    [data],
  );

  const handleSelect = useCallback(
    (index) => {
      setValue(data[index].title);
      setFormValues((prevState) => ({
        ...prevState,
        [type]: data[index].title,
      }));
    },
    [setFormValues, type, data],
  );

  const renderOption = (item, index) => (
    <AutocompleteItem key={index} title={item.title} />
  );

  return useMemo(
    () => (
      <Autocomplete
        label={label}
        placement="top start"
        size="large"
        placeholder={label}
        value={value}
        onSelect={handleSelect}
        onChangeText={handleChange}
      >
        {list.map(renderOption)}
      </Autocomplete>
    ),
    [handleChange, handleSelect, label, list, value],
  );
};

export const GeneralSelect = (props) => {
  // prettier-ignore
  const {
      label, data, type, size, setFormValues,
  } = props;

  const [selectedOption, setSelectedOption] = useState(new IndexPath(0));

  const handleSelect = useCallback(
    (index) => {
      setSelectedOption(index);
      setFormValues((prevState) => ({
        ...prevState,
        [type]: data[index.row].title,
      }));
    },
    [setFormValues, type, data],
  );

  const renderOption = useMemo(
    () => <Text>{data[selectedOption.row].title}</Text>,
    [data, selectedOption.row],
  );

  return useMemo(
    () => (
      <Select
        size={size || 'large'}
        label={label}
        value={renderOption}
        selectedIndex={selectedOption}
        onSelect={handleSelect}
      >
        {/* eslint-disable-next-line react/prop-types */}
        {data.map((option) => (
          <SelectItem key={option.title} title={option.title} />
        ))}
      </Select>
    ),
    [data, handleSelect, label, size, selectedOption, renderOption],
  );
};

export const GeneralDatePicker = (props) => {
  // prettier-ignore
  const {
      label, type, size, setFormValues,
  } = props;

  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleSelect = useCallback(
    (newData) => {
      setSelectedDate(newData);
      setFormValues((prevState) => ({
        ...prevState,
        [type]: selectedDate.toLocaleDateString(),
      }));
    },
    [setFormValues, type, selectedDate],
  );

  return useMemo(
    () => (
      <Datepicker
        size={size || 'large'}
        label={label}
        date={selectedDate}
        onSelect={handleSelect}
      />
    ),
    [handleSelect, label, size, selectedDate],
  );
};
