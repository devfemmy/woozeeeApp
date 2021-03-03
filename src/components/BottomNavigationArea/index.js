import React, { useContext, useMemo, useCallback } from 'react';

import { Image, TouchableOpacity, View } from 'react-native';

import RBSheet from 'react-native-raw-bottom-sheet';

import {
  BottomNavigation,
  BottomNavigationTab,
  Layout,
  Divider,
  Button,
  Text,
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
  IconVideoOutline,
  IconCloudUploadOutline,
} from '../CustomIcons';

const IconUpload = (props) => {
  const { navigation } = props;

  const sheetRef = React.useRef(null);

  const routeVideoUpload = () => navigation.navigate('VideoUpload');
  return (
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
        borderRadius: 30,
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
      <TouchableOpacity onPress={() => sheetRef.current.open()}>
        <Image
          source={require('assets/images/icon/upload.png')}
          defaultSource={require('assets/images/icon/upload.png')}
          style={{
            width: 55,
            height: 55,
            borderRadius: 30,
          }}
          resizeMode="cover"
        />
      </TouchableOpacity>
      <RBSheet
        ref={sheetRef}
        height={170}
        closeOnDragDown
        animationType="fade"
        customStyles={{
          container: {
            justifyContent: 'center',
            alignItems: 'center',
          },
        }}
      >
        <View
          style={{
            flex: 1,
            width: '100%',
            alignItems: 'flex-start',
            justifyContent: 'flex-end',
            paddingBottom: 10,
          }}
        >
          <Button
            appearance="ghost"
            accessoryLeft={(evaProps) => (
              <IconVideoOutline {...evaProps} height={36} width={36} />
            )}
            style={{
              width: '100%',
              justifyContent: 'flex-start',
            }}
          >
            <Text style={{ fontSize: 18 }} status="primary">
              Record with camera
            </Text>
          </Button>
          <Divider style={{ marginVertical: 2, width: '100%' }} />
          <Button
            appearance="ghost"
            accessoryLeft={(evaProps) => (
              <IconCloudUploadOutline {...evaProps} height={36} width={36} />
            )}
            style={{
              width: '100%',
              justifyContent: 'flex-start',
            }}
          >
            <Text style={{ fontSize: 18 }} status="primary">
              Upload from device
            </Text>
          </Button>
        </View>
      </RBSheet>
    </Layout>
  );
};

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

  const renderIcon = useCallback(
    (Icon, otherProps, active) => (
      <Icon
        {...otherProps}
        style={{ height: 24, width: 24 }}
        active={active}
        navigation={navigation}
      />
    ),
    [navigation],
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
    [t, navigation, page, state, style, renderIcon],
  );
}
