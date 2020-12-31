import { useState } from 'react';

export default function useLoading(asyncFunc) {
  const [isLoading, setLoading] = useState(false);

  const doAsyncFunc = (...args) => {
    setLoading(true);

    return asyncFunc(...args).then(() => setLoading(false));
  };

  return [doAsyncFunc, isLoading];
}
