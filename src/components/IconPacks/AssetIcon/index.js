import React from 'react';
import { Image } from 'react-native';

const IconProvider = (source) => ({
  toReactElement: ({ animation, ...props }) => (
    <Image
      {...props}
      source={source}
      defaultSource={source}
      resizeMode="cover"
    />
  ),
});

const AssetIconsPack = {
  name: 'assets',
  icons: {
    home: IconProvider(require('assets/images/icon/home.png')),
    'home-outline': IconProvider(
      require('assets/images/icon/home-outline.png'),
    ),
    wallet: IconProvider(require('assets/images/icon/wallet.png')),
    'wallet-outline': IconProvider(
      require('assets/images/icon/wallet-outline.png'),
    ),
    list: IconProvider(require('assets/images/icon/list.png')),
    'list-outline': IconProvider(
      require('assets/images/icon/list-outline.png'),
    ),
    clock: IconProvider(require('assets/images/icon/clock.png')),
    'clock-outline': IconProvider(
      require('assets/images/icon/clock-outline.png'),
    ),
    social: IconProvider(require('assets/images/icon/social.png')),
    'social-outline': IconProvider(
      require('assets/images/icon/social-outline.png'),
    ),
    wooz: IconProvider(require('assets/images/icon/wooz.png')),
    'wooz-outline': IconProvider(
      require('assets/images/icon/wooz-outline.png'),
    ),
    supercup: IconProvider(require('assets/images/icon/supercup.png')),
    'supercup-outline': IconProvider(
      require('assets/images/icon/supercup-outline.png'),
    ),
    user: IconProvider(require('assets/images/icon/user.png')),
    'user-outline': IconProvider(
      require('assets/images/icon/user-outline.png'),
    ),
    'user-2': IconProvider(require('assets/images/icon/user-2-outline.png')),
    'user-2-outline': IconProvider(
      require('assets/images/icon/user-2-outline.png'),
    ),
    'flag-ng': IconProvider(require('assets/images/icon/flag-ng.png')),
    'movie-outline': IconProvider(
      require('assets/images/icon/movie-outline.png'),
    ),
    chat: IconProvider(require('assets/images/icon/chat.png')),
    'chat-outline': IconProvider(
      require('assets/images/icon/chat-outline.png'),
    ),
    heart: IconProvider(require('assets/images/icon/heart.png')),
    'heart-outline': IconProvider(
      require('assets/images/icon/heart-outline.png'),
    ),
    'heart-filled': IconProvider(
      require('assets/images/icon/heart-filled.png'),
    ),
    'eye-outline': IconProvider(require('assets/images/icon/eye-outline.png')),
    share: IconProvider(require('assets/images/icon/share.png')),
    'share-outline': IconProvider(
      require('assets/images/icon/share-outline.png'),
    ),
    'reorder-left-outline': IconProvider(
      require('assets/images/icon/reorder-left-outline.png'),
    ),
    'video-outline': IconProvider(
      require('assets/images/icon/video-outline.png'),
    ),
    'notification-outline': IconProvider(
      require('assets/images/icon/notification-new-outline.png'),
    ),
    'notification-new-outline': IconProvider(
      require('assets/images/icon/notification-new-outline.png'),
    ),
    'search-outline': IconProvider(
      require('assets/images/icon/search-outline.png'),
    ),
    'market-outline': IconProvider(
      require('assets/images/icon/market-outline.png'),
    ),
    market: IconProvider(require('assets/images/icon/market-outline.png')),
    'cart-outline': IconProvider(
      require('assets/images/icon/cart-outline.png'),
    ),
    cart: IconProvider(require('assets/images/icon/cart-outline.png')),
    'grid-outline': IconProvider(
      require('assets/images/icon/grid-outline.png'),
    ),
    grid: IconProvider(require('assets/images/icon/grid-outline.png')),
    vote: IconProvider(require('assets/images/icon/vote.png')),
    medal: IconProvider(require('assets/images/icon/medal.png')),
    charity: IconProvider(require('assets/images/icon/charity.png')),
    'charity-outline': IconProvider(require('assets/images/icon/charity.png')),
    campaign: IconProvider(require('assets/images/icon/campaign-outline.png')),
    'campaign-outline': IconProvider(
      require('assets/images/icon/campaign-outline.png'),
    ),
    hero: IconProvider(require('assets/images/icon/hero-outline.png')),
    'hero-outline': IconProvider(
      require('assets/images/icon/hero-outline.png'),
    ),
  },
};

export default AssetIconsPack;
