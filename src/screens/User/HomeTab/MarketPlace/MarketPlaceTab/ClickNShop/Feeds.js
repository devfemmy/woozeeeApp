import React, { useState, useEffect, useMemo } from 'react';

import {
  Layout,
  Text,
  Datepicker,
  Button,
  Divider,
  Spinner,
} from '@ui-kitten/components';

import { Video } from 'expo-av';

import { GeneralSelect } from 'src/components/FormFields/index';

import { Image, StyleSheet, TextInput, View } from 'react-native';

import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

import Carousel from 'react-native-snap-carousel';

import { v4 as uuidv4 } from 'uuid';

import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

import TopNavigationArea from 'src/components/TopNavigationArea/index';

import { TextIcon } from 'src/components/IconPacks/TextIcon';

const Feeds = ({ route, navigation }) => {
  return useMemo(
    () => (
      <Layout level="6" style={{ flex: 1 }}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <Text>Feeds</Text>
        </ScrollView>
      </Layout>
    ),
    [route, navigation],
  );
};
const styles = StyleSheet.create({});

export default Feeds;
