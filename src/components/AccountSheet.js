import React, {
  useCallback,
  useRef,
  useState,
  useContext,
  useEffect,
} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';

import {
  Text,
  Layout,
  Button,
  Divider,
  Radio,
  RadioGroup,
  Spinner,
} from '@ui-kitten/components';

import RBSheet from 'react-native-raw-bottom-sheet';

import { LocaleContext, AppSettingsContext, AuthContext } from 'src/contexts';
import { getAccountDetails } from 'src/services/Requests/banks/index';
import finatrust from '../assets/images/banks/finaTrust.png';
import numberWithCommas from 'src/constants/numberWithCommas';

const GlobalAccount = ({ price, show }) => {
  const [accounts, setAccounts] = useState([]);

  const accountSheetRef = useRef(null);

  const [selectedOption, setSelectedOption] = useState(0);

  const t = useContext(LocaleContext);

  const { appState } = useContext(AppSettingsContext);

  const BG_THEME = appState.darkMode ? '#070A0F' : '#F7F9FC';

  const [form, setFormValues] = useState({
    cardNumber: '',
    accountBalance: '',
    account: '',
  });

  const handleAccountChange = (index) => {
    console.log(price);
    setSelectedOption(index);
    setFormValues((prevState) => ({
      ...prevState,
      account: accounts[index].Number,
      accountBalance: accounts[index].Balance?.WithdrawableAmount,
    }));
  };

  async function getBankDetails() {
    await getAccountDetails().then((res) => {
      setAccounts(res);
    });
  }

  const handleTransaction = () => {
    accountSheetRef.current.close();
    Alert.alert(
      'Transaction',
      `You will be charged ₦${numberWithCommas(price)} for this transaction.`,
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            form.accountBalance >= price
              ? alert('Transaction Successful') //call api to handle payment
              : alert('Insufficient Funds');
          },
        },
      ],
    );
  };

  useEffect(() => {
    show && accountSheetRef.current.open();
    getBankDetails();
    return () => {};
  }, []);

  const AccountsSheet = useCallback(
    () => (
      <RBSheet
        ref={accountSheetRef}
        closeOnDragDown
        animationType="fade"
        customStyles={{
          container: {
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: BG_THEME,
          },
        }}
      >
        <Layout
          level="5"
          style={{
            flex: 1,
            width: '100%',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            paddingBottom: 30,
          }}
        >
          <View
            style={{
              width: '100%',
              justifyContent: 'flex-start',
              paddingBottom: 25,
              paddingHorizontal: 20,
            }}
          >
            <Text category="h6" style={{ fontSize: 16 }} status="primary">
              {t('source')}
            </Text>
          </View>
          <View style={{ paddingHorizontal: 25 }}>
            <RadioGroup
              selectedIndex={selectedOption}
              onChange={handleAccountChange}
            >
              {accounts.map((account, id) => (
                <Radio key={id}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      width: '100%',
                    }}
                  >
                    <View>
                      <Text category="s2">
                        {(account?.name || 'Fina Trust -  ') +
                          '₦' +
                          numberWithCommas(
                            JSON.stringify(
                              account?.Balance?.WithdrawableAmount,
                            ),
                          )}
                      </Text>
                      <Text category="c1">{account?.Number}</Text>
                    </View>
                    <Image
                      source={finatrust}
                      defaultSource={finatrust}
                      resizeMode="cover"
                      style={{ height: 40, width: 40 }}
                    />
                  </View>
                  <Text>{}</Text>
                </Radio>
              ))}
            </RadioGroup>
          </View>
          <Divider style={{ marginVertical: 20, width: '100%', height: 2 }} />
          <View
            style={{
              paddingHorizontal: 20,
              width: '100%',
            }}
          >
            <Button
              status="danger"
              accessibilityLiveRegion="assertive"
              accessibilityComponentType="button"
              accessibilityLabel="Continue"
              style={{ width: '100%' }}
              onPress={() => handleTransaction()}
            >
              <Text status="control">{t('done')}</Text>
            </Button>
          </View>
        </Layout>
      </RBSheet>
    ),
    [BG_THEME, t, selectedOption],
  );
  return <AccountsSheet />;
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    marginVertical: 15,
    borderRadius: 5,
  },
  img: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  innerContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
});

export default GlobalAccount;
