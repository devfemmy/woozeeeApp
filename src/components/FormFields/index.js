import React, { useState, useMemo, useCallback } from 'react';

import { RegularInput, SecureInput } from '~src/components/CustomInputs';

import {
  verifyWithCaption,
  verifyWithoutCaption,
} from '~src/components/FormVerification';

export function EmailField(props) {
  const { setFormValues } = props;

  const [inputVal, setInputVal] = useState({
    value: '',
    status: 'basic',
  });

  const handleChange = (input) => {
    const currentState = verifyWithoutCaption(input, 'email');

    setInputVal((prevState) => ({
      ...prevState,
      ...currentState,
      value: input,
    }));
  };

  const handleBlur = useCallback(() => {
    setFormValues((prevState) => ({ ...prevState, email: inputVal.value }));
  }, [inputVal.value, setFormValues]);

  return useMemo(
    () => (
      <RegularInput
        value={inputVal.value}
        label="Email"
        accessibilityLabel="Email"
        placeholder="Enter your Email Address"
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        status={inputVal.status}
        autoCorrect={false}
        onChangeText={handleChange}
        onBlur={handleBlur}
      />
    ),
    [inputVal.value, inputVal.status, handleBlur],
  );
}

export function OneTimeCodeField(props) {
  const { setFormValues } = props;

  const [inputVal, setInputVal] = useState({
    value: '',
    status: 'basic',
  });

  const handleChange = (input) => {
    const currentState = verifyWithoutCaption(input, 'required');

    setInputVal((prevState) => ({
      ...prevState,
      ...currentState,
      value: input,
    }));
  };

  const handleBlur = useCallback(() => {
    setFormValues((prevState) => ({ ...prevState, code: inputVal.value }));
  }, [inputVal.value, setFormValues]);

  return useMemo(
    () => (
      <RegularInput
        value={inputVal.value}
        label="Code"
        accessibilityLabel="Code"
        placeholder="Enter Verification Code"
        autoCapitalize="none"
        autoCompleteType="off"
        textContentType="oneTimeCode"
        status={inputVal.status}
        autoCorrect={false}
        onChangeText={handleChange}
        onBlur={handleBlur}
      />
    ),
    [inputVal.value, inputVal.status, handleBlur],
  );
}

export function PasswordField(props) {
  const { setFormValues, label, type } = props;

  const [inputVal, setInputVal] = useState({
    value: '',
    status: 'basic',
  });

  const handleChange = (input) => {
    const currentState = verifyWithCaption(input, 'required');

    setInputVal((prevState) => ({
      ...prevState,
      ...currentState,
      value: input,
    }));
  };

  const handleBlur = useCallback(() => {
    setFormValues((prevState) => ({ ...prevState, [type]: inputVal.value }));
  }, [inputVal.value, setFormValues, type]);

  return useMemo(
    () => (
      <SecureInput
        value={inputVal.value}
        label={label}
        accessibilityLabel={label}
        placeholder={`Enter ${label}`}
        autoCapitalize="none"
        autoCompleteType="password"
        textContentType="password"
        status={inputVal.status}
        autoCorrect={false}
        onChangeText={handleChange}
        onBlur={handleBlur}
      />
    ),
    [inputVal.value, inputVal.status, handleBlur, label],
  );
}

export function GeneralTextField(props) {
  // prettier-ignore
  const {
    setFormValues, label, type, androidComplete, iosComplete,
  } = props;

  const [inputVal, setInputVal] = useState({
    value: '',
    status: 'basic',
  });

  const handleChange = (input) => {
    const currentState = verifyWithoutCaption(input, 'required');

    setInputVal((prevState) => ({
      ...prevState,
      ...currentState,
      value: input,
    }));
  };

  const handleBlur = useCallback(() => {
    setFormValues((prevState) => ({ ...prevState, [type]: inputVal.value }));
  }, [inputVal.value, setFormValues, type]);

  return useMemo(
    () => (
      <RegularInput
        value={inputVal.value}
        label={label}
        accessibilityLabel={label}
        placeholder={`Enter ${label}`}
        autoCompleteType={androidComplete}
        textContentType={iosComplete}
        status={inputVal.status}
        autoCorrect={false}
        onChangeText={handleChange}
        onBlur={handleBlur}
      />
    ),
    [
      inputVal.value,
      inputVal.status,
      handleBlur,
      label,
      androidComplete,
      iosComplete,
    ],
  );
}
