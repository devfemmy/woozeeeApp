import { useState, useEffect } from 'react';

import * as Font from 'expo-font';

import { Asset } from 'expo-asset';

export default function usePreFetchResources() {
  const [isPreloaded, setPreloaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
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

        await Asset.loadAsync([
          require('~assets/images/onboarding-video-thumb.jpg'),
          require('~assets/images/card-insure.jpg'),
          require('~assets/images/card-wallet.jpg'),
          require('~assets/images/card-rewards.jpg'),
          require('~assets/images/drawable/splash.png'),
          require('~assets/images/drawable/logo.png'),
          require('~assets/images/icon/upload.png'),
          require('~assets/images/icon/upload-2.png'),
          require('~assets/images/icon/verified.png'),
          require('~assets/images/icon/flag-ng.png'),
          require('~assets/images/icon/flag-round-ng.png'),
          require('~assets/images/banner/woozeee-socials.jpg'),
          require('~assets/images/banner/woozeee-marketplace.jpg'),
          require('~assets/images/banner/woozeee-charity.jpg'),
          require('~assets/images/banner/back1.jpg'),
          require('~assets/images/banner/back2.jpg'),
          require('~assets/images/banner/back3.jpg'),
          require('~assets/images/user/user1.png'),
          require('~assets/images/user/user2.png'),
          require('~assets/images/user/user3.png'),
        ]);
      } catch (e) {
        const err = e;
      } finally {
        await setPreloaded(true);
      }
    })();
  }, []);

  return isPreloaded;
}
