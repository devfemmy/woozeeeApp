import React, {
  useRef,
  useState,
  useContext,
  useCallback,
  useEffect,
} from 'react';
import { View, StyleSheet, Image, TextInput } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import { Layout, Text, Button, CheckBox } from '@ui-kitten/components';

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

import BankOptions from 'src/components/BankOptionButton/index';
import BankOptionsCheckBox from 'src/components/BankOptionsCheckBox/index';

import globus from '../../../assets/images/icon/globus.png';
import zenith from '../../../assets/images/icon/zenith.png';
import uba from '../../../assets/images/icon/uba.png';
import access from '../../../assets/images/icon/accessColored.png';
import TopNavigationArea from 'src/components/TopNavigationArea/index';

function Freeze(props) {
  const [accountBalance, setAccountBalance] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [allChecked, setAllChecked] = useState(false);
  const [zenithCheck, setZenithCheck] = useState(false);
  const [ubaCheck, setUbaCheck] = useState(false);
  const [globusCheck, setGlobusCheck] = useState(false);
  const [accessCheck, setAccessCheck] = useState(false);
  const t = useContext(LocaleContext);

  const banksData = [
    {
      name: 'Access Bank',
      logo: access,
      selected: accessCheck,
    },
    {
      name: 'Zenith Bank',
      logo: zenith,
      selected: zenithCheck,
    },
    {
      name: 'UBA',
      logo: uba,
      selected: ubaCheck,
    },
    {
      name: 'Globus Bank',
      logo: globus,
      selected: globusCheck,
    },
  ];

  const ACCOUNTS = [
    {
      id: 4,
      title: `Globus Bank - ₦${accountBalance}`,
      acctNo: accountNumber,
      image: require('assets/images/banks/globus.png'),
    },
  ];

  function handleSelect(bank) {
    if (bank.name == 'Zenith Bank') {
      setZenithCheck(!zenithCheck);
    } else if (bank.name == 'Access Bank') {
      setAccessCheck(!accessCheck);
    } else if (bank.name == 'UBA') {
      setUbaCheck(!ubaCheck);
    } else {
      setGlobusCheck(!globusCheck);
    }
  }

  return (
    <Layout level="6" style={styles.container}>
      <TopNavigationArea
        title={'Freeze'}
        navigation={props.navigation}
        screen="default"
      />
      <Text category="c1" status="basic" style={{ marginVertical: 10 }}>
        Kindly select account(s) or card(s) you want to freeze
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
        }}
      >
        <Text category="c2" status="basic">
          {allChecked ? 'Deselect All' : 'Select All'}
        </Text>
        <CheckBox
          status="basic"
          checked={allChecked}
          onChange={() => {
            setAllChecked(!allChecked);
            setZenithCheck(!zenithCheck);
            setUbaCheck(!ubaCheck);
            setGlobusCheck(!globusCheck);
            setAccessCheck(!accessCheck);
          }}
          style={styles.checkbox}
        />
      </View>
      {banksData.map((bank, index) => (
        <BankOptionsCheckBox
          bank={bank}
          index={index}
          onSelect={() => handleSelect(bank)}
        />
      ))}
      <View style={{ marginVertical: 50 }}>
        <Button
          status="danger"
          size="large"
          accessibilityLiveRegion="assertive"
          accessibilityComponentType="button"
          accessibilityLabel="Continue"
          // onPress={routeActivateWalletOTPVerify}
          // disabled={isLoading}
        >
          <Text status="control">{t('proceed')}</Text>
        </Button>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  checkbox: {
    // alignSelf: 'center',
    marginHorizontal: 15,
    // borderColor: '#dcdcdc',
  },
});

export default Freeze;
