import React, {
  useRef,
  useState,
  useContext,
  useCallback,
  useEffect,
} from 'react';
import { View, StyleSheet, Image, TextInput } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {
  Layout,
  Text,
  List,
  Button,
  RadioGroup,
  Radio,
  Card,
  Divider,
} from '@ui-kitten/components';

import {
  IconArrowDown,
  // IconCNaira,
  IconCCheck,
  IconCPhoneBookFill,
  IconClose,
} from 'src/components/CustomIcons';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { LocaleContext, AppSettingsContext } from 'src/contexts';

import globus from '../../../assets/images/icon/globus.png';

function FillCardProcess(props) {
  const { appState } = useContext(AppSettingsContext);
  const BG_THEME = appState.darkMode ? '#070A0F' : '#F7F9FC';

  const [form, setFormValues] = useState({
    cardNumber: '',
    confirmPin: '',
    cardPin: '',
    expiryDate: '',
    amount: '',
    cvv: '',
  });

  const t = useContext(LocaleContext);

  return (
    <Layout level="6" style={styles.container}>
      <Text category="s1" status="basic" style={{ marginVertical: 10 }}>
        Amount*
      </Text>
      <View
        style={{
          width: '100%',
          height: 50,
        }}
      >
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              backgroundColor: '#043F7C',
              width: 45,
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              borderBottomLeftRadius: 5,
              borderTopLeftRadius: 5,
            }}
          >
            <Text category="h6" style={{ color: 'white' }}>
              ₦
            </Text>
          </View>
          <View>
            <TextInput
              placeholder={'Amount'}
              placeholderTextColor="gray"
              status="primary"
              style={{
                textAlign: 'left',
                paddingLeft: 10,
                backgroundColor: '#F3F3F7',
                width: 340,
                height: 50,
                justifyContent: 'center',
                borderTopRightRadius: 5,
                borderBottomRightRadius: 5,
              }}
              onChangeText={(text) =>
                setFormValues((prevState) => {
                  return {
                    ...prevState,
                    amount: text,
                  };
                })
              }
            />
          </View>
        </View>
      </View>
      <View style={{ marginTop: 20 }}>
        <Text category="s1" status="basic" style={{ marginVertical: 10 }}>
          Card Number
        </Text>
        <TextInput
          placeholder={'Enter Card Number'}
          placeholderTextColor="gray"
          status="primary"
          style={{
            textAlign: 'left',
            paddingLeft: 10,
            backgroundColor: '#F3F3F7',
            width: '100%',
            height: 50,
            justifyContent: 'center',
            borderRadius: 5,
          }}
          onChangeText={(text) =>
            setFormValues((prevState) => {
              return {
                ...prevState,
                cardNumber: text,
              };
            })
          }
        />
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <View style={{ marginVertical: 20, width: '50%', marginHorizontal: 2 }}>
          <Text category="s1" status="basic" style={{ marginVertical: 10 }}>
            Expiry Date
          </Text>
          <TextInput
            placeholder={'MM / YY'}
            placeholderTextColor="gray"
            status="primary"
            style={{
              textAlign: 'left',
              paddingLeft: 10,
              backgroundColor: '#F3F3F7',
              width: '100%',
              height: 50,
              justifyContent: 'center',
              borderRadius: 5,
            }}
            onChangeText={(text) =>
              setFormValues((prevState) => {
                return {
                  ...prevState,
                  expiryDate: text,
                };
              })
            }
          />
        </View>
        <View style={{ marginVertical: 20, width: '50%', marginHorizontal: 2 }}>
          <Text category="s1" status="basic" style={{ marginVertical: 10 }}>
            CVV
          </Text>
          <TextInput
            placeholder={'CVV'}
            placeholderTextColor="gray"
            status="primary"
            style={{
              textAlign: 'left',
              paddingLeft: 10,
              backgroundColor: '#F3F3F7',
              width: '100%',
              height: 50,
              justifyContent: 'center',
              borderRadius: 5,
            }}
            onChangeText={(text) =>
              setFormValues((prevState) => {
                return {
                  ...prevState,
                  cvv: text,
                };
              })
            }
          />
        </View>
      </View>
      <View style={{ marginTop: 20 }}>
        <Text category="s1" status="basic" style={{ marginVertical: 10 }}>
          Card Pin
        </Text>
        <TextInput
          placeholder={'Enter Card Pin'}
          placeholderTextColor="gray"
          status="primary"
          style={{
            textAlign: 'left',
            paddingLeft: 10,
            backgroundColor: '#F3F3F7',
            width: '100%',
            height: 50,
            justifyContent: 'center',
            borderRadius: 5,
          }}
          onChangeText={(text) =>
            setFormValues((prevState) => {
              return {
                ...prevState,
                cardPin: text,
              };
            })
          }
        />
      </View>
      <View style={{ marginTop: 20 }}>
        <Text category="s1" status="basic" style={{ marginVertical: 10 }}>
          Confirm Pin
        </Text>
        <TextInput
          placeholder={'Confirm Pin'}
          placeholderTextColor="gray"
          status="primary"
          style={{
            textAlign: 'left',
            paddingLeft: 10,
            backgroundColor: '#F3F3F7',
            width: '100%',
            height: 50,
            justifyContent: 'center',
            borderRadius: 5,
          }}
          onChangeText={(text) =>
            setFormValues((prevState) => {
              return {
                ...prevState,
                confirmPin: text,
              };
            })
          }
        />
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
});

export default FillCardProcess;
