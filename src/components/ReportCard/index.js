import React, { useContext, useState } from 'react';

import { View } from 'react-native';

import { sendReport } from '../../services/Requests/index';

import { Layout, Button, Text } from '@ui-kitten/components';

import { LocaleContext } from 'src/contexts';

import TopNavigationArea from 'src/components/TopNavigationArea';

import { GeneralTextField } from 'src/components/FormFields';

import { useIsFocused } from '@react-navigation/native';

export default function Report({ route, navigation }) {
  const t = useContext(LocaleContext);
  const [isLoading, setLoading] = useState(false);

  const { item } = route.params;

  const [reason, setReason] = useState('');

  const handleReport = async () => {
    if (reason.length > 0) {
      await sendReport(reason, item._id);
      setReason('');
      alert('Report Sent!');
    } else {
      alert('Please fill in a reason');
    }
  };

  return (
    <Layout level="6" style={{ flex: 1 }}>
      <TopNavigationArea
        title={`${t('makeAReport')}`}
        navigation={navigation}
        screen="auth"
      />
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
            }}
          >
            <View style={{ paddingVertical: 5 }}>
              <GeneralTextField
                type="reason"
                label={t('reason')}
                validate="required"
                multiline
                height={100}
                setFormValues={setReason}
                value={reason}
              />
            </View>
            <View style={{ marginTop: '10%' }}>
              <Button
                status="danger"
                size="large"
                accessibilityLiveRegion="assertive"
                accessibilityComponentType="button"
                accessibilityLabel="Continue"
                disabled={isLoading}
                onPress={handleReport}
              >
                <Text status="control">{t('submit')}</Text>
              </Button>
            </View>
          </View>
        </View>
      </View>
    </Layout>
  );
}
