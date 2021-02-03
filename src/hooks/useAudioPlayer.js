import { useRef, useEffect, useMemo } from 'react';

import { useIsFocused } from '@react-navigation/native';

import { Audio } from 'expo-av';

export default function useAudioPlayer(uri) {
  const isMounted = useRef(false);

  const soundObj = useRef(new Audio.Sound());

  const isFocused = useIsFocused();

  const INITIAL_STATUS = useMemo(
    () => ({
      shouldPlay: true,
      isLooping: true,
    }),
    [],
  );

  useEffect(() => {
    isMounted.current = true;

    (async () => {
      try {
        if (isMounted.current) {
          if (isFocused && !soundObj.current._loaded) {
            await soundObj.current.loadAsync(uri, INITIAL_STATUS);
          }
        }
        if (!isFocused || !isMounted.current) {
          await soundObj.current.unloadAsync();
        }
      } catch (e) {
        const msg = e;
      }
    })();

    return () => {
      isMounted.current = false;
    };
  }, [INITIAL_STATUS, isFocused, uri]);

  return soundObj.current;
}
