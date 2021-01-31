import React, { useContext } from 'react';

import { Image, TouchableOpacity } from 'react-native';

import {
  BottomNavigation,
  BottomNavigationTab,
  Layout,
  Divider,
} from '@ui-kitten/components';

import { LocaleContext } from '~src/contexts';

import {
  IconHome,
  IconCreditCard,
  IconCalendar,
  IconClock,
  IconPerson,
  IconSearch,
  IconRadio,
  IconMic,
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
        source={require('~assets/images/icon/upload-2.png')}
        style={{
          width: 55,
          height: 55,
          borderRadius: 100,
          resizeMode: 'contain',
        }}
      />
    </TouchableOpacity>
  </Layout>
);

// Screens
const tabs = {
  user: {
    home: IconHome,
    wallet: IconCreditCard,
    billPay: IconCalendar,
    activities: IconClock,
  },
  social: {
    socials: IconRadio,
    explore: IconSearch,
    upload: IconUpload,
    challenge: IconMic,
    profile: IconPerson,
  },
};

export default function BottomNavigationArea(props) {
  // prettier-ignore
  const {
  // eslint-disable-next-line react/prop-types
    navigation, state, style, page,
  } = props;

  const t = useContext(LocaleContext);

  return (
    <Layout level="4">
      <Divider />
      <BottomNavigation
        appearance="noIndicator"
        style={[style, { backgroundColor: 'transparent' }]}
        /* eslint-disable-next-line react/prop-types */
        selectedIndex={state.index}
        /* eslint-disable-next-line react/prop-types */
        onSelect={(index) => navigation.navigate(state.routeNames[index])}
      >
        {Object.entries(tabs[page]).map(([title, icon]) => (
          <BottomNavigationTab
            title={title === 'upload' ? null : t(title)}
            icon={icon}
            key={title}
          />
        ))}
      </BottomNavigation>
    </Layout>
  );
}
