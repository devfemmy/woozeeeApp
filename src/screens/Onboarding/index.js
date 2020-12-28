import React, { useContext } from 'react';

import { View } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { BlurView } from 'expo-blur';

// prettier-ignore
import {
  Layout, Button,
} from '@ui-kitten/components';

import { AppSettingsContext } from '~src/contexts';

import { RegularText, BoldText } from '~src/components/CustomTexts';

import OverlayLoader from '~src/components/OverlayLoader';

import BackgroundVideo from '~src/components/BackgroundVideo';

import styles from './styles';

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
            <BoldText category="h1" status="danger">
              Woozeee
            </BoldText>
          </View>
          <View>
            <View style={styles.brandMotto}>
              <BoldText appearance="alternative">Have fun</BoldText>
              <RegularText
                appearance="alternative"
                style={{ marginHorizontal: 10 }}
              >
                |
              </RegularText>
              <BoldText appearance="alternative">Make money</BoldText>
              <RegularText
                appearance="alternative"
                style={{ marginHorizontal: 10 }}
              >
                |
              </RegularText>
              <BoldText appearance="alternative">Give back</BoldText>
            </View>
            <View style={{ paddingBottom: 25 }}>
              <Button
                status="danger"
                accessibilityLiveRegion="assertive"
                accessibilityComponentType="button"
                accessibilityLabel="Proceed"
                onPress={routeAuthentication}
              >
                <RegularText appearance="alternative">Proceed</RegularText>
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
                <BoldText status="danger">Sign in / Sign up</BoldText>
              </Button>
            </View>
          </View>
        </BlurView>
      </SafeAreaView>
    </Layout>
  );
}
