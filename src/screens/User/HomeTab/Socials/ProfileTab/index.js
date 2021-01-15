import React, { useContext } from 'react';

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

/* DATA */

// eslint-disable-next-line react/prop-types
export default function Profile({ navigation }) {
  const { width } = useWindowDimensions();

  const { isLoading } = useContext(LoadingContext);

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
          <View style={{ alignItems: 'center' }}>
            <View style={{ marginBottom: 10 }}>
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
            <View>
              <Button status="primary">
                <Text status="control">Edit Profile</Text>
              </Button>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </Layout>
  );
}
