import React, { useState, useMemo, useCallback } from 'react';

// prettier-ignore
import {
  View, Image, useWindowDimensions, ScrollView,
} from 'react-native';

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
    t, isVisible, setIsVisible, insets,
  } = props;

  const { width, height } = useWindowDimensions();

  const viewHeight = height - insets ?? 0;

  const [form, setFormValues] = useState({
    comment: '',
  });

  const closeModal = useCallback(() => setIsVisible(false), [setIsVisible]);

  const renderCardHeader = useCallback(
    () => (
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
    ),
    [t, closeModal],
  );

  const renderCardFooter = useCallback(
    () => (
      <View
        style={{
          flex: 1,
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
              borderRadius: 20,
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
    ),
    [t],
  );

  return useMemo(
    () => (
      <Modal visible={isVisible} style={{ height: viewHeight, width }}>
        <Layout level="5" style={{ flex: 1 }}>
          <Card
            style={{
              flex: 1,
              justifyContent: 'space-between',
              backgroundColor: 'transparent',
            }}
            header={renderCardHeader}
            footer={renderCardFooter}
          >
            <View
              style={{
                height: height - (insets + 180),
              }}
            >
              <ScrollView style={{ flex: 1 }}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
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
                      marginRight: 5,
                    }}
                  >
                    <Image
                      source={require('assets/images/user/user1.png')}
                      style={{
                        height: 40,
                        width: 40,
                        borderRadius: 20,
                        borderColor: 'white',
                      }}
                    />
                  </LinearGradient>
                  <Layout
                    level="4"
                    style={{
                      flex: 1,
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                      borderRadius: 10,
                    }}
                  >
                    <Text category="p2">
                      Hello world, woozee, Testing the limit of this very long
                      message
                    </Text>
                    <Text category="c1" style={{ alignSelf: 'flex-end' }}>
                      9:15am
                    </Text>
                  </Layout>
                </View>
              </ScrollView>
            </View>
          </Card>
        </Layout>
      </Modal>
    ),
    [
      isVisible,
      viewHeight,
      height,
      insets,
      width,
      renderCardFooter,
      renderCardHeader,
    ],
  );
}
