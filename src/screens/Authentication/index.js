import React, { useContext, useState, useEffect } from 'react';

import { View, StyleSheet, Image } from 'react-native';

// prettier-ignore
import {
  Layout, Button, Text,
} from '@ui-kitten/components';

import { LoadingContext, LocaleContext } from '~src/contexts';

import useToast from '~src/hooks/useToast';

import OverlayLoader from '~src/components/OverlayLoader';

import BackgroundVideo from '~src/components/BackgroundVideo';

import useAudioPlayer from '~src/hooks/useAudioPlayer';

import { IconVolume } from '~src/components/CustomIcons';

const styles = StyleSheet.create({
  uiContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 9,
    padding: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
  },
  brandMotto: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 25,
  },
});

// eslint-disable-next-line react/prop-types
export default function OnboardingScreen({ navigation }) {
  useToast('Click again to exit');

  const { isLoading } = useContext(LoadingContext);

  const t = useContext(LocaleContext);

  const [isVolumeOpen, setVolumeOpen] = useState(true);

  const soundObj = useAudioPlayer(
    require('~assets/audio/woozeee_Instrumental.mp3'),
    isVolumeOpen,
  );

  useEffect(
    () => () => {
      (async () => {
        try {
          await soundObj.unloadAsync();
        } catch (e) {
          const msg = e;
        }
      })();
    },
    [soundObj],
  );

  const handleAudioMute = async () => {
    try {
      setVolumeOpen((prevState) => !prevState);
      await soundObj.setIsMutedAsync(isVolumeOpen);
    } catch (e) {
      const msg = e;
    }
  };

  // eslint-disable-next-line react/prop-types
  const routeLogin = () => navigation.navigate('Login');

  return (
    <Layout level="4" style={{ flex: 1 }}>
      <OverlayLoader isLoading={isLoading} />
      {/* Onboarding screen background video */}
      <BackgroundVideo
        videoUri="https://woozeee-socials-artifacts.s3.eu-central-1.amazonaws.com/app-assets/intro.mp4"
        thumbUri={require('~assets/images/banner/onboarding-video-thumb.jpg')}
        isMuted
      />
      <View style={styles.uiContainer}>
        <View style={{ alignSelf: 'flex-end' }}>
          <Button
            appearance="ghost"
            size="tiny"
            accessibilityLiveRegion="polite"
            accessibilityComponentType="button"
            accessibilityHint="Volume Toggle"
            accessoryLeft={(evaProps) => (
              <IconVolume
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...evaProps}
                height={32}
                width={32}
                isOpen={isVolumeOpen}
              />
            )}
            onPress={handleAudioMute}
          />
        </View>
        <View style={{ alignItems: 'center', paddingBottom: 50 }}>
          <View style={{ marginBottom: 10 }}>
            <Image
              source={require('~assets/images/drawable/logo.png')}
              resizeMode="contain"
              style={{ maxWidth: 200 }}
            />
          </View>
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
          <View style={{ minWidth: '100%' }}>
            <Button
              status="danger"
              accessibilityLiveRegion="assertive"
              accessibilityComponentType="button"
              accessibilityHint="Sign in or Sign up"
              onPress={routeLogin}
            >
              <Text status="control">{` ${t('signIn')} / ${t('signUp')}`}</Text>
            </Button>
          </View>
        </View>
      </View>
    </Layout>
  );
}
