import React, { useMemo, useState } from 'react';

import { View } from 'react-native';

import { Input } from '@ui-kitten/components';

import { IconSearch } from '~src/components/CustomIcons';

export default function SearchField(props) {
  const [form, setFormValues] = useState({
    value: '',
    status: 'basic',
  });

  const handleChange = (inputSearch) => {
    setFormValues((prevState) => ({
      ...prevState,
      value: inputSearch,
    }));
  };

  return useMemo(
    () => (
      <View
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
        style={{
          width: '100%',
          paddingLeft: 15,
          paddingRight: 60,
        }}
      >
        <Input
          size="medium"
          value={form.value}
          accessibilityLabel="Search"
          placeholder="Search interests"
          status={form.status}
          onChangeText={handleChange}
          accessoryLeft={IconSearch}
        />
      </View>
    ),
    [form.value, form.status, props],
  );
}
