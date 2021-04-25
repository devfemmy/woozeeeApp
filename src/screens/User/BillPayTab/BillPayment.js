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

import { LocaleContext, AppSettingsContext } from 'src/contexts';

import useDisableAndroidExit from 'src/hooks/useDisableAndroidExit';

import { GeneralTextField } from 'src/components/FormFields';

import {
  IconArrowDown,
  IconCNaira,
  IconCCheck,
  IconCPhoneBook,
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
  },
  {
    id: 2,
    banner: require('assets/images/card/airtel.png'),
  },
  {
    id: 3,
    banner: require('assets/images/card/glo.png'),
  },
  {
    id: 4,
    banner: require('assets/images/card/9mobile.png'),
  },
];

export default function BillPayment({ navigation }) {
  useDisableAndroidExit();

  const { width, height } = useWindowDimensions();

  const IS_PORTRAIT = height > width;

  const CARD_HEIGHT = IS_PORTRAIT ? 180 : 160;

  const [activeOperator, setActiveOperator] = useState(null);

  const t = useContext(LocaleContext);

  const { appState } = useContext(AppSettingsContext);

  const BG_THEME = appState.darkMode ? '#070A0F' : '#F7F9FC';

  const productSheetRef = useRef(null);

  const accountSheetRef = useRef(null);

  const [form, setFormValues] = useState({
    mobile: '',
    amount: '',
    pin: '',
    account: t('paymentAccount'),
  });

  const onClickOperator = (i) => {
    if (i === activeOperator) {
      setActiveOperator(null);
    } else {
      setActiveOperator(i);
    }
  };

  const handleOpenProductSheet = () => productSheetRef.current.open();

  const handleOpenAccountSheet = () => accountSheetRef.current.open();

  const AccountOptions = () => {
    const [selectedOption, setSelectedOption] = useState(0);

    const handleAccountChange = (index) => {
      setSelectedOption(index);
      setFormValues((prevState) => ({
        ...prevState,
        account: ACCOUNTS[index].title,
      }));
    };
    return (
      <RadioGroup selectedIndex={selectedOption} onChange={handleAccountChange}>
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
    );
  };

  const ProductSheet = () => (
    <RBSheet
      ref={productSheetRef}
      height={160}
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
            paddingBottom: 15,
            paddingHorizontal: 20,
          }}
        >
          <Text category="h6" style={{ fontSize: 16 }} status="primary">
            {t('selectProduct')}
          </Text>
        </View>
        <Divider style={{ marginBottom: 20, width: '100%' }} />
        <TouchableOpacity
          activeOpacity={0.75}
          style={{
            width: '100%',
            justifyContent: 'flex-start',
            flexDirection: 'column',
            paddingHorizontal: 20,
            marginBottom: 15,
          }}
        >
          <Text style={{ fontSize: 16 }} status="basic" category="h6">
            MTN VTU
          </Text>
          <Text category="c2">Min: ₦ 50.00 | Max: ₦ 50,000.00</Text>
        </TouchableOpacity>
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
            <AccountOptions />
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
    [BG_THEME, t],
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
      }}
      onPress={() => onClickOperator(item.id)}
    >
      <Image
        source={item.banner}
        defaultSource={item.banner}
        style={{
          width: '100%',
          borderRadius: 10,
        }}
        resizeMode="contain"
      />
      {item.id === activeOperator && (
        <View style={{ position: 'absolute', top: 20, right: 0 }}>
          <IconCCheck
            style={{
              height: 25,
              width: 25,
            }}
          />
        </View>
      )}
    </TouchableOpacity>
  );

  const renderHeaderArea = () => (
    <View style={{ flex: 1, paddingTop: 20 }}>
      <View style={{ paddingHorizontal: 15 }}>
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
      }}
    >
      <View style={{ paddingHorizontal: 15 }}>
        <View style={{ paddingBottom: 10 }}>
          <Text category="label" appearance="hint" style={{ marginBottom: 5 }}>
            {t('selectProduct')}
          </Text>
          <Button
            appearance="outline"
            accessoryRight={IconArrowDown}
            style={{ justifyContent: 'space-between' }}
            onPress={handleOpenProductSheet}
          >
            <Text>{t('product')}</Text>
          </Button>
        </View>
        <View style={{ paddingVertical: 5 }}>
          <GeneralTextField
            type="mobile"
            label={t('mobile')}
            autoCompleteType="tel"
            textContentType="telephoneNumber"
            validate="required"
            setFormValues={setFormValues}
            accessoryRight={IconCPhoneBook}
          />
        </View>
        <View style={{ paddingVertical: 5 }}>
          <GeneralTextField
            type="amount"
            label={t('amount')}
            keyboardType="number-pad"
            validate="required"
            setFormValues={setFormValues}
            accessoryLeft={IconCNaira}
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
        <View style={{ paddingVertical: 5 }}>
          <GeneralTextField
            type="pin"
            label={t('transactionPin')}
            keyboardType="number-pad"
            validate="required"
            setFormValues={setFormValues}
          />
        </View>
        <View style={{ paddingVertical: 20 }}>
          <Button
            status="danger"
            size="large"
            accessibilityLiveRegion="assertive"
            accessibilityComponentType="button"
            accessibilityLabel="Continue"
          >
            <Text status="control">{t('proceed')}</Text>
          </Button>
        </View>
      </View>
    </View>
  );

  return (
    <Layout level="6" style={{ flex: 1 }}>
      <TopNavigationArea title="" navigation={navigation} screen="default" />
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
      <ProductSheet />
      <AccountSheet />
    </Layout>
  );
}
