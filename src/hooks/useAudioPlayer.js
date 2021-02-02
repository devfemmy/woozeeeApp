import { useRef } from 'react';

import { useIsFocused } from '@react-navigation/native';

import { Audio } from 'expo-av';

export default function useAudioPlayer(uri) {
  const soundObj = useRef(new Audio.Sound());

  const isFocused = useIsFocused();

  const INITIAL_STATUS = {
    shouldPlay: true,
    isLooping: true,
  };

  (async () => {
    try {
      if (isFocused && !soundObj.current._loaded) {
        await soundObj.current.loadAsync(uri, INITIAL_STATUS);
      }
      if (!isFocused && soundObj.current._loaded) {
        await soundObj.current.unloadAsync();
      }
    } catch (e) {
      const msg = e;
    }
  })();

  return soundObj.current;
}
