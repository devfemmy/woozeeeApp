// prettier-ignore
import React, {
  useContext, useState, useRef, useCallback,
} from 'react';

import {
  View,
  Image,
  TouchableOpacity,
  useWindowDimensions,
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
} from '@ui-kitten/components';

import TopNavigationArea from 'src/components/TopNavigationArea';

import InteractIcon from 'src/components/InteractIcon';

import { LocaleContext, AppSettingsContext } from 'src/contexts';

import useDisableAndroidExit from 'src/hooks/useDisableAndroidExit';

import { GeneralTextField } from 'src/components/FormFields';

import {
  IconArrowDown,
  // IconCNaira,
  IconCCheck,
  IconCPhoneBookFill,
  IconClose,
} from 'src/components/CustomIcons';

const ACCOUNTS = [
  {
    id: 1,
    title: 'woozeee Wallet - ₦ 99,394.99',
    image: require('assets/images/banks/woozeee.png'),
  },
  {
    id: 2,
    title: 'Access Bank - ₦ 34,677.02',
    image: require('assets/images/banks/access.png'),
  },
  {
    id: 3,
    title: 'UBA - ₦ 25,500.44',
    image: require('assets/images/banks/uba.png'),
  },
  {
    id: 4,
    title: 'Globus Bank -₦ 24,222.18',
    image: require('assets/images/banks/globus.png'),
  },
  {
    id: 5,
    title: 'Zenith Bank -₦ 1,000.00',
    image: require('assets/images/banks/zenith.png'),
  },
  {
    id: 6,
    title: 'Pay with other Banks',
    image: require('assets/images/banks/others.png'),
  },
];

/* DATA */
const woozeeeCards = [
  {
    id: 1,
    banner: require('assets/images/card/mtn.png'),
    title: 'MTN',
  },
  {
    id: 2,
    banner: require('assets/images/card/airtel.png'),
    title: 'airtel',
  },
  {
    id: 3,
    banner: require('assets/images/card/glo.png'),
    title: 'glo',
  },
  {
    id: 4,
    banner: require('assets/images/card/9mobile.png'),
    title: '9mobile',
  },
];

export default function Airtime({ navigation }) {
  useDisableAndroidExit();

  const { width, height } = useWindowDimensions();

  const IS_PORTRAIT = height > width;

  const CARD_HEIGHT = IS_PORTRAIT ? 180 : 160;

  const [activeOperator, setActiveOperator] = useState(null);

  const t = useContext(LocaleContext);

  const { appState } = useContext(AppSettingsContext);

  const BG_THEME = appState.darkMode ? '#070A0F' : '#F7F9FC';

  const accountSheetRef = useRef(null);

  const confirmSheetRef = useRef(null);

  const [form, setFormValues] = useState({
    mobile: '',
    amount: '',
    pin: '',
    account: t('paymentAccount'),
  });

  const [selectedOption, setSelectedOption] = useState(0);

  const handleAccountChange = (index) => {
    setSelectedOption(index);
    setFormValues((prevState) => ({
      ...prevState,
      account: ACCOUNTS[index].title,
    }));
  };

  const onClickOperator = (i) => {
    if (i === activeOperator) {
      setActiveOperator(null);
    } else {
      setActiveOperator(i);
    }
  };

  const handleOpenAccountSheet = () => accountSheetRef.current.open();

  const handleOpenConfirmSheet = () => confirmSheetRef.current.open();

  const routeSuccess = () => navigation.navigate('BillPaymentSuccess');

  const handleConfirmTransaction = () => {
    confirmSheetRef.current.close();
    routeSuccess();
  };

  // prettier-ignore
  const ConfirmSheet = () => (
    <RBSheet
      ref={confirmSheetRef}
      height={380}
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
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingBottom: 15,
            paddingHorizontal: 20,
          }}
        >
          <Text category="h6" style={{ fontSize: 16 }} status="primary">
            {t('confirmTrans')}
          </Text>
          <InteractIcon
            Accessory={(evaProps) => <IconClose {...evaProps} fill="#888" />}
            height={30}
            width={30}
            onPress={() => confirmSheetRef.current.close()}
          />
        </View>
        <Divider style={{ marginBottom: 20, width: '100%' }} />
        <View>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 10,
            }}
          >
            <Text
              category="s2"
              appearance="hint"
              style={{ flex: 1, marginHorizontal: 5, textAlign: 'right' }}
            >
              Network
            </Text>
            <Text
              category="s2"
              style={{ flex: 1, marginHorizontal: 5, textAlign: 'left' }}
            >
              MTN
            </Text>
          </View>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 10,
            }}
          >
            <Text
              category="s2"
              appearance="hint"
              style={{ flex: 1, marginHorizontal: 5, textAlign: 'right' }}
            >
              Mobile Number
            </Text>
            <Text
              category="s2"
              style={{ flex: 1, marginHorizontal: 5, textAlign: 'left' }}
            >
              09045678966
            </Text>
          </View>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 10,
            }}
          >
            <Text
              category="s2"
              appearance="hint"
              style={{ flex: 1, marginHorizontal: 5, textAlign: 'right' }}
            >
              Amount
            </Text>
            <Text
              category="s2"
              style={{ flex: 1, marginHorizontal: 5, textAlign: 'left' }}
            >
              ₦1,000
            </Text>
          </View>
        </View>
        <View style={{ width: '100%', paddingHorizontal: 15, paddingTop: 10 }}>
          <View style={{ paddingVertical: 5 }}>
            <GeneralTextField
              type="pin"
              label={t('transactionPin')}
              keyboardType="number-pad"
              validate="required"
              setFormValues={setFormValues}
            />
          </View>
          <View style={{ paddingTop: 10 }}>
            <Button
              status="danger"
              size="large"
              accessibilityLiveRegion="assertive"
              accessibilityComponentType="button"
              accessibilityLabel="Continue"
              onPress={handleConfirmTransaction}
            >
              <Text status="control">{t('confirm')}</Text>
            </Button>
          </View>
        </View>
      </Layout>
    </RBSheet>
  );

  const AccountSheet = useCallback(
    () => (
      <RBSheet
        ref={accountSheetRef}
        height={425}
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
            justifyContent: 'flex-end',
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
          <View style={{ paddingHorizontal: 20 }}>
            <RadioGroup
              selectedIndex={selectedOption}
              onChange={handleAccountChange}
            >
              {ACCOUNTS.map((option) => (
                <Radio key={option.id}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      width: '100%',
                    }}
                  >
                    <Text category="s2">{option.title}</Text>
                    <Image
                      source={option.image}
                      defaultSource={option.image}
                      resizeMode="cover"
                      style={{ height: 25, width: 25 }}
                    />
                  </View>
                </Radio>
              ))}
            </RadioGroup>
          </View>
          <View
            style={{
              paddingVertical: 20,
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
              onPress={() => accountSheetRef.current.close()}
            >
              <Text status="control">{t('done')}</Text>
            </Button>
          </View>
        </Layout>
      </RBSheet>
    ),
    [BG_THEME, t, selectedOption],
  );

  const WoozeeeCards = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.75}
      style={{
        width: width / 4.1,
        paddingHorizontal: 5,
        alignItems: 'center',
        justifyContent: 'flex-start',
        position: 'relative',
        maxHeight: 130,
      }}
      onPress={() => onClickOperator(item.id)}
    >
      <Image
        source={item.banner}
        defaultSource={item.banner}
        style={{
          width: '100%',
          borderRadius: 10,
          maxHeight: 100,
        }}
        resizeMode="contain"
      />
      {item.id === activeOperator && (
        <View style={{ position: 'absolute', top: 0, right: 0 }}>
          <IconCCheck
            style={{
              height: 25,
              width: 25,
            }}
          />
        </View>
      )}
      <Text category="s2">{item.title}</Text>
    </TouchableOpacity>
  );

  const renderHeaderArea = () => (
    <View style={{ flex: 1, paddingTop: 20 }}>
      <View style={{ paddingHorizontal: 15, marginBottom: 10 }}>
        <Text category="s1">{t('operatorChoice')}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <List
          style={{ backgroundColor: 'transparent' }}
          contentContainerStyle={{ paddingHorizontal: 5 }}
          horizontal
          alwaysBounceHorizontal
          alwaysBounceVertical
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={woozeeeCards}
          keyExtractor={(_, i) => i.toString()}
          renderItem={WoozeeeCards}
          getItemLayout={(data, index) => ({
            length: CARD_HEIGHT,
            offset: CARD_HEIGHT * index,
            index,
          })}
        />
      </View>
    </View>
  );

  const renderFooterArea = () => (
    <View
      style={{
        flex: 1,
        paddingBottom: 20,
        marginTop: 10,
      }}
    >
      <View style={{ paddingHorizontal: 15 }}>
        {/* <View style={{ paddingBottom: 10 }}>
          <Text category="label" appearance="hint" style={{ marginBottom: 5 }}>
            {t('selectProduct')}
          </Text>
          <Button
            appearance="outline"
            accessoryRight={IconArrowDown}
            style={{ justifyContent: 'space-between' }}
            onPress={handleOpenProductSheet}
          >
            <Text>{form.product}</Text>
          </Button>
        </View> */}
        <View style={{ paddingVertical: 5 }}>
          <GeneralTextField
            type="mobile"
            label={t('mobile')}
            autoCompleteType="tel"
            textContentType="telephoneNumber"
            validate="required"
            setFormValues={setFormValues}
            accessoryRight={IconCPhoneBookFill}
          />
        </View>
        <View style={{ paddingVertical: 5 }}>
          <GeneralTextField
            type="amount"
            label={t('amount')}
            keyboardType="number-pad"
            validate="required"
            setFormValues={setFormValues}
            // accessoryLeft={IconCNaira}
          />
        </View>
        <View style={{ paddingVertical: 10 }}>
          <Text category="label" appearance="hint" style={{ marginBottom: 5 }}>
            {t('paymentAccount')}
          </Text>
          <Button
            appearance="outline"
            accessoryRight={IconArrowDown}
            style={{ justifyContent: 'space-between' }}
            onPress={handleOpenAccountSheet}
          >
            <Text>{form.account}</Text>
          </Button>
        </View>
        {/* <View style={{ paddingVertical: 5 }}>
          <GeneralTextField
            type="pin"
            label={t('transactionPin')}
            keyboardType="number-pad"
            validate="required"
            setFormValues={setFormValues}
          />
        </View> */}
        <View style={{ paddingVertical: 20 }}>
          <Button
            status="danger"
            size="large"
            accessibilityLiveRegion="assertive"
            accessibilityComponentType="button"
            accessibilityLabel="Continue"
            onPress={handleOpenConfirmSheet}
          >
            <Text status="control">{t('proceed')}</Text>
          </Button>
        </View>
      </View>
    </View>
  );

  return (
    <Layout level="6" style={{ flex: 1 }}>
      <TopNavigationArea
        title={t('airtime')}
        navigation={navigation}
        screen="default"
      />
      <View style={{ flex: 1 }}>
        <List
          style={{ backgroundColor: 'transparent' }}
          ListHeaderComponent={renderHeaderArea}
          ListFooterComponent={renderFooterArea}
          horizontal={!IS_PORTRAIT}
          alwaysBounceHorizontal
          alwaysBounceVertical
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <AccountSheet />
      <ConfirmSheet />
    </Layout>
  );
}
