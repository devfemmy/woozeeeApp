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

import { Toast, Content, Root } from 'native-base';

import FillCardProcess from './FillCardProcess';

function FillCardDetails(props) {
  const routeConfirm = () => {
    console.log(props);
    props.navigation.navigate('MoneyMattersConfirmation');
  };

  const t = useContext(LocaleContext);

  return (
    <Layout level="6" style={{ flex: 1 }}>
      <TopNavigationArea
        title={'Transfer Money'}
        navigation={props.navigation}
        screen="default"
      />

      <FillCardProcess />

      <View
        style={{
          marginVertical: 30,
          width: '100%',
          paddingHorizontal: 15,
        }}
      >
        <Button
          status="primary"
          accessibilityLiveRegion="assertive"
          accessibilityComponentType="button"
          accessibilityLabel="Continue"
          style={{ width: '100%' }}
          onPress={routeConfirm}
        >
          <Text status="control">{t('proceed')}</Text>
        </Button>
      </View>
    </Layout>
  );
}

export default FillCardDetails;
