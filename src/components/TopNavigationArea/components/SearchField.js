import React, { useMemo, useState } from 'react';

import { View } from 'react-native';

import { RegularInput } from '~src/components/CustomInputs';

import { IconSearch } from '~src/components/CustomIcons';

export default function SearchField(props) {
  const [form, setFormValues] = useState({
    search: {
      value: '',
      status: 'basic',
    },
  });

  const updateFormSearch = (inputSearch) => {
    setFormValues((prevState) => ({
      ...prevState,
      search: { ...prevState.search, value: inputSearch },
    }));
  };

  return useMemo(
    () => (
      <View
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
        style={{
          width: '100%',
          top: -6,
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
          accessoryLeft={IconSearch}
        />
      </View>
    ),
    [form.search.value, form.search.status, props],
  );
}
