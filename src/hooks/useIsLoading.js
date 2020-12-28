import { useState } from 'react';

export default function useIsLoading(asyncFunc) {
  const [isLoading, setLoading] = useState(false);

  const doAsyncFunc = (...args) => {
    setLoading(true);

    return asyncFunc(...args).then(() => setLoading(false));
  };

  return [doAsyncFunc, isLoading];
}
