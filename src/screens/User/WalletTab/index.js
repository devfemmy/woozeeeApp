import React, { useContext, useState, useEffect } from 'react';

import {
  View,
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';

// prettier-ignore
import {
  Layout, Text, List, Button, Card,
} from '@ui-kitten/components';

import { LocaleContext } from 'src/contexts';

import useDisableAndroidExit from 'src/hooks/useDisableAndroidExit';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  IconCCard,
  IconCPlus,
  IconCArrowUp,
  IconCSnow,
  IconCEye,
  IconForwardIos,
  IconCAtmCard,
  IconCGiftBox,
  IconCBag,
} from 'src/components/CustomIcons';

/* DATA */

const WALLET_ITEMS = [
  {
    id: 1,
    icon: IconCCard,
    content: 'accounts',
  },
  {
    id: 2,
    icon: IconCPlus,
    content: 'addMoney',
  },
  {
    id: 3,
    icon: IconCArrowUp,
    content: 'transferMoney',
  },
  {
    id: 4,
    icon: IconCSnow,
    content: 'freeze',
  },
  // {
  //   id: 5,
  //   icon: IconCEye,
  //   content: 'Toggle Balance',
  //   action: 'toggleBalanceShown',
  // },
];

const TRANSACTION_HISTORY = [
  {
    id: 1,
    icon: IconCAtmCard,
    iconColor: '#14B571',
    category: 'Money Matters',
    title: 'Loan from Zedvance',
    amount: '+ 31,985.94',
    time: '12:44 PM',
  },
  {
    id: 2,
    icon: IconCGiftBox,
    iconColor: '#08090B',
    category: 'Give Back',
    title: 'Quarterly Loyalty Bonus',
    amount: '+ 3,899.99',
    time: '09:10 AM',
  },
  {
    id: 3,
    icon: IconCBag,
    iconColor: '#EE5E31',
    category: 'Click & Shop',
    title: 'Adidas Sneaker Lmited Edition',
    amount: '- 76,000.00',
    time: '06:54 AM',
  },
];

export default function Wallet({ navigation }) {
  const [isBalanceVisible, setBalanceVisible] = useState(true);
  const [insureCardNo, setInsureCardNo] = useState(null);
  const [walletCardNo, setWalletCardNo] = useState(null);
  const [rewardCardNo, setRewardCardNo] = useState(null);
  const [insureAmt, setInsureAmt] = useState(null);
  const [walletAmt, setWalletAmt] = useState(null);
  const [rewardAmt, setRewardAmt] = useState(null);
  const [userImg, setUserImg] = useState(null);
  const [fullname, setFullName] = useState(null);

  const fetchFromAsyncStorage = () => {
    // Fetch Data from Asynchstorage

    AsyncStorage.getItem('fullName')
      .then((res) => {
        setFullName(res);
      })
      .catch((err) => err);
    AsyncStorage.getItem('insureCardNo')
      .then((res) => {
        setInsureCardNo(res);
      })
      .catch((err) => err);
    AsyncStorage.getItem('walletCardNo')
      .then((res) => {
        setWalletCardNo(res);
      })
      .catch((err) => err);
    AsyncStorage.getItem('rewardCardNo')
      .then((res) => {
        setRewardCardNo(res);
      })
      .catch((err) => err);
    AsyncStorage.getItem('insureAmt')
      .then((res) => {
        setInsureAmt(res);
      })
      .catch((err) => err);
    AsyncStorage.getItem('walletAmt')
      .then((res) => {
        setWalletAmt(res);
      })
      .catch((err) => err);
    AsyncStorage.getItem('rewardAmt').then((res) => {
      setRewardAmt(res);
    });
    AsyncStorage.getItem('userImage')
      .then((res) => {
        setUserImg(res);
      })
      .catch((err) => err);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchFromAsyncStorage();
    });

    return unsubscribe;
  }, [navigation]);

  const woozeeeCards = [
    {
      balance: parseInt(insureAmt).toFixed(2),
      cardNum: insureCardNo,
      banner: require('assets/images/card/card3.png'),
      action: 'openCare',
    },
    {
      balance: parseInt(walletAmt).toFixed(2),
      cardNum: walletCardNo,
      banner: require('assets/images/card/card1.png'),
      action: 'openWallet',
    },
    {
      balance: parseInt(rewardAmt).toFixed(2),
      cardNum: rewardCardNo,
      banner: require('assets/images/card/card2.png'),
      action: 'openRewards',
    },
  ];

  useDisableAndroidExit();

  const { width, height } = useWindowDimensions();

  const [isBalanceShown, setBalanceShown] = useState(true);

  const IS_PORTRAIT = height > width;

  const CARD_HEIGHT = IS_PORTRAIT ? 180 : 160;

  const t = useContext(LocaleContext);

  const toggleBalanceShown = () => {
    setBalanceShown((prevState) => !prevState);
  };

  const ACTIONS = {
    toggleBalanceShown,
  };

  const routeAllHistory = () => navigation.navigate('TransactionHistory');

  const HistoryItem = ({ data }) => (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 10,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View
          style={{
            height: 45,
            width: 45,
            borderRadius: 15,
            backgroundColor: data.iconColor,
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 10,
          }}
        >
          <data.icon fill="white" style={{ height: 18, width: 18 }} />
        </View>
        <View>
          <Text category="s2" style={{ marginBottom: 5, maxWidth: 200 }}>
            {data.title}
          </Text>
          <Text category="c1">{data.category}</Text>
        </View>
      </View>
      <View style={{ alignItems: 'flex-end' }}>
        <Text category="s2" style={{ marginBottom: 5 }}>
          {data.amount}
        </Text>
        <Text category="c1">{data.time}</Text>
      </View>
    </View>
  );

  const renderWoozeeeCards = () => (
    <View style={{ flex: 1, paddingTop: 15, Height: 180 }}>
      <List
        style={{ backgroundColor: 'transparent' }}
        contentContainerStyle={{ paddingHorizontal: 5 }}
        alwaysBounceHorizontal
        alwaysBounceVertical
        horizontal={IS_PORTRAIT}
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
  );

  const WalletItem = ({ data }) => (
    <View
      style={{
        paddingHorizontal: 5,
        width: '25%',
        alignItems: 'center',
      }}
    >
      <Button
        accessoryLeft={data.icon}
        style={{ borderRadius: 15, height: 60, width: 60 }}
        onPress={ACTIONS[data.action]}
      />
      <Text
        status="primary"
        category="c2"
        style={{ fontSize: 11, textAlign: 'center', marginTop: 5 }}
      >
        {t(data.content)}
      </Text>
    </View>
  );

  const WoozeeeCards = (data) => (
    <TouchableOpacity
      activeOpacity={0.75}
      style={{
        height: CARD_HEIGHT,
        width: IS_PORTRAIT ? width / 1.75 : width / 3,
        paddingHorizontal: 5,
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}
      // onPress={ACTION_SHEETS[data.item.action]}
    >
      <Image
        source={data.item.banner}
        defaultSource={data.item.banner}
        style={{
          height: IS_PORTRAIT ? 140 : 120,
          width: '100%',
          borderRadius: 5,
          resizeMode: 'contain',
        }}
      />
      <Text
        category="c2"
        style={{
          position: 'absolute',
          bottom: IS_PORTRAIT ? 140 / 1.9 : 120 / 1.9,
          color: 'white',
          right: 10,
        }}
      >
        {` ${data.item.cardNum}`}
      </Text>
      <Text
        category="s2"
        style={{
          position: 'absolute',
          bottom: IS_PORTRAIT ? 220 / 5 : 120 / 5,
          color: 'white',
          left: 20,
        }}
      >
        {fullname}
      </Text>
    </TouchableOpacity>
  );

  const renderHeaderArea = () => (
    <View style={{ flex: 1, paddingTop: 10 }}>
      <View style={{ flex: 1 }}>
        <List
          style={{ backgroundColor: 'transparent' }}
          contentContainerStyle={{ paddingHorizontal: 5 }}
          horizontal={IS_PORTRAIT}
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
      {/* <View
        style={{
          flex: 1,
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'flex-start',
          paddingHorizontal: 5,
        }}
      >
        {WALLET_ITEMS.map((data) => (
          <WalletItem data={data} key={data.id} />
        ))}
      </View> */}
    </View>
  );

  const renderTransactionHeader = () => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: 15,
        paddingVertical: 10,
      }}
    >
      <Text category="s1">{t('transactionHistory')}</Text>
      {/* <Button
        size="tiny"
        appearance="ghost"
        accessoryRight={IconForwardIos}
        // onPress={routeAllHistory}
      >
        <Text status="primary" category="s2">
          {t('viewAll')}
        </Text>
      </Button> */}
    </View>
  );

  const renderFooterArea = () => (
    <Card header={renderTransactionHeader}>
      <View style={{ marginHorizontal: -10, marginVertical: -5 }}>
        {/* {TRANSACTION_HISTORY.map((data) => (
          <HistoryItem data={data} key={data.id} />
        ))} */}
        <Text category="c1" status="basic" style={{ textAlign: 'center' }}>
          No history available
        </Text>
      </View>
    </Card>
  );

  return (
    <Layout level="6" style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 15,
          paddingVertical: 10,
        }}
      >
        <View>
          <Text category="c1">{t('balance')}</Text>
          <Text category="h5" status="primary">
            {isBalanceShown ? `₦ ${walletAmt}` : '₦ xxx,xxx.xx'}
          </Text>
        </View>
        <View>
          <Image
            source={{ uri: userImg }}
            style={{
              height: 60,
              width: 60,
              borderRadius: 30,
              borderWidth: 3,
              borderColor: 'white',
            }}
          />
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <List
          style={{ backgroundColor: 'transparent' }}
          ListHeaderComponent={renderHeaderArea}
          ListFooterComponent={renderFooterArea}
          ListFooterComponentStyle={{ paddingBottom: 10 }}
          horizontal={!IS_PORTRAIT}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </Layout>
  );
}
