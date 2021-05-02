// prettier-ignore
import React, {
  useState, useMemo, useCallback, useContext,
} from 'react';

// prettier-ignore
import {
  View,
  Image,
  useWindowDimensions,
  ScrollView,
  TouchableOpacity,
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

import { IconClose, IconPaperPlane } from 'src/components/CustomIcons';

export default function Comments({ navigation }) {
  const { height } = useWindowDimensions();

  const { bottom, top } = useSafeAreaInsets();

  const INSETS = bottom + top + 180;

  const t = useContext(LocaleContext);

  const [form, setFormValues] = useState({
    comment: '',
  });

  const closeComments = useCallback(() => navigation.pop(), [navigation]);

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
            onPress={closeComments}
          />
        </View>
      </View>
    ),
    [t, closeComments],
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
            height: 34,
            width: 34,
            borderRadius: 17,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Image
            source={require('assets/images/user/user1.png')}
            defaultSource={require('assets/images/user/user1.png')}
            style={{
              height: 30,
              width: 30,
              borderRadius: 15,
              borderColor: 'white',
            }}
            resizeMode="cover"
          />
        </LinearGradient>
        <View style={{ flex: 1, marginHorizontal: 5 }}>
          <GeneralTextField
            type="comment"
            placeholder={t('writeComment')}
            setFormValues={setFormValues}
          />
        </View>
        <InteractIcon
          Accessory={IconPaperPlane}
          status="primary"
          height={32}
          width={32}
        />
      </View>
    ),
    [t],
  );

  // prettier-ignore
  const Message = ({ sent, data }) => useMemo(
    () => (
      <View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
            marginTop: 15,
          }}
        >
          <LinearGradient
            colors={['#043F7C', '#FF5757']}
            style={{
              height: 34,
              width: 34,
              borderRadius: 17,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Image
              source={require('assets/images/user/user1.png')}
              style={{
                height: 30,
                width: 30,
                borderRadius: 15,
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
              marginHorizontal: 5,
            }}
          >
            <Text category="s2" style={{ alignSelf: 'flex-start' }}>
              {data.user}
            </Text>
            <Text category="p2">{data.msg}</Text>
            <Text category="c1" style={{ alignSelf: 'flex-end' }}>
              {data.time}
            </Text>
          </Layout>
        </View>
        <View style={{ marginVertical: 5, marginLeft: 50 }}>
          <TouchableOpacity
            activeOpacity={0.75}
          >
            <Text category="c2">{t('reply')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    ),
    [data],
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
                  user: 'You',
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
