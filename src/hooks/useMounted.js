import { useState, useEffect } from 'react';

export default function useMounted() {
  const [isMounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  return isMounted;
}
