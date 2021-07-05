import React, { useRef, useState, useContext } from 'react';

import {
  Layout,
  Text,
  Datepicker,
  Button,
  Modal,
  Divider,
} from '@ui-kitten/components';

import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';

import { v4 as uuidv4 } from 'uuid';

import TopNavigationArea from 'src/components/TopNavigationArea/index';

import { ScrollView } from 'react-native-gesture-handler';

import {
  AntDesign,
  Fontisto,
  MaterialCommunityIcons,
  Feather,
  Entypo,
  EvilIcons,
} from '@expo/vector-icons';

import RBSheet from 'react-native-raw-bottom-sheet';

import { LocaleContext, AppSettingsContext } from 'src/contexts';

import insurance from '../../../../../../../assets/images/moneyMatters/insurance.png';

import fixedDeposit from '../../../../../../..//assets/images/moneyMatters/fixedDeposit.png';

import mutual from '../../../../../../../assets/images/moneyMatters/mutual.png';

import loan from '../../../../../../../assets/images/moneyMatters/loan.png';

import savings from '../../../../../../../assets/images/moneyMatters/savings.png';

import lapo from '../../../../../../../assets/images/moneyMatters/lapo.png';

import lapoBig from '../../../../../../../assets/images/moneyMatters/lapoBig.png';

import zed from '../../../../../../../assets/images/moneyMatters/zed.png';

import reho from '../../../../../../../assets/images/moneyMatters/reho.png';

import fina from '../../../../../../../assets/images/moneyMatters/fina.png';

const SearchResults = (props) => {
  const { appState } = useContext(AppSettingsContext);
  // console.log(props.route.params);

  const BG_THEME = appState.darkMode ? '#070A0F' : '#F7F9FC';

  const sheetRef = useRef(null);

  const t = useContext(LocaleContext);

  const [selectedService, setSelectedService] = useState([]);

  const services = [
    {
      img: lapo,
      interestRate: '4',
      amount: '104,000',
      level: 'LOWEST INTEREST',
    },
    {
      img: zed,
      interestRate: '10',
      amount: '110,000',
      level: '2ND LOWEST INTEREST',
    },
    {
      img: reho,
      interestRate: '15',
      amount: '115,000',
      level: '3RD LOWEST INTEREST',
    },
    {
      img: fina,
      interestRate: '18',
      amount: '118,000',
      level: '4TH LOWEST INTEREST',
    },
  ];

  const selectOption = (option) => {
    setSelectedService(option);
    sheetRef.current.open();
  };

  const routeAddInfo = () => {
    sheetRef.current.close();
    props.navigation.navigate('AdditionalInfo');
  };

  const ModalContent = () => {
    return (
      <View
        style={{
          height: '100%',
        }}
      >
        <View
          style={{
            borderTopRightRadius: 5,
            borderTopLeftRadius: 5,
            marginHorizontal: 20,
            // marginVertical: 15,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Text category="h6" status="primary">
            Loan Details
          </Text>
          <Feather
            name="x"
            size={24}
            color="#2E5894"
            onPress={() => sheetRef.current.close()}
          />
        </View>
        <View
          style={{
            marginHorizontal: 15,
            marginVertical: 15,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Image
            source={lapoBig}
            resizeMode="contain"
            style={{ backgroundColor: 'transparent' }}
          />
          <View
            style={{
              marginHorizontal: 15,
              marginVertical: 15,
              alignItems: 'flex-end',
            }}
          >
            <Text
              status="primary"
              style={{
                fontSize: 10,
                marginBottom: 5,
              }}
            >
              Loan amount:
            </Text>
            <Text category="h6" status="basic">
              ₦100,000.00
            </Text>
          </View>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderRadius: 5,
            backgroundColor: 'white',
            height: 100,
            padding: 15,
            marginHorizontal: 10,
            elevation: 5,
            shadowColor: '#dcdcdc',
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 1,
            shadowRadius: 1,
          }}
        >
          <View style={{ marginRight: 30 }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <EvilIcons
                name="clock"
                size={20}
                color="rgba(0,0,0,.5)"
                style={{ marginRight: 5 }}
              />
              <Text category="c1" style={{ color: 'rgba(0,0,0,.8)' }}>
                Loan Duration
              </Text>
            </View>
            <Text
              category="h6"
              style={{
                color: 'rgba(0,0,0,.8)',
                marginVertical: 10,
                marginLeft: 25,
              }}
            >
              30 Days
            </Text>
          </View>
          <View style={{ marginRight: 10 }}>
            <Entypo
              name="flow-line"
              size={24}
              color="rgba(0,0,0,.5)"
              //   style={{ marginHorizontal: 10 }}
            />
          </View>
          <View style={{ marginRight: 30 }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <MaterialCommunityIcons
                name="transfer-up"
                size={18}
                color="rgba(0,0,0,.5)"
                style={{ marginRight: 5 }}
              />
              <Text category="c1" style={{ color: 'rgba(0,0,0,.8)' }}>
                Interest Rate
              </Text>
            </View>
            <Text
              category="h6"
              status="basic"
              style={{
                marginVertical: 10,
                marginLeft: 25,
                color: 'rgba(0,0,0,.8)',
              }}
            >
              4%
            </Text>
          </View>
        </View>
        <View
          style={{
            paddingHorizontal: 25,
            marginVertical: 15,
            alignItems: 'flex-end',
          }}
        >
          <Text
            status="primary"
            style={{
              fontSize: 10,
              marginBottom: 5,
            }}
          >
            Repayment amount:
          </Text>
          <Text category="h5" status="primary">
            ₦104,000.00
          </Text>
        </View>
        <View
          style={{
            paddingVertical: 10,
            paddingHorizontal: 10,
          }}
        >
          <Button
            status="danger"
            size="large"
            accessibilityLiveRegion="assertive"
            accessibilityComponentType="button"
            accessibilityLabel="Continue"
            // disabled={isLoading}
            onPress={routeAddInfo}
            style={{
              elevation: 5,
              shadowColor: '#dcdcdc',
              shadowOffset: { width: 0, height: 3 },
              shadowOpacity: 1,
              shadowRadius: 1,
            }}
          >
            <Text status="control">{'Get Loan'}</Text>
          </Button>
        </View>
      </View>
    );
  };
  //   <MaterialCommunityIcons name="transfer-up" size={24} color="black" />

  const LoanOptions = ({ img, interestRate, amount, level }) => {
    return (
      <View
        style={{
          display: 'flex',
          borderRadius: 5,
          justifyContent: 'center',
          backgroundColor: 'white',
          height: 120,
          padding: 15,
          marginVertical: 10,
          elevation: 5,
          shadowColor: '#dcdcdc',
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 1,
          shadowRadius: 1,
        }}
      >
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 20,
          }}
        >
          <Text category="c2" style={{ color: '#27D0AD' }}>
            {level}
          </Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <MaterialCommunityIcons
              name="clock-time-nine-outline"
              size={13}
              color="rgba(0,0,0,.4)"
              style={{ marginHorizontal: 5 }}
            />
            <Text category="c1" status="primary">
              30 days
            </Text>
          </View>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Image source={img} resizeMode="contain" />
          <Text category="c2" style={{ color: 'red' }}>
            {`+${interestRate}% Interest`}
          </Text>
          <Text
            category="h5"
            style={{
              color: 'rgba(0,0,0,.6)',
            }}
          >
            {`₦${amount}`}
          </Text>
        </View>
      </View>
    );
  };

  const HeaderContent = ({ amount, duration }) => {
    return (
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          textAlign: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text category="h5" status="basic" style={{ marginBottom: 5 }}>
          ₦100,000.00
        </Text>
        <Text category="c1" status="basic" style={{ marginBottom: 5 }}>
          Fri, 25th Feb 2021 - Sat, 26th Mar 2021
        </Text>
      </View>
    );
  };

  return (
    <Layout level="6" style={{ flex: 1 }}>
      <TopNavigationArea
        title={<HeaderContent />}
        navigation={props.navigation}
        screen="auth"
      />
      <ScrollView style={styles.container}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginHorizontal: 10,
          }}
          //   onPress={() => navigation.navigate('MoneyMattersServices')}
        >
          <View
            style={{
              display: 'flex',
            }}
          >
            <Text category="c1" status="basic" style={{ marginBottom: 5 }}>
              Sorted by
            </Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Text category="c2" status="basic">
                Low to High Interest
              </Text>
              <AntDesign
                name="down"
                size={14}
                color="#043F7C"
                style={{ marginHorizontal: 5 }}
              />
            </View>
          </View>
          <TouchableOpacity>
            <Fontisto
              name="equalizer"
              size={18}
              color="#043F7C"
              fontWeight="bold"
              style={{ marginTop: 3, marginHorizontal: 5 }}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            backgroundColor: '#FFFBE6',
            borderRadius: 5,
            marginHorizontal: 5,
            marginVertical: 15,
            borderWidth: 1,
            borderColor: '#B98E02',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 10,
            paddingVertical: 15,
          }}
        >
          <MaterialCommunityIcons
            name="information"
            size={24}
            color="#B98E02"
          />
          <Text category="c1" style={{ marginLeft: 5, color: '#B98E02' }}>
            The accumulated Loan amount would be deducted from your account in
            the event of default.
          </Text>
        </View>
        {services.map((service) => (
          <TouchableOpacity
            key={uuidv4()}
            onPress={() => selectOption(service)}
          >
            <LoanOptions
              img={service.img}
              amount={service.amount}
              level={service.level}
              interestRate={service.interestRate}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
      <RBSheet
        ref={sheetRef}
        height={450}
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
            // paddingBottom: 30,
          }}
        >
          <View
            style={{
              width: '100%',
              justifyContent: 'flex-start',
              // paddingBottom: 25,
              paddingHorizontal: 20,
            }}
          ></View>
          {/* <View style={{ paddingHorizontal: 20 }}></View> */}
          {/* <View
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
              onPress={() => sheetRef.current.close()}
            >
              <Text status="control">{t('done')}</Text>
            </Button>
          </View> */}
          <ModalContent />
        </Layout>
      </RBSheet>
      {/* <RBSheet
        ref={sheetRef}
        height={450}
        closeOnDragDown
        animationType="fade"
        customStyles={{
          container: {
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'transparent',
          },
        }}
      >
        <Layout
          level="5"
          style={{
            flex: 1,
            width: '100%',
          }}
        >
          <ModalContent />
        </Layout>
      </RBSheet> */}
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  cardContainer: {},
});
export default SearchResults;
