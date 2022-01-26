// prettier-ignore
import React, {
    useContext, useRef, useCallback, useState, useEffect,
  } from 'react';

import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
} from 'react-native';

// prettier-ignore
import {
    Layout, Text, List, Button,
  } from '@ui-kitten/components';

import RBSheet from 'react-native-raw-bottom-sheet';

import { Entypo } from '@expo/vector-icons';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  LoadingContext,
  LocaleContext,
  AppSettingsContext,
} from 'src/contexts';

import {
  GeneralTextField,
  GeneralRadioGroup,
  GeneralSelect,
  GeneralDatePicker,
} from 'src/components/FormFields';

import TopNavigationActivities from 'src/components/TopNavigationArea';

import StepIndicator from 'react-native-step-indicator';

import CustomStepper from '../../../components/CustomStepper';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  cardContent: {
    height: '100%',
    width: '95%',
    maxWidth: 600,
    position: 'absolute',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function Home({ navigation }) {
  const activityData = [
    {
      time: '10:57 pm',
      activity: 'Verified email address',
    },
    {
      time: '08:22 pm',
      activity: 'Signed up to woozeee',
    },
  ];
  return (
    <Layout level="6" style={{ flex: 1 }}>
      <TopNavigationActivities
        title="Activities"
        navigation={navigation}
        screen="activities"
      />
      <View style={{ flex: 1 }}>
        <ScrollView
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          showVerticalScrollIndicator={false}
          vertical
          contentContainerStyle={{
            // flex: 1,
            padding: 10,
          }}
        >
          <Text category="h6" status="basic">
            Saturday, 10 April
          </Text>

          {activityData.map((item, index) => (
            <CustomStepper
              time={item.time}
              activity={item.activity}
              key={index}
            />
          ))}
        </ScrollView>
      </View>
    </Layout>
  );
}
