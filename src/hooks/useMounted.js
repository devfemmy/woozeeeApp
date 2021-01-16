import { useState, useMemo } from 'react';

export default function useMounted() {
  const [isMounted, setMounted] = useState(false);

  useMemo(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  return isMounted;
}
