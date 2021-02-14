import React, { useContext, useState } from 'react';

import { View } from 'react-native';

import { Input } from '@ui-kitten/components';

import { LocaleContext } from 'src/contexts';

import { IconSearch } from 'src/components/CustomIcons';

export default function SearchField(props) {
  const [form, setFormValues] = useState({
    value: '',
    status: 'basic',
  });

  const t = useContext(LocaleContext);

  const handleChange = (inputSearch) => {
    setFormValues((prevState) => ({
      ...prevState,
      value: inputSearch,
    }));
  };

  return (
    <View
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
        placeholder={`${t('search')} ${t('interests')}`}
        status={form.status}
        onChangeText={handleChange}
        accessoryLeft={IconSearch}
      />
    </View>
  );
}
