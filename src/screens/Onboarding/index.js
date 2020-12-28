import React, { useContext } from 'react';

import { View, StyleSheet } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { BlurView } from 'expo-blur';

// prettier-ignore
import {
  Layout, Button, Text,
} from '@ui-kitten/components';

import { AppSettingsContext } from '~src/contexts';

import OverlayLoader from '~src/components/OverlayLoader';

import BackgroundVideo from '~src/components/BackgroundVideo';

const styles = StyleSheet.create({
  uiContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: '100%',
    zIndex: 9,
    paddingVertical: 25,
  },
  brandMotto: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 25,
  },
});

// eslint-disable-next-line react/prop-types
export default function OnboardingScreen({ navigation }) {
  const { isLoading } = useContext(AppSettingsContext);
  // eslint-disable-next-line react/prop-types
  const routeAuthentication = () => navigation.navigate('Authentication');

  return (
    <Layout level="1" style={{ flex: 1 }}>
      <OverlayLoader isLoading={isLoading} />
      {/* Onboarding screen background video */}
      <BackgroundVideo
        videoUri={require('~assets/videos/onboarding-bg-video.mp4')}
      />
      <SafeAreaView style={{ flex: 1 }}>
        <BlurView intensity={15} tint="dark" style={styles.uiContainer}>
          <View>
            <Text category="h1" status="danger">
              Woozeee
            </Text>
          </View>
          <View>
            <View style={styles.brandMotto}>
              <Text category="h6" appearance="alternative">
                Have fun
              </Text>
              <Text appearance="alternative" style={{ marginHorizontal: 10 }}>
                |
              </Text>
              <Text category="h6" appearance="alternative">
                Make money
              </Text>
              <Text appearance="alternative" style={{ marginHorizontal: 10 }}>
                |
              </Text>
              <Text category="h6" appearance="alternative">
                Give back
              </Text>
            </View>
            <View style={{ paddingBottom: 25 }}>
              <Button
                status="danger"
                accessibilityLiveRegion="assertive"
                accessibilityComponentType="button"
                accessibilityLabel="Proceed"
                onPress={routeAuthentication}
              >
                <Text style={{ color: 'white' }}>Proceed</Text>
              </Button>
            </View>
            <View style={{ paddingBottom: 25, alignItems: 'center' }}>
              <Button
                appearance="ghost"
                size="small"
                accessibilityLiveRegion="polite"
                accessibilityComponentType="button"
                accessibilityHint="Sign in or Sign up"
                onPress={routeAuthentication}
              >
                <Text category="h6" status="danger">
                  Sign in / Sign up
                </Text>
              </Button>
            </View>
          </View>
        </BlurView>
      </SafeAreaView>
    </Layout>
  );
}
