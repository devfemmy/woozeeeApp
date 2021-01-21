import React, { useState, useCallback, useContext } from 'react';

import { View, StyleSheet, useWindowDimensions } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

// prettier-ignore
import {
  Layout, Button, Text, OverflowMenu, MenuItem, List,
} from '@ui-kitten/components';

import { Get } from 'react-axios';

import { LocaleContext } from '~src/contexts';

import VideoView from '~src/components/VideoView';

import {
  FullPlaceholder,
  ListPlaceholder,
} from '~src/components/CustomPlaceholder';

import { socialUrl } from '~src/api/dummy';

import {
  IconVideo,
  IconMenu,
  IconGift,
  IconMap,
  IconRadio,
  IconHome,
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
export default function Social({ navigation }) {
  const { width, height } = useWindowDimensions();

  const t = useContext(LocaleContext);

  const [isNavigationMenuOpen, setNavigationMenuOpen] = useState(false);

  const [activeIndex, setActiveIndex] = useState(0);

  const IS_PORTRAIT = height > width;

  const ITEM_HEIGHT = IS_PORTRAIT ? height - 25 : height - 50;

  const VIEWABILITY_CONFIG = {
    minimumViewTime: 500,
    viewAreaCoveragePercentThreshold: 80,
  };

  const handleViewItemsChanged = useCallback((data) => {
    setActiveIndex(data.changed[0].index);
  }, []);

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
        status="control"
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
      <MenuItem
        accessoryLeft={IconHome}
        title={t('home')}
        onPress={routeHome}
      />
      <MenuItem
        accessoryLeft={IconRadio}
        title={t('socials')}
        onPress={routeSocial}
      />
      <MenuItem accessoryLeft={IconMap} title={t('marketplace')} />
      <MenuItem accessoryLeft={IconGift} title={t('charity')} />
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
            <Text category="label" status="control">
              {t('following')}
            </Text>
            <Text style={{ color: 'white', marginHorizontal: 10 }}>|</Text>
            <Text category="label" status="control">
              {t('versus')}
            </Text>
          </View>
          <View style={styles.interactIcons}>
            <Button
              appearance="ghost"
              status="control"
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
        <Get url={socialUrl}>
          {(error, response, isLoading, makeRequest) => {
            if (error) {
              return (
                <View
                  style={{
                    flex: 1,
                    padding: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text style={{ marginBottom: 10 }}>{t('networkError')}</Text>
                  <Button
                    /* prettier-ignore */
                    onPress={() => makeRequest({ params: { reload: true } })}
                  >
                    <Text status="control">{t('retry')}</Text>
                  </Button>
                </View>
              );
            }
            if (isLoading) {
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    paddingVertical: 10,
                    paddingBottom: 10,
                  }}
                >
                  <ListPlaceholder width={width} height={height - 175} />
                </View>
              );
            }
            if (response !== null) {
              if (response.data.length < 1) {
                return (
                  <View
                    style={{
                      flex: 1,
                      padding: 10,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Text style={{ marginBottom: 10 }}>{t('noVideos')}</Text>
                    <Button
                      /* prettier-ignore */
                      onPress={() => makeRequest({ params: { refresh: true } })}
                    >
                      <Text status="control">{t('refresh')}</Text>
                    </Button>
                  </View>
                );
              }
              return (
                <List
                  style={{
                    flex: 1,
                    backgroundColor: 'transparent',
                    position: 'absolute',
                    height: ITEM_HEIGHT,
                  }}
                  alwaysBounceVertical
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  data={response.data}
                  renderItem={(renderData) => (
                    <VideoView
                      data={renderData}
                      extraWidth={0.5}
                      activeIndex={activeIndex}
                    />
                  )}
                  extraData={activeIndex}
                  snapToAlignment="start"
                  decelerationRate="fast"
                  snapToInterval={ITEM_HEIGHT}
                  getItemLayout={(data, index) => ({
                    length: ITEM_HEIGHT,
                    offset: ITEM_HEIGHT * index,
                    index,
                  })}
                  initialNumToRender={2}
                  onViewableItemsChanged={handleViewItemsChanged}
                  viewabilityConfig={VIEWABILITY_CONFIG}
                />
              );
            }
            return (
              <View style={{ paddingBottom: 10 }}>
                <FullPlaceholder width={width - 10} height={height - 150} />
              </View>
            );
          }}
        </Get>
      </SafeAreaView>
    </Layout>
  );
}
