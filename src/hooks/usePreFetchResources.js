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
            uri: require('assets/fonts/montserrat/montserrat-light.ttf'),
            display: Font.FontDisplay.FALLBACK,
          },
          'montserrat-regular': {
            uri: require('assets/fonts/montserrat/montserrat-regular.ttf'),
            display: Font.FontDisplay.FALLBACK,
          },
          'montserrat-medium': {
            uri: require('assets/fonts/montserrat/montserrat-medium.ttf'),
            display: Font.FontDisplay.FALLBACK,
          },
          'montserrat-semiBold': {
            uri: require('assets/fonts/montserrat/montserrat-semibold.ttf'),
            display: Font.FontDisplay.FALLBACK,
          },
          fontello: {
            uri: require('assets/fonts/fontello/fontello.ttf'),
            display: Font.FontDisplay.FALLBACK,
          },
        });

        await Asset.loadAsync([
          require('assets/images/card/insure.jpg'),
          require('assets/images/card/wallet.jpg'),
          require('assets/images/card/rewards.jpg'),
          require('assets/images/drawable/splash.png'),
          require('assets/images/drawable/logo.png'),
          require('assets/images/icon/upload.png'),
          require('assets/images/icon/verified.png'),
          require('assets/images/icon/verified-1.png'),
          require('assets/images/icon/flag-ng.png'),
          require('assets/images/icon/home.png'),
          require('assets/images/icon/home-outline.png'),
          require('assets/images/icon/wallet.png'),
          require('assets/images/icon/wallet-outline.png'),
          require('assets/images/icon/list.png'),
          require('assets/images/icon/list-outline.png'),
          require('assets/images/icon/clock.png'),
          require('assets/images/icon/clock-outline.png'),
          require('assets/images/icon/social.png'),
          require('assets/images/icon/social-outline.png'),
          require('assets/images/icon/wooz.png'),
          require('assets/images/icon/wooz-outline.png'),
          require('assets/images/icon/supercup.png'),
          require('assets/images/icon/supercup-outline.png'),
          require('assets/images/icon/user.png'),
          require('assets/images/icon/user-outline.png'),
          require('assets/images/icon/user-2-outline.png'),
          require('assets/images/icon/chat-outline.png'),
          require('assets/images/icon/heart-outline.png'),
          require('assets/images/icon/eye-outline.png'),
          require('assets/images/icon/share-outline.png'),
          require('assets/images/icon/reorder-left-outline.png'),
          require('assets/images/icon/notification-new-outline.png'),
          require('assets/images/icon/search-outline.png'),
          require('assets/images/icon/market-outline.png'),
          require('assets/images/icon/cart-outline.png'),
          require('assets/images/icon/tag-filled.png'),
          require('assets/images/icon/ball-filled.png'),
          require('assets/images/icon/doctor-filled.png'),
          require('assets/images/icon/balance-filled.png'),
          require('assets/images/icon/bag-filled.png'),
          require('assets/images/icon/atm-filled.png'),
          require('assets/images/icon/bank-filled.png'),
          require('assets/images/icon/map-filled.png'),
          require('assets/images/banner/onboarding-video-thumb.jpg'),
          require('assets/images/banner/woozeee-socials.jpg'),
          require('assets/images/banner/woozeee-marketplace.jpg'),
          require('assets/images/banner/woozeee-charity.jpg'),
          require('assets/images/banner/placeholder-image.png'),
          require('assets/images/banner/back1.jpg'),
          require('assets/images/banner/back2.jpg'),
          require('assets/images/banner/back3.jpg'),
          require('assets/images/banner/mega-sale.jpg'),
          require('assets/images/banner/valentine.jpg'),
          require('assets/images/banner/woozeee-ad.jpg'),
          require('assets/images/user/user1.png'),
          require('assets/images/user/user2.png'),
          require('assets/images/user/user3.png'),
          require('assets/audio/woozeee_Instrumental.mp3'),
        ]);
      } catch (e) {
        const err = e;
      } finally {
        setPreloaded(true);
      }
    })();
  }, []);

  return isPreloaded;
}
