import React, { useContext, useState } from 'react';

import { View, ScrollView } from 'react-native';

import { Layout, Button, Text } from '@ui-kitten/components';

import { LocaleContext } from 'src/contexts';

import TopNavigationArea from 'src/components/TopNavigationArea';

import { GeneralTextField, GeneralDatePicker } from 'src/components/FormFields';

import { IconCalendar } from 'src/components/CustomIcons';

export default function FamilyPlan({ navigation }) {
  const [isLoading, setLoading] = useState(false);

  const [form, setFormValues] = useState({
    firstName: '',
    lastName: '',
    mobileNumber: '',
    dob: '',
    email: '',
    address: '',
    beneficiary1: '',
    beneficiary2: '',
    beneficiary3: '',
    beneficiary4: '',
  });

  const t = useContext(LocaleContext);

  // prettier-ignore
  const routePictureUpload = () => navigation.navigate('ActivateWalletPictureUpload');

  return (
    <Layout level="6" style={{ flex: 1 }}>
      <TopNavigationArea
        title={t('fillDetails')}
        navigation={navigation}
        screen="auth"
      />
      <ScrollView
        alwaysBounceVertical
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            flex: 1,
            padding: 15,
          }}
        >
          <View style={{ paddingBottom: 10 }}>
            <View
              style={{
                paddingVertical: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <View style={{ flex: 1, marginRight: 5 }}>
                <GeneralTextField
                  type="firstName"
                  label={t('firstName')}
                  validate="required"
                  setFormValues={setFormValues}
                />
              </View>
              <View style={{ flex: 1, marginLeft: 5 }}>
                <GeneralTextField
                  type="lastName"
                  label={t('lastName')}
                  autoCompleteType="name"
                  textContentType="familyName"
                  validate="required"
                  setFormValues={setFormValues}
                />
              </View>
            </View>
            <View style={{ paddingVertical: 10 }}>
              <GeneralTextField
                type="mobileNumber"
                label={t('mobileNum')}
                keyboardType="number-pad"
                validate="required"
                setFormValues={setFormValues}
              />
            </View>
            <View style={{ paddingVertical: 10 }}>
              <View style={{ flex: 1, marginLeft: 5 }}>
                <GeneralDatePicker
                  type="dob"
                  label={t('dob')}
                  setFormValues={setFormValues}
                  accessoryRight={IconCalendar}
                />
              </View>
            </View>
            <View style={{ paddingVertical: 10 }}>
              <GeneralTextField
                type="email"
                label={t('emailAddress')}
                autoCompleteType="email"
                textContentType="emailAddress"
                keyboardType="email-address"
                validate="email"
                setFormValues={setFormValues}
              />
            </View>
            <View style={{ paddingVertical: 10 }}>
              <GeneralTextField
                type="address"
                label={t('address')}
                validate="required"
                setFormValues={setFormValues}
              />
            </View>
            <View style={{ paddingVertical: 10 }}>
              <GeneralTextField
                type="beneficiary1"
                label={`${t('beneficiary')} ${t('name')}`}
                setFormValues={setFormValues}
              />
            </View>
            <View style={{ paddingVertical: 10 }}>
              <GeneralTextField
                type="beneficiary2"
                label={`${t('second')} ${t('beneficiary')}`}
                setFormValues={setFormValues}
              />
            </View>
            <View style={{ paddingVertical: 10 }}>
              <GeneralTextField
                type="beneficiary3"
                label={`${t('third')} ${t('beneficiary')}`}
                setFormValues={setFormValues}
              />
            </View>
            <View style={{ paddingVertical: 10 }}>
              <GeneralTextField
                type="beneficiary4"
                label={`${t('fourth')} ${t('beneficiary')}`}
                setFormValues={setFormValues}
              />
            </View>
            <View style={{ paddingVertical: 20 }}>
              <Button
                status="danger"
                size="large"
                accessibilityLiveRegion="assertive"
                accessibilityComponentType="button"
                accessibilityLabel="Continue"
                disabled={isLoading}
                onPress={routePictureUpload}
              >
                <Text status="control">{t('next')}</Text>
              </Button>
            </View>
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
}
