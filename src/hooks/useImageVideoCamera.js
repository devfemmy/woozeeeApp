import { useEffect } from 'react';

import { Alert, Platform } from 'react-native';

import * as ImagePicker from 'expo-image-picker';

const MEDIA_OPTIONS = {
  Images: {
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    quality: 0.6,
  },
  Videos: {
    mediaTypes: ImagePicker.MediaTypeOptions.Videos,
    videoMaxDuration: 30,
  },
};

export default function useImageVideoCamera(media) {
  useEffect(() => {
    (async () => {
      try {
        if (Platform.OS !== 'web') {
          const checkPermission = await ImagePicker.getCameraPermissionsAsync();

          if (checkPermission.status === 'granted') return;

          const { status } = await ImagePicker.requestCameraPermissionsAsync();

          if (status !== 'granted') {
            Alert.alert(
              'Permission Denied',
              'Permission is required to access Library',
              [{ text: 'Ok', style: 'default' }],
            );
          }
        }
      } catch (e) {
        const msg = e;
      }
    })();
  }, []);

  return async (aspect) => {
    let fileUri = null;

    try {
      const result = await ImagePicker.launchCameraAsync({
        ...MEDIA_OPTIONS[media],
        ...(aspect ?? { aspect }),
      });

      if (!result.cancelled) fileUri = await result.uri;
    } catch (e) {
      const msg = e;
    }
    return fileUri;
  };
}
