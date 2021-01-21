import React, { useContext, useState } from 'react';

import { View, StyleSheet, Image } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { BlurView } from 'expo-blur';

// prettier-ignore
import {
  Layout, Button, Text,
} from '@ui-kitten/components';

import { LoadingContext, LocaleContext } from '~src/contexts';

import useToast from '~src/hooks/useToast';

import OverlayLoader from '~src/components/OverlayLoader';

import BackgroundVideo from '~src/components/BackgroundVideo';

import { IconVolume } from '~src/components/CustomIcons';

const styles = StyleSheet.create({
  uiContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    minHeight: '100%',
    zIndex: 9,
    padding: 25,
  },
  brandMotto: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingBottom: 25,
  },
});

// eslint-disable-next-line react/prop-types
export default function OnboardingScreen({ navigation }) {
  useToast('Click again to exit');

  const { isLoading } = useContext(LoadingContext);

  const t = useContext(LocaleContext);

  const [isVolumeOpen, setVolumeOpen] = useState(false);

  // eslint-disable-next-line react/prop-types
  const routeLogin = () => navigation.navigate('Login');

  return (
    <Layout level="4" style={{ flex: 1 }}>
      <OverlayLoader isLoading={isLoading} />
      {/* Onboarding screen background video */}
      <BackgroundVideo
        videoUri="https://woozeee-socials-artifacts.s3.eu-central-1.amazonaws.com/app-assets/intro.mp4"
        thumbUri={require('~assets/images/onboarding-video-thumb.jpg')}
        isMuted={!isVolumeOpen}
      />
      <SafeAreaView style={{ flex: 1 }}>
        <BlurView intensity={25} tint="dark" style={styles.uiContainer}>
          <View style={{ marginBottom: 10 }}>
            <Image
              source={require('~assets/images/drawable/logo.png')}
              resizeMode="contain"
              style={{ width: 280 }}
            />
          </View>
          <View>
            <View style={styles.brandMotto}>
              <Text category="h6" status="control">
                {t('haveFun')}
              </Text>
              <Text status="control" style={{ marginHorizontal: 10 }}>
                |
              </Text>
              <Text category="h6" status="control">
                {t('makeMoney')}
              </Text>
              <Text status="control" style={{ marginHorizontal: 10 }}>
                |
              </Text>
              <Text category="h6" status="control">
                {t('giveBack')}
              </Text>
            </View>
            <View style={{ paddingBottom: 25 }}>
              <Button
                status="danger"
                accessibilityLiveRegion="assertive"
                accessibilityComponentType="button"
                accessibilityHint="Sign in or Sign up"
                onPress={routeLogin}
              >
                <Text status="control">
                  {` ${t('signIn')} / ${t('signUp')}`}
                </Text>
              </Button>
            </View>
            <View style={{ paddingBottom: 25, alignItems: 'center' }}>
              <Button
                style={{ borderRadius: 100 }}
                appearance="outline"
                status="danger"
                size="large"
                accessibilityLiveRegion="polite"
                accessibilityComponentType="button"
                accessibilityHint="Volume Toggle"
                accessoryLeft={(evaProps) => (
                  /* eslint-disable-next-line react/jsx-props-no-spreading */
                  <IconVolume {...evaProps} isOpen={isVolumeOpen} />
                )}
                onPress={() => setVolumeOpen((prevState) => !prevState)}
              />
            </View>
          </View>
        </BlurView>
      </SafeAreaView>
    </Layout>
  );
}
