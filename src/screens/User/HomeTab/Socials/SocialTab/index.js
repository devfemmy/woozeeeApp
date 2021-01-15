import React, { useState } from 'react';

import { View, StyleSheet, useWindowDimensions } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

// prettier-ignore
import {
  Layout, Button, Text, OverflowMenu, MenuItem,
} from '@ui-kitten/components';

import useToast from '~src/hooks/useToast';

import {
  IconVideo,
  IconMenu,
  IconGift,
  IconMap,
  IconRadio,
  IconHome,
} from '~src/components/CustomIcons';

import VideoView from '~src/components/VideoView';

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
export default function Social({ navigation }) {
  useToast('Click again to go back');

  const { width, height } = useWindowDimensions();

  const isPortrait = height > width;

  const [isNavigationMenuOpen, setNavigationMenuOpen] = useState(false);

  const openMenu = () => {
    setNavigationMenuOpen(true);
  };

  const closeMenu = () => {
    setNavigationMenuOpen(false);
  };

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
        onPress={openMenu}
      />
    </View>
  );

  const NavigationMenu = () => (
    <OverflowMenu
      anchor={NavigationAnchor}
      visible={isNavigationMenuOpen}
      onBackdropPress={closeMenu}
      onTouchEnd={closeMenu}
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
        <VideoView />
      </SafeAreaView>
    </Layout>
  );
}
