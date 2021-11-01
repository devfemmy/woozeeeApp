import React, { useState, useEffect, useMemo, useRef } from 'react';

import {
  Layout,
  Text,
  Datepicker,
  Button,
  Divider,
  Spinner,
} from '@ui-kitten/components';

import { Image, StyleSheet, TextInput, View } from 'react-native';

import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

import SwipeAds from 'src/components/SwipeAds/index';
import ad1 from '../../../../../../assets/images/clickNshop/ad1.png';
import ad2 from '../../../../../../assets/images/clickNshop/ad2.png';
import ad3 from '../../../../../../assets/images/clickNshop/ad3.png';

const ClickNShop = ({ route, navigation }) => {
  const scrollRef = useRef(null);
  const [isDown, setIsDown] = useState(true);
  const [scrollHeight, setScrollHeight] = useState(0);

  return useMemo(
    () => (
      <Layout level="6" style={{ flex: 1 }}>
        <ScrollView
          ref={scrollRef}
          onScroll={({ nativeEvent }) => {
            if (isCloseToBottom(nativeEvent)) {
              setIsDown(false);
            } else setIsDown(true);
          }}
          onContentSizeChange={(_, height) => setScrollHeight(height)}
          scrollEventThrottle={400}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <SwipeAds ads={[ad1, ad2, ad3]} />
        </ScrollView>
      </Layout>
    ),
    [route, navigation],
  );
};
const styles = StyleSheet.create({});

export default ClickNShop;
