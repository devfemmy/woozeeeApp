// prettier-ignore
import React, {
  useState, useMemo, useCallback, useContext,
} from 'react';

// prettier-ignore
import {
  View, Image, useWindowDimensions, ScrollView,
} from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

// prettier-ignore
import {
  Layout, Card, Text,
} from '@ui-kitten/components';

import { LinearGradient } from 'expo-linear-gradient';

import { LocaleContext } from 'src/contexts';

import { GeneralTextField } from 'src/components/FormFields';

import InteractIcon from 'src/components/InteractIcon';

import {
  IconClose,
  IconPaperPlane,
  IconCCamera,
  IconMic,
} from 'src/components/CustomIcons';

export default function Chats({ navigation }) {
  const { height } = useWindowDimensions();

  const { bottom, top } = useSafeAreaInsets();

  const INSETS = bottom + top + 180;

  const t = useContext(LocaleContext);

  const [form, setFormValues] = useState({
    comment: '',
  });

  const closeChats = useCallback(() => navigation.goBack(), [navigation]);

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
        <Text category="h5">{t('chats')}</Text>
        <View>
          <InteractIcon
            Accessory={IconClose}
            status="primary"
            height={32}
            width={32}
            onPress={closeChats}
          />
        </View>
      </View>
    ),
    [t, closeChats],
  );

  const renderCardFooter = useCallback(
    () => (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          padding: 5,
          alignItems: 'center',
        }}
      >
        {/* <LinearGradient
          colors={['#043F7C', '#FF5757']}
          style={{
            height: 28,
            width: 28,
            borderRadius: 14,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Image
            source={require('assets/images/user/user1.png')}
            style={{
              height: 26,
              width: 26,
              borderRadius: 13,
              borderColor: 'white',
            }}
          />
        </LinearGradient> */}
        <View style={{ flexDirection: 'row' }}>
          <InteractIcon
            Accessory={IconCCamera}
            status="primary"
            height={22}
            width={22}
          />
          <InteractIcon
            Accessory={IconMic}
            status="primary"
            height={22}
            width={22}
          />
        </View>
        <View style={{ flex: 1, marginHorizontal: 5 }}>
          <GeneralTextField
            type="comment"
            placeholder={t('writeMsg')}
            setFormValues={setFormValues}
          />
        </View>
        <View>
          <InteractIcon
            Accessory={IconPaperPlane}
            status="primary"
            height={28}
            width={28}
          />
        </View>
      </View>
    ),
    [t],
  );

  // prettier-ignore
  const Message = ({ sent, data }) => useMemo(
    () => (
      <View
        style={{
          flexDirection: sent ? 'row-reverse' : 'row',
          alignItems: 'flex-start',
          marginTop: 25,
        }}
      >
        {!sent && (
        <LinearGradient
          colors={['#043F7C', '#FF5757']}
          style={{
            height: 28,
            width: 28,
            borderRadius: 14,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Image
            source={require('assets/images/user/user1.png')}
            style={{
              height: 26,
              width: 26,
              borderRadius: 13,
              borderColor: 'white',
            }}
          />
        </LinearGradient>
        )}
        <Layout
          level="4"
          style={{
            flex: 1,
            paddingHorizontal: 15,
            paddingVertical: 10,
            borderRadius: 15,
            marginHorizontal: 5,
            ...(sent
              ? { borderBottomRightRadius: 0, backgroundColor: '#043F7C' }
              : { borderTopLeftRadius: 0 }),
          }}
        >
          {/* {!sent && (
          <Text
            category="s2"
            style={{ alignSelf: 'flex-start' }}
          >
            {data.user}
          </Text>
          )} */}
          <Text category="p2" status={sent ? 'control' : 'basic'}>
            {data.msg}
          </Text>
        </Layout>
        <View style={{ alignSelf: 'center', paddingHorizontal: 5 }}>
          <Text category="c1">
            {data.time}
          </Text>
        </View>
      </View>
    ),
    [sent, data],
  );

  return useMemo(
    () => (
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
              height: height - INSETS,
            }}
          >
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{ flex: 1 }}
              contentContainerStyle={{
                flex: 1,
                justifyContent: 'flex-end',
              }}
            >
              <Message
                data={{
                  user: 'Jack mar',
                  msg:
                    'Hello world, woozeee, Testing the limit of this very long message',
                  time: '9:15am',
                }}
              />
              <Message
                sent
                data={{
                  user: '',
                  msg:
                    'Hello world, woozeee, Testing the limit of this very long message',
                  time: '9:15am',
                }}
              />
              <Message
                data={{
                  user: 'Jack mar',
                  msg:
                    'Hello world, woozeee, Testing the limit of this very long message',
                  time: '9:15am',
                }}
              />
            </ScrollView>
          </View>
        </Card>
      </Layout>
    ),
    [height, INSETS, renderCardFooter, renderCardHeader],
  );
}
