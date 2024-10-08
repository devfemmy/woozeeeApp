import React, { useRef, useState, useContext, useCallback } from 'react';

import {
  Layout,
  Text,
  Datepicker,
  Button,
  Modal,
  Divider,
  Radio,
  RadioGroup,
  Toggle,
  CheckBox,
} from '@ui-kitten/components';

import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';

import { v4 as uuidv4 } from 'uuid';

import SliderScreen from '../../../../../../components/RangeSlider/screens/Slider/index';

import TopNavigationArea from 'src/components/TopNavigationArea/index';

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

import insurance from '../../../../../../assets/images/moneyMatters/insurance.png';

import fixedDeposit from '../../../../../../assets/images/moneyMatters/fixedDeposit.png';

import mutual from '../../../../../../assets/images/moneyMatters/mutual.png';

import loan from '../../../../../../assets/images/moneyMatters/loan.png';

import savings from '../../../../../../assets/images/moneyMatters/savings.png';

import lapo from '../../../../../../assets/images/moneyMatters/lapo.png';

import lapoBig from '../../../../../../assets/images/moneyMatters/lapoBig.png';

import numberWithCommas from '../../../../../../constants/numberWithCommas';

import zed from '../../../../../../assets/images/moneyMatters/zed.png';

import reho from '../../../../../../assets/images/moneyMatters/reho.png';

import fina from '../../../../../../assets/images/moneyMatters/fina.png';
import Thumb from 'src/components/RangeSlider/Slider/Thumb';
import Rail from 'src/components/RangeSlider/Slider/Rail';
import RailSelected from 'src/components/RangeSlider/Slider/RailSelected';
import Label from 'src/components/RangeSlider/Slider/Label';
import Notch from 'src/components/RangeSlider/Slider/Notch';

const SearchResults = (props) => {
  const { appState } = useContext(AppSettingsContext);

  console.log('props =>', props.route.params[3]);

  let _services = props?.route?.params[0];

  let _serviceAmount = props?.route?.params[1];

  let _durations = props?.route?.params[2].duration;

  let _title = props?.route?.params[3];

  const [_serviceInterest, _setServiceInterest] = useState(null);

  const [_serviceDuration, _setServiceDuration] = useState(null);

  const [isAsc, setIsAsc] = useState(true);
  // console.log('loans', props.route.params);

  const BG_THEME = appState.darkMode ? '#070A0F' : '#F7F9FC';

  const sheetRef = useRef(null);

  const sortSheetRef = useRef(null);

  const filterSheetRef = useRef(null);

  const t = useContext(LocaleContext);

  const [selectedIndex, setSelectedIndex] = useState(0);

  const [selectedService, setSelectedService] = useState([]);

  // const services = [
  //   "lapo"={
  //     img: lapo,
  //     interestRate: '4',
  //     amount: '104,000',
  //     level: 'LOWEST INTEREST',
  //   },
  //   "zed"={
  //     img: zed,
  //     interestRate: '10',
  //     amount: '110,000',
  //     level: '2ND LOWEST INTEREST',
  //   },
  //   "reho"={
  //     img: reho,
  //     interestRate: '15',
  //     amount: '115,000',
  //     level: '3RD LOWEST INTEREST',
  //   },
  //   "fina"={
  //     img: fina,
  //     interestRate: '18',
  //     amount: '118,000',
  //     level: '4TH LOWEST INTEREST',
  //   },
  // ];

  const selectOption = (option) => {
    // console.log('options', option);
    setSelectedService(option);
    _setServiceInterest(option.interest);
    _setServiceDuration(option.tenorTo);
    sheetRef.current.open();
  };

  // console.log('selectedservice is => ', selectedService);

  const routeAddInfo = () => {
    sheetRef.current.close();
    props.navigation.navigate('AdditionalInfo', {
      serviceType: { _title },
      amount: _serviceAmount,
      offerId: selectedService._id,
      from: selectedService.scheme_title,
      provider: selectedService.scheme,
      fromImg: selectedService,
      customerName: 'Adeniyi Emmanuel',
      bankImg: lapo,
      accountNumber: '0167906059',
    });
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
            {_title} Details
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
              {_title} amount:
            </Text>
            <Text category="h6" status="basic">
              ₦{numberWithCommas(_serviceAmount)}.00
            </Text>
          </View>
        </View>
        <View>
          <Layout
            level="1"
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderRadius: 5,
              height: 100,
              padding: 15,
              marginHorizontal: 10,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowOpacity: 0.05,
              shadowRadius: 3,
              elevation: 2,
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
                  color="rgba(0,0,0,.8)"
                  style={{ marginRight: 5 }}
                />
                <Text category="c1" status="basic">
                  {_title} Duration
                </Text>
              </View>
              <Text
                category="h6"
                style={{
                  // color: 'rgba(0,0,0,.8)',
                  marginVertical: 10,
                  marginLeft: 25,
                }}
                status="basic"
              >
                {_serviceDuration} Days
              </Text>
            </View>
            <View style={{ marginRight: 10 }}>
              <Entypo
                name="flow-line"
                size={24}
                color="rgba(0,0,0,.8)"
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
                  color="rgba(0,0,0,.7)"
                  style={{ marginRight: 5 }}
                />
                <Text category="c1" status="basic">
                  Interest Rate
                </Text>
              </View>
              <Text
                category="h6"
                status="basic"
                style={{
                  marginVertical: 10,
                  marginLeft: 25,
                  // color: 'rgba(0,0,0,.8)',
                }}
              >
                {_serviceInterest}%
              </Text>
            </View>
          </Layout>
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
            ₦
            {numberWithCommas(
              (_serviceInterest / 100) * _serviceAmount + +_serviceAmount,
            )}
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
          >
            <Text status="control">
              {_title === 'Savings' ? 'Set Savings' : 'Get Loan'}
            </Text>
          </Button>
        </View>
      </View>
    );
  };

  const handleSort = (option) => {
    setSelectedIndex(option);
    if (option !== 0) {
      setIsAsc(false);
    } else {
      setIsAsc(true);
    }
    console.log(isAsc);
  };

  const SortContent = () => {
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
            Sort By
          </Text>
          <Feather
            name="x"
            size={24}
            color="#2E5894"
            onPress={() => sortSheetRef.current.close()}
          />
        </View>
        <View
          style={{
            paddingVertical: 30,
            paddingHorizontal: 20,
          }}
        >
          <RadioGroup
            selectedIndex={selectedIndex}
            onChange={(index) => handleSort(index)}
          >
            <Radio>Low to High Interest</Radio>
            <Divider />
            <Radio>High to Low Interest</Radio>
          </RadioGroup>
          <Button
            status="danger"
            size="large"
            accessibilityLiveRegion="assertive"
            accessibilityComponentType="button"
            accessibilityLabel="Continue"
            // disabled={isLoading}
            // onPress={routeAddInfo}
            style={{
              marginTop: 30,
            }}
          >
            <Text status="control">
              {_title === 'Savings' ? 'Set Savings' : 'Get Loan'}
            </Text>
          </Button>
        </View>
      </View>
    );
  };

  let banks = [
    {
      id: 1,
      title: 'Accion Microfinance Bank',
    },
    { id: 2, title: 'Asset Matrix Microfinance bank' },
    { id: 3, title: 'Altitude Microfinnace Bank' },
    { id: 4, title: 'FBN Microfinance Bank' },
    { id: 5, title: 'Fina Trust Microfinance Bank' },
    { id: 6, title: 'Rehoboth Microfinance Bank' },
    { id: 7, title: 'Lapo Micorfinance Bank' },
    { id: 8, title: 'Zedvance Microfinance Bank' },
    { id: 9, title: 'Zedvance Microfinance Bank' },
  ];

  const FilterContent = () => {
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
            // marginHorizontal: 20,
            marginVertical: 15,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Text category="h6" status="primary">
            Filters
          </Text>
          <Feather
            name="x"
            size={24}
            color="#2E5894"
            onPress={() => filterSheetRef.current.close()}
          />
        </View>
        <View
          style={{
            paddingVertical: 30,
            paddingHorizontal: 10,
          }}
        >
          <Text category="h6" status="primary">
            Interest Rate
          </Text>

          {/* range slider here */}
          <SliderScreen />

          <Divider style={{ marginTop: 20 }} />
          <Text category="h6" status="primary" style={{ marginTop: 20 }}>
            Repayment Flexibility
          </Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 20,
            }}
          >
            <Text status="basic" style={{ fontSize: 12 }}>
              Only shows offers with repayment flexibilty
            </Text>
            <Toggle />
          </View>
          <Divider style={{ marginTop: 20 }} />
          <Text category="h6" status="primary" style={{ marginTop: 20 }}>
            Microfinance Banks
          </Text>
          {banks.map((bank, index) => (
            <View
              style={{
                display: 'flex',
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginVertical: 15,
              }}
              key={index}
            >
              <Text status="basic">{bank.title}</Text>
              <CheckBox
                status="basic"
                checked={false}
                // onChange={(nextChecked) => {
                //   setChecked(nextChecked);
                // }}
                // style={styles.checkbox}
              />
            </View>
          ))}
          <View
            style={{
              display: 'flex',
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              alignItems: 'center',
              marginBottom: 30,
            }}
          >
            <Button
              appearance="outline"
              status="danger"
              size="large"
              accessibilityLiveRegion="assertive"
              accessibilityComponentType="button"
              accessibilityLabel="Continue"
              // disabled={isLoading}
              // onPress={routeAddInfo}
              style={{
                marginTop: 30,
              }}
            >
              <Text status="control">{'Cancel'}</Text>
            </Button>
            <Button
              status="success"
              size="large"
              accessibilityLiveRegion="assertive"
              accessibilityComponentType="button"
              accessibilityLabel="Continue"
              // disabled={isLoading}
              // onPress={routeAddInfo}
              style={{
                marginTop: 30,
              }}
            >
              <Text status="control">{t('confirm')}</Text>
            </Button>
          </View>
        </View>
      </View>
    );
  };

  const LoanOptions = ({ img, interestRate, amount, level, duration, id }) => {
    return (
      <View
        style={{
          display: 'flex',
          marginVertical: 10,
        }}
      >
        <Layout
          level="1"
          style={{
            flex: 1,
            padding: 15,
            borderRadius: 5,
            justifyContent: 'center',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 0.05,
            shadowRadius: 3,
            elevation: 2,
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
            {id == 0 ? (
              <Text category="c2" style={{ color: '#27D0AD' }}>
                {level}
              </Text>
            ) : (
              <Text category="c2" style={{ color: '#27D0AD' }}>
                OTHER INTEREST
              </Text>
            )}

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
                color="rgba(0,0,0,.8)"
                style={{ marginHorizontal: 5 }}
              />
              <Text category="c1" status="basic">
                {duration} days
              </Text>
            </View>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 5,
            }}
          >
            <Image source={img} resizeMode="contain" />
            <Text category="c2" style={{ color: 'red' }}>
              {`+${interestRate}% Interest`}
            </Text>
            <Text
              category="h5"
              status="basic"
              // style={{
              //   color: 'rgba(255,255,255,.6)',
              // }}
            >
              {`₦${amount}`}
            </Text>
          </View>
        </Layout>
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
        <Text category="h5" status="basic" style={{ marginBottom: 3 }}>
          ₦{numberWithCommas(_serviceAmount)}
        </Text>
        <Text category="c1" status="basic">
          {_title} Options
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
            <TouchableOpacity
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
              onPress={() => sortSheetRef.current.open()}
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
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => filterSheetRef.current.open()}>
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
          {_title === 'Loans' ? (
            <Text category="c1" style={{ marginLeft: 5, color: '#B98E02' }}>
              The accumulated Loan amount would be deducted from your account in
              the event of default.
            </Text>
          ) : (
            <Text category="c1" style={{ marginLeft: 5, color: '#B98E02' }}>
              The accumulated Savings amount would be added to your account in
              the event of default.
            </Text>
          )}
        </View>
        {/* {console.log('services result => ', _services)} */}
        {_services
          .sort((i, j) => i.interest - j.interest)
          .filter((service) => +_durations[0] * 10 <= service.tenorTo)
          .map((service, index) => (
            <TouchableOpacity
              key={uuidv4()}
              onPress={() => selectOption(service)}
            >
              <LoanOptions
                img={lapo}
                amount={numberWithCommas(
                  (service.interest / 100) * _serviceAmount + +_serviceAmount,
                )}
                level={'LOWEST INTEREST'}
                interestRate={service.interest}
                duration={service.tenorTo}
                id={index}
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
          <ModalContent />
        </Layout>
      </RBSheet>
      <RBSheet
        ref={sortSheetRef}
        height={300}
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
          <SortContent />
        </Layout>
      </RBSheet>
      <RBSheet
        ref={filterSheetRef}
        height={700}
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
          <ScrollView
            vertical
            showsVerticalScrollIndicator={false}
            always
            showsHorizontalScrollIndicator={false}
            constentContainerStyle={{
              display: 'flex',
              flex: 1,
              justifyContent: 'flex-end',
            }}
            style={{
              paddingHorizontal: 10,
              flexDirection: 'column',
            }}
          >
            <FilterContent />
          </ScrollView>
        </Layout>
      </RBSheet>
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
