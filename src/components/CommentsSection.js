import React, { useState } from 'react';

import { View, Image } from 'react-native';

// prettier-ignore
import {
  Layout, List, Modal, Card, Text,
} from '@ui-kitten/components';

import { LinearGradient } from 'expo-linear-gradient';

import { GeneralTextField } from 'src/components/FormFields';

import InteractIcon from 'src/components/InteractIcon';

import { IconClose, IconPaperPlane } from './CustomIcons';

export default function CommentsSection(props) {
  // prettier-ignore
  const {
    width, height, t, isVisible, setIsVisible,
  } = props;

  const [form, setFormValues] = useState({
    comment: '',
  });

  const closeModal = () => setIsVisible(false);

  const CardHeader = () => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
      }}
    >
      <Text category="h5">{t('comments')}</Text>
      <View>
        <InteractIcon
          Accessory={IconClose}
          status="primary"
          height={32}
          width={32}
          onPress={closeModal}
        />
      </View>
    </View>
  );

  const CardFooter = () => (
    <View
      style={{
        flexDirection: 'row',
        padding: 15,
        alignItems: 'center',
      }}
    >
      <LinearGradient
        colors={['#043F7C', '#FF5757']}
        style={{
          height: 44,
          width: 44,
          borderRadius: 22,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Image
          source={require('assets/images/user/user1.png')}
          style={{
            height: 40,
            width: 40,
            borderRadius: 100,
            borderColor: 'white',
          }}
        />
      </LinearGradient>
      <View style={{ flex: 1, marginHorizontal: 5 }}>
        <GeneralTextField
          type="comment"
          placeholder={t('writeComment')}
          setFormValues={setFormValues}
        />
      </View>
      <View>
        <InteractIcon
          Accessory={IconPaperPlane}
          status="primary"
          height={32}
          width={32}
        />
      </View>
    </View>
  );

  return (
    <Modal visible={isVisible} style={{ height, width }}>
      <Layout level="5" style={{ flex: 1 }}>
        <Card
          style={{
            flex: 1,
            justifyContent: 'space-between',
            backgroundColor: 'transparent',
          }}
          header={CardHeader}
          footer={CardFooter}
        >
          <View
            style={{
              height: height - 180,
            }}
          />
        </Card>
      </Layout>
    </Modal>
  );
}
