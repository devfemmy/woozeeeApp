import { useState, useCallback } from 'react';

export default function useMounted() {
  const [isMounted, setMounted] = useState(false);

  useCallback(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  return isMounted;
}
