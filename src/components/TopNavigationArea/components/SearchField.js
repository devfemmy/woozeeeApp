import React, { useMemo, useState } from 'react';

import { View } from 'react-native';

import { Text } from '@ui-kitten/components';

import { RegularInput } from '~src/components/CustomInputs';

import { verifySearch } from '~src/components/FormVerification';

export default function SearchField(props) {
  const [form, setFormValues] = useState({
    search: {
      value: '',
      status: 'basic',
    },
  });

  const updateFormSearch = (inputSearch) => {
    const currentState = verifySearch(inputSearch);
    setFormValues((prevState) => ({
      ...prevState,
      search: { ...currentState, value: inputSearch },
    }));
  };

  return useMemo(
    () => (
      <View
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
        style={{
          width: '100%',
          top: -5,
          alignSelf: 'flex-start',
          paddingLeft: 15,
          paddingRight: 80,
        }}
      >
        <RegularInput
          size="medium"
          value={form.search.value}
          accessibilityLabel="Search"
          placeholder="Search interests"
          autoCapitalize="none"
          status={form.search.status}
          onChangeText={updateFormSearch}
        />
      </View>
    ),
    [form.search.value, form.search.status, props],
  );
}
