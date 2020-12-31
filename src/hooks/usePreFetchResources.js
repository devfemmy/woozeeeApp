import { useState, useEffect } from 'react';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import * as SplashScreen from 'expo-splash-screen';

export default function usePreFetchResources() {
  const [isPreloaded, setPreloaded] = useState(false);

  useEffect(() => {
    const loadPreloadedData = async () => {
      try {
        await SplashScreen.preventAutoHideAsync();

        await Font.loadAsync({
          'montserrat-light': {
            uri: require('~assets/fonts/montserrat/montserrat-light.ttf'),
            display: Font.FontDisplay.FALLBACK,
          },
          'montserrat-regular': {
            uri: require('~assets/fonts/montserrat/montserrat-regular.ttf'),
            display: Font.FontDisplay.FALLBACK,
          },
          'montserrat-medium': {
            uri: require('~assets/fonts/montserrat/montserrat-medium.ttf'),
            display: Font.FontDisplay.FALLBACK,
          },
          'montserrat-semiBold': {
            uri: require('~assets/fonts/montserrat/montserrat-semibold.ttf'),
            display: Font.FontDisplay.FALLBACK,
          },
        });

        await Asset.loadAsync([require('~assets/images/splash.png')]);
      } catch (e) {
        const err = e;
      } finally {
        await setPreloaded(true);
        await SplashScreen.hideAsync();
      }
    };

    loadPreloadedData().then(() => {});
  }, []);

  return isPreloaded;
}
