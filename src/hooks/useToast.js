import { useState, useCallback } from 'react';

import { ToastAndroid, BackHandler } from 'react-native';

import { useFocusEffect } from '@react-navigation/native';

export default function useToast(msg) {
  const [exitCount, setExitCount] = useState(0);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (exitCount === 1) {
          return false;
        }

        setExitCount(1);

        ToastAndroid.showWithGravity(
          msg,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );

        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      // prettier-ignore
      return () => {
        BackHandler.removeEventListener(
          'hardwareBackPress', onBackPress,
        );
      };
    }, [exitCount]),
  );
}
