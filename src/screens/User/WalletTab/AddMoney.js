import React, {
  useContext,
  useState,
  useRef,
  useCallback,
  useEffect,
} from 'react';

import {
  View,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  ScrollView,
  Dimensions,
} from 'react-native';

import RBSheet from 'react-native-raw-bottom-sheet';

import {
  Layout,
  Text,
  List,
  Button,
  Divider,
  Radio,
  RadioGroup,
  Spinner,
} from '@ui-kitten/components';

import { Ionicons, FontAwesome } from '@expo/vector-icons';

import TopNavigationArea from 'src/components/TopNavigationArea';

import InteractIcon from 'src/components/InteractIcon';

import { LocaleContext, AppSettingsContext, AuthContext } from 'src/contexts';

import { GeneralTextField } from 'src/components/FormFields';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {
  FlutterwaveInit,
  PayWithFlutterwave,
  FlutterwaveButton,
} from 'flutterwave-react-native';

import {
  IconArrowDown,
  IconCCheck,
  IconCPhoneBookFill,
  IconClose,
} from 'src/components/CustomIcons';

function AddMoney({ navigation }) {
  const options = [
    {
      icon: 'card',
      title: 'Card Top Up',
      subTitle: 'Top up your wallet using your debit card',
      iconColor: 'rgba(0, 156, 209, 1)',
      bgColor: 'rgba(0, 156, 209, 0.1)',
    },
    {
      icon: 'bank',
      title: 'Bank App',
      subTitle: 'Transfer money into your wallet via your bank application',
      color: 'rgba(189, 91, 23, 1)',
      bgColor: 'rgba(189, 91, 23, 0.1)',
    },
    {
      icon: 'card',
      title: 'Card Top Up',
      subTitle: 'Top up your wallet using your debit card',
      color: 'rgba(0, 156, 209, 1)',
    },
  ];
  const AddOptions = ({ icon, title, subTitle, onPress }) => {
    return (
      <TouchableOpacity onPress={onPress}>
        <Layout
          level="6"
          style={{
            marginHorizontal: 20,
            elevation: 5,
            shadowColor: '#0009',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowRadius: 2,
            shadowOpacity: 0.25,
            marginTop: 20,
            borderRadius: 5,
          }}
        >
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              paddingVertical: 20,
              paddingHorizontal: 20,
            }}
          >
            {icon === 'card' ? (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  backgroundColor: 'rgba(0, 156, 209, 0.1)',
                  marginRight: 15,
                }}
              >
                <Ionicons name="card" size={30} color="rgba(0, 156, 209, 1)" />
              </View>
            ) : (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  backgroundColor: 'rgba(189, 91, 23, 0.1)',
                  marginRight: 15,
                }}
              >
                <FontAwesome
                  name="bank"
                  size={25}
                  color="rgba(189, 91, 23, 1)"
                />
              </View>
            )}
            {icon === 'card' ? (
              <View>
                <Text
                  status="basic"
                  category="h6"
                  style={{ marginVertical: 3 }}
                >
                  {title}
                </Text>
                <Text
                  status="basic"
                  category="c1"
                  style={{ marginVertical: 3 }}
                >
                  {subTitle}
                </Text>
              </View>
            ) : (
              <View>
                <Text
                  status="basic"
                  category="h6"
                  style={{ marginVertical: 3 }}
                >
                  {title}
                </Text>
                <Text
                  status="basic"
                  category="c1"
                  style={{ marginVertical: 3 }}
                >
                  {subTitle}
                </Text>
              </View>
            )}
          </View>
        </Layout>
      </TouchableOpacity>
    );
  };

  const t = useContext(LocaleContext);

  return (
    <Layout level="6" style={{ flex: 1 }}>
      <TopNavigationArea
        title={'Add Money'}
        navigation={navigation}
        screen="default"
      />
      <AddOptions
        icon="card"
        title="Card Top Up"
        subTitle="Top up your wallet using your debit card"
        onPress={() => navigation.navigate('FillCardDetails')}
      />
      <AddOptions
        icon="bank"
        title="Bank App"
        subTitle="Transfer money into your wallet via your bank application"
        onPress={() => navigation.navigate('TransferMoney')}
      />
      <TouchableOpacity onPress={() => navigation.navigate('Deposit')}>
        <Layout
          level="6"
          style={{
            marginHorizontal: 20,
            elevation: 5,
            shadowColor: '#0009',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowRadius: 2,
            shadowOpacity: 0.25,
            marginTop: 20,
            borderRadius: 5,
          }}
        >
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              paddingVertical: 20,
              paddingHorizontal: 20,
            }}
          >
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: 50,
                height: 50,
                borderRadius: 25,
                backgroundColor: 'rgba(0, 148, 86, 0.1)',
                marginRight: 15,
              }}
            >
              <Image
                source={require('../../../assets/images/icon/cash.png')}
                resizeMode="contain"
                style={{ height: 25, width: 25 }}
              />
            </View>
            <View>
              <Text status="basic" category="h6" style={{ marginVertical: 3 }}>
                Deposit
              </Text>
              <Text status="basic" category="c1" style={{ marginVertical: 3 }}>
                Fund your wallet with the help of any nearby {'\n'}merchant
              </Text>
            </View>
          </View>
        </Layout>
      </TouchableOpacity>
    </Layout>
  );
}

export default AddMoney;
