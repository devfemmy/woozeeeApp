import { useState, useMemo } from 'react';

export default function useIsMounted() {
  const [isMounted, setMounted] = useState(false);

  useMemo(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  return isMounted;
}
