import React, { useContext, useState } from 'react';

import {
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

// prettier-ignore
import {
  Layout, Text, Button, List,
} from '@ui-kitten/components';

import Moment from 'react-moment';

import { LoadingContext } from '~src/contexts';

import TopNavigationArea from '~src/components/TopNavigationArea';

import OverlayLoader from '~src/components/OverlayLoader';

import { IconHeart, IconBookmark, IconGrid } from '~src/components/CustomIcons';

/* DATA */

// eslint-disable-next-line react/prop-types
export default function Profile({ navigation }) {
  const { width, height } = useWindowDimensions();

  const isPortrait = height > width;

  const { isLoading } = useContext(LoadingContext);

  const [activeTab, setActiveTab] = useState(0);

  const updateTab = (index) => setActiveTab(index);

  return (
    <Layout level="4" style={{ flex: 1 }}>
      <OverlayLoader isLoading={isLoading} />
      <SafeAreaView style={{ flex: 1 }}>
        <TopNavigationArea
          title="woozeee"
          navigation={navigation}
          icon="logout"
          screen="profile"
        />
        <View>
          <View
            style={{
              alignItems: 'center',
              paddingHorizontal: 20,
              marginBottom: 20,
            }}
          >
            <View style={{ marginBottom: 10, position: 'relative' }}>
              <Image
                source={require('~assets/images/user/user2.png')}
                style={{
                  height: 100,
                  width: 100,
                  borderRadius: 100,
                  borderWidth: 3,
                  borderColor: 'white',
                }}
              />
              <Image
                source={require('~assets/images/icon/verified.png')}
                style={{
                  height: 20,
                  width: 20,
                  borderRadius: 100,
                  position: 'absolute',
                  right: 7,
                  bottom: 7,
                }}
              />
            </View>
            <View style={{ marginBottom: 20, alignItems: 'center' }}>
              <Text category="h5" style={{ marginBottom: 5 }}>
                Bukola Daniel
              </Text>
              <Text category="p2" appearance="hint">
                @Bukka101Official
              </Text>
            </View>
            <View
              style={{
                maxWidth: 300,
                marginBottom: 20,
              }}
            >
              <Text
                category="c2"
                style={{
                  textAlign: 'center',
                  lineHeight: 15,
                }}
              >
                Content writer with beautiful aesthetics, Face of woozeee (It
                seems).
              </Text>
            </View>
            <View style={{ marginBottom: 20 }}>
              <Button status="primary" size="small">
                <Text status="control" category="p2">
                  Edit Profile
                </Text>
              </Button>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <View style={{ alignItems: 'center' }}>
                <Text category="h6" style={{ marginBottom: 5 }}>
                  1.2m
                </Text>
                <Text category="p2" appearance="hint">
                  Videos
                </Text>
              </View>
              <View style={{ alignItems: 'center' }}>
                <Text category="h6" style={{ marginBottom: 5 }}>
                  12.3K
                </Text>
                <Text category="p2" appearance="hint">
                  Followers
                </Text>
              </View>
              <View style={{ alignItems: 'center' }}>
                <Text category="h6" style={{ marginBottom: 5 }}>
                  1.9k
                </Text>
                <Text category="p2" appearance="hint">
                  Following
                </Text>
              </View>
            </View>
          </View>
          <Layout level="2" style={{ paddingHorizontal: 20 }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <Button
                appearance="ghost"
                status={activeTab === 0 ? 'primary' : 'basic'}
                size="large"
                accessibilityLabel="All"
                accessibilityLiveRegion="polite"
                accessoryLeft={IconGrid}
                onPress={() => updateTab(0)}
              />
              <Button
                appearance="ghost"
                status={activeTab === 1 ? 'primary' : 'basic'}
                size="large"
                accessibilityLabel="All"
                accessibilityLiveRegion="polite"
                accessoryLeft={IconBookmark}
                onPress={() => updateTab(1)}
              />
              <Button
                appearance="ghost"
                status={activeTab === 2 ? 'primary' : 'basic'}
                size="large"
                accessibilityLabel="All"
                accessibilityLiveRegion="polite"
                accessoryLeft={IconHeart}
                onPress={() => updateTab(2)}
              />
            </View>
          </Layout>
        </View>
      </SafeAreaView>
    </Layout>
  );
}
