import { useCallback, useRef } from 'react';

import { ToastAndroid } from 'react-native';

import { useFocusEffect } from '@react-navigation/native';

export default function useNotifyBackAction(navigation, msg) {
  const exitCount = useRef(0);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = (e) => {
        e.preventDefault();

        const timeoutToClose = setTimeout(() => {
          exitCount.current = 0;
        }, 3000);

        if (exitCount.current === 1) {
          exitCount.current = 0;

          clearTimeout(timeoutToClose);

          navigation.dispatch(e.data.action);

          return;
        }

        exitCount.current += 1;

        ToastAndroid.showWithGravity(
          msg,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
      };

      navigation.addListener('beforeRemove', onBackPress);
    }, [navigation, msg, exitCount]),
  );
}
