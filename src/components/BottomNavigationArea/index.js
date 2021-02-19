import React, { useContext, useMemo } from 'react';

import { Image, TouchableOpacity } from 'react-native';

import {
  BottomNavigation,
  BottomNavigationTab,
  Layout,
  Divider,
} from '@ui-kitten/components';

import { LocaleContext } from 'src/contexts';

import {
  IconCHome,
  IconCWallet,
  IconCList,
  IconCClock,
  IconCUser,
  IconCWooz,
  IconCSocial,
  IconCCup,
} from '../CustomIcons';

const IconUpload = () => (
  <Layout
    level="3"
    style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      width: 60,
      height: 60,
      top: -25,
      borderRadius: 100,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 6,
    }}
  >
    <TouchableOpacity onPress={null}>
      <Image
        source={require('assets/images/icon/upload.png')}
        defaultSource={require('assets/images/icon/upload.png')}
        style={{
          width: 55,
          height: 55,
          borderRadius: 100,
        }}
        resizeMode="cover"
      />
    </TouchableOpacity>
  </Layout>
);

// Screens
const tabs = {
  user: {
    home: IconCHome,
    wallet: IconCWallet,
    billPay: IconCList,
    activities: IconCClock,
  },
  social: {
    social: IconCSocial,
    wooz: IconCWooz,
    upload: IconUpload,
    challenge: IconCCup,
    profile: IconCUser,
  },
};

export default function BottomNavigationArea(props) {
  // prettier-ignore
  const {
    navigation, state, style, page,
  } = props;

  const t = useContext(LocaleContext);

  const renderIcon = (Icon, otherProps, active) => (
    <Icon {...otherProps} style={{ height: 24, width: 24 }} active={active} />
  );

  return useMemo(
    () => (
      <Layout level="5">
        <Divider />
        <BottomNavigation
          appearance="noIndicator"
          style={[style, { backgroundColor: 'transparent' }]}
          selectedIndex={state.index}
          onSelect={(index) => navigation.navigate(state.routeNames[index])}
        >
          {Object.entries(tabs[page]).map(([title, icon], id) => (
            <BottomNavigationTab
              title={title === 'upload' ? null : t(title)}
              // prettier-ignore
              icon={(evaProps) => renderIcon(icon, evaProps, state.index === id)}
              key={title}
            />
          ))}
        </BottomNavigation>
      </Layout>
    ),
    [t, navigation, page, state, style],
  );
}
