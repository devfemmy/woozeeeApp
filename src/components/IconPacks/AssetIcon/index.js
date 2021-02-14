import React from 'react';
import { Image } from 'react-native';

const IconProvider = (source) => ({
  toReactElement: ({ animation, ...props }) => {
    const { style, ...otherProps } = props;

    return (
      <Image
        {...otherProps}
        source={source}
        style={[style, { resizeMode: 'contain' }]}
      />
    );
  },
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
  },
};

export default AssetIconsPack;
