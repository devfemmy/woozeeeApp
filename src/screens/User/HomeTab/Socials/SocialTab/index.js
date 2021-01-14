import React, { useState } from 'react';

import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  useWindowDimensions,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

// prettier-ignore
import {
  Layout, Button, Text, OverflowMenu, MenuItem,
} from '@ui-kitten/components';

import useToast from '~src/hooks/useToast';

import BackgroundVideo from '~src/components/BackgroundVideo';

import {
  IconVideo,
  IconMenu,
  IconGift,
  IconMap,
  IconRadio,
  IconHome,
  IconHeart,
  IconShare,
  IconClipboard,
  IconEye,
  IconMsgSquare,
  IconPlayPause,
} from '~src/components/CustomIcons';

const styles = StyleSheet.create({
  uiContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    minHeight: '100%',
    zIndex: 9,
    paddingVertical: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.0125)',
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  interactIcons: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.0125)',
    marginBottom: 5,
  },
});

// eslint-disable-next-line react/prop-types
export default function OnboardingScreen({ navigation }) {
  useToast('Click again to go back');

  const { width, height } = useWindowDimensions();

  const isPortrait = height > width;

  const [isNavigationMenuOpen, setNavigationMenuOpen] = useState(false);

  const toggleMenu = () => setNavigationMenuOpen((prevState) => !prevState);

  // eslint-disable-next-line react/prop-types
  const routeHome = () => navigation.navigate('UserRoute');

  // eslint-disable-next-line react/prop-types
  const routeSocial = () => navigation.navigate('SocialsRoute');

  const NavigationAnchor = () => (
    <View style={styles.interactIcons}>
      <Button
        appearance="ghost"
        status={isPortrait ? 'control' : 'basic'}
        size="large"
        accessibilityLiveRegion="polite"
        accessibilityComponentType="button"
        accessibilityHint="Record"
        accessoryLeft={IconMenu}
        onPress={toggleMenu}
      />
    </View>
  );

  const NavigationMenu = () => (
    <OverflowMenu
      anchor={NavigationAnchor}
      visible={isNavigationMenuOpen}
      onBackdropPress={() => setNavigationMenuOpen(false)}
      backdropStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
      accessibilityLiveRegion="polite"
      accessibilityHint="Extras"
    >
      <MenuItem accessoryLeft={IconHome} title="Home" onPress={routeHome} />
      <MenuItem
        accessoryLeft={IconRadio}
        title="Social"
        onPress={routeSocial}
      />
      <MenuItem accessoryLeft={IconMap} title="Marketplace" />
      <MenuItem accessoryLeft={IconGift} title="Charity" />
    </OverflowMenu>
  );

  return (
    <Layout level="4" style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            paddingTop: 5,
            zIndex: 19,
          }}
        >
          <View>
            <NavigationMenu />
          </View>
          <View style={styles.header}>
            <Text category="label" status="basic">
              Following
            </Text>
            <Text style={{ color: 'white', marginHorizontal: 10 }}>|</Text>
            <Text category="label" status={isPortrait ? 'control' : 'basic'}>
              Versus
            </Text>
          </View>
          <View style={styles.interactIcons}>
            <Button
              appearance="ghost"
              status={isPortrait ? 'control' : 'basic'}
              size="large"
              accessibilityLiveRegion="polite"
              accessibilityComponentType="button"
              accessibilityHint="Record"
              accessoryLeft={(evaProps) => (
                /* eslint-disable-next-line react/jsx-props-no-spreading */
                <IconVideo {...evaProps} isOpen />
              )}
            />
          </View>
        </View>
        <View style={[StyleSheet.absoluteFillObject, { flex: 1, height }]}>
          <BackgroundVideo
            videoUri="https://woozeee-socials-artifacts.s3.eu-central-1.amazonaws.com/app-assets/intro.mp4"
            isMuted
            resizeMode={isPortrait ? 'cover' : 'contain'}
          />
          <View style={styles.uiContainer}>
            <View
              style={{
                width: '100%',
                paddingBottom: 55,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'flex-end',
                  width: '100%',
                  marginBottom: 10,
                }}
              >
                <View style={{ paddingHorizontal: 10 }}>
                  <View style={{ flexDirection: 'row' }}>
                    <Text
                      status="primary"
                      category="h6"
                      style={{ marginRight: 5 }}
                    >
                      Michelle
                    </Text>
                    <Text status="danger" category="h6">
                      Alabi
                    </Text>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <Text
                      status={isPortrait ? 'control' : 'basic'}
                      category="s2"
                      style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.0125)',
                        paddingHorizontal: 5,
                      }}
                    >
                      Animals
                    </Text>
                  </View>
                </View>
                <View style={{ paddingTop: isPortrait ? 0 : 90 }}>
                  <ScrollView
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                  >
                    <View style={styles.interactIcons}>
                      <Button
                        appearance="ghost"
                        status={isPortrait ? 'control' : 'basic'}
                        size="large"
                        accessoryLeft={(evaProps) => (
                          // eslint-disable-next-line react/jsx-props-no-spreading
                          <IconHeart {...evaProps} isLiked={false} />
                        )}
                      />
                      <Text
                        status={isPortrait ? 'control' : 'basic'}
                        category="label"
                      >
                        2.2k
                      </Text>
                    </View>
                    <View style={styles.interactIcons}>
                      <Button
                        appearance="ghost"
                        status={isPortrait ? 'control' : 'basic'}
                        size="large"
                        accessoryLeft={IconMsgSquare}
                      />
                      <Text
                        status={isPortrait ? 'control' : 'basic'}
                        category="label"
                      >
                        7.2k
                      </Text>
                    </View>
                    <View style={styles.interactIcons}>
                      <Button
                        appearance="ghost"
                        status={isPortrait ? 'control' : 'basic'}
                        size="large"
                        accessoryLeft={(evaProps) => (
                          // eslint-disable-next-line react/jsx-props-no-spreading
                          <IconEye {...evaProps} isOpen />
                        )}
                      />
                      <Text
                        status={isPortrait ? 'control' : 'basic'}
                        category="label"
                      >
                        21.2k
                      </Text>
                    </View>
                    <View style={styles.interactIcons}>
                      <Button
                        appearance="ghost"
                        status={isPortrait ? 'control' : 'basic'}
                        size="large"
                        accessoryLeft={IconClipboard}
                      />
                      <Text
                        status={isPortrait ? 'control' : 'basic'}
                        category="label"
                      >
                        4.1k
                      </Text>
                    </View>
                    <View style={styles.interactIcons}>
                      <Button
                        appearance="ghost"
                        status={isPortrait ? 'control' : 'basic'}
                        size="large"
                        accessoryLeft={IconShare}
                      />
                      <Text
                        status={isPortrait ? 'control' : 'basic'}
                        category="label"
                      >
                        12k
                      </Text>
                    </View>
                    <View style={styles.interactIcons}>
                      <Button
                        appearance="ghost"
                        status={isPortrait ? 'control' : 'basic'}
                        size="large"
                        accessoryLeft={(evaProps) => (
                          // eslint-disable-next-line react/jsx-props-no-spreading
                          <IconPlayPause {...evaProps} isPaused={false} />
                        )}
                      />
                      <Text
                        status={isPortrait ? 'control' : 'basic'}
                        category="label"
                      >
                        Pause
                      </Text>
                    </View>
                    <View style={{ alignItems: 'center', marginBottom: 0 }}>
                      <Image
                        source={require('~assets/images/drawable/icon.png')}
                        style={{
                          height: 40,
                          width: 40,
                          borderRadius: 100,
                          borderWidth: 3,
                          borderColor: 'white',
                        }}
                      />
                    </View>
                  </ScrollView>
                </View>
              </View>
              <View style={{ paddingHorizontal: 10 }}>
                <View
                  style={{
                    height: 2,
                    width: '100%',
                    backgroundColor: 'white',
                  }}
                >
                  <View
                    style={{
                      height: 2,
                      width: '60%',
                      backgroundColor: '#ff5757',
                    }}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </Layout>
  );
}
