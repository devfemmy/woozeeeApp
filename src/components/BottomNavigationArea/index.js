import React, { useContext, useMemo, useCallback } from 'react';

// prettier-ignore
import {
  Image, TouchableOpacity, View, Alert,
} from 'react-native';

import RBSheet from 'react-native-raw-bottom-sheet';

import {
  BottomNavigation,
  BottomNavigationTab,
  Layout,
  Divider,
  Button,
  Text,
} from '@ui-kitten/components';

import { VESDK, Configuration } from 'react-native-videoeditorsdk';

import { LocaleContext, AppSettingsContext } from 'src/contexts';

import ImageVideoPicker from 'src/utilities/ImageVideoPicker';

import getLibraryPermission from 'src/utilities/getLibraryPermission';
import getCameraPermission from 'src/utilities/getCameraPermission';

import ImageVideoCamera from 'src/utilities/ImageVideoCamera';

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

const libraryVideoPicker = ImageVideoPicker('Videos');

const cameraVideoRecorder = ImageVideoCamera('Videos');

const configuration = {
  ...Configuration,
  // tools: ['filter'],
};

const IconUpload = (props) => {
  const { navigation } = props;

  const sheetRef = React.useRef(null);

  const handleSelectVideo = async () => {
    await getLibraryPermission();

    const videoFile = await libraryVideoPicker();

    if (!videoFile?.uri) return;

    if (videoFile.duration > 60 * 1000) {
      Alert.alert(
        'Video too long',
        'Video file should not be greater than 60secs',
        [{ text: 'Ok', style: 'default' }],
      );
      return;
    }

    const editorResult = await VESDK.openEditor(videoFile.uri, configuration);

    if (!editorResult?.video) return;

    navigation.navigate('VideoUpload', { editorResult });
  };

  const handleRecordVideo = async () => {
    await getCameraPermission();

    const videoFile = await cameraVideoRecorder();

    if (!videoFile) return;

    const editorResult = await VESDK.openEditor(videoFile, configuration);

    if (!editorResult?.video) return;

    navigation.navigate('VideoUpload', { editorResult });
  };

  const handleOpenSheet = () => sheetRef.current.open();

  return (
    <Layout
      level="3"
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        width: 58,
        height: 58,
        top: -30,
        borderRadius: 29,
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
      <TouchableOpacity onPress={handleOpenSheet}>
        <Image
          source={require('assets/images/icon/upload.png')}
          defaultSource={require('assets/images/icon/upload.png')}
          style={{
            width: 52,
            height: 52,
            borderRadius: 26,
          }}
          resizeMode="cover"
        />
      </TouchableOpacity>
      <RBSheet
        ref={sheetRef}
        height={190}
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
            paddingBottom: 30,
          }}
        >
          <Button
            appearance="ghost"
            accessoryLeft={(evaProps) => (
              <IconCloudUploadOutline {...evaProps} height={36} width={36} />
            )}
            style={{
              width: '100%',
              justifyContent: 'flex-start',
            }}
            onPress={handleSelectVideo}
          >
            <Text style={{ fontSize: 18 }} status="primary">
              Upload from device
            </Text>
          </Button>
          <Divider style={{ marginVertical: 2, width: '100%' }} />
          <Button
            appearance="ghost"
            accessoryLeft={(evaProps) => (
              <IconVideoOutline {...evaProps} height={36} width={36} />
            )}
            style={{
              width: '100%',
              justifyContent: 'flex-start',
            }}
            onPress={handleRecordVideo}
          >
            <Text style={{ fontSize: 18 }} status="primary">
              Record with camera
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

  const { appState } = useContext(AppSettingsContext);

  const ICON_THEME = appState.darkMode ? '#FFFFFF' : '#0A143F';

  const renderIcon = useCallback(
    (Icon, otherProps, active) => (
      <Icon
        {...otherProps}
        style={{ height: 22, width: 22, tintColor: ICON_THEME }}
        active={active}
        navigation={navigation}
      />
    ),
    [navigation, ICON_THEME],
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
