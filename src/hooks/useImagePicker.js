import { useEffect } from 'react';

import { Alert, Platform } from 'react-native';

import * as ImagePicker from 'expo-image-picker';

export default function useImagePicker(media) {
  useEffect(() => {
    (async () => {
      try {
        if (Platform.OS !== 'web') {
          const checkPermission = await ImagePicker.getMediaLibraryPermissionsAsync();

          if (checkPermission.status === 'granted') return;

          const {
            status,
          } = await ImagePicker.requestMediaLibraryPermissionsAsync();

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
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions[media],
        allowsEditing: true,
        aspect,
        quality: 1,
      });

      if (!result.cancelled) fileUri = await result.uri;
    } catch (e) {
      const msg = e;
    }
    return fileUri;
  };
}
