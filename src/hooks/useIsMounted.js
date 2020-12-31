import { useState, useCallback } from 'react';

export default function useIsMounted() {
  const [isMounted, setMounted] = useState(false);

  useCallback(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  return isMounted;
}
