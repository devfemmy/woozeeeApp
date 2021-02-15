import { useState, useEffect, useRef } from 'react';

import { createThumbnail } from 'react-native-create-thumbnail';

export default function useVideoThumb(videoUri) {
  const [imageUri, setImageUri] = useState(null);

  const isMounted = useRef(false);

  useEffect(() => {
    (async () => {
      try {
        isMounted.current = true;
        const thumbUri = await createThumbnail({
          url: videoUri,
          timeStamp: 0,
        });

        if (isMounted.current) {
          setImageUri(thumbUri.path);
        }
      } catch (e) {
        const msg = e;
      }
    })();

    return () => {
      isMounted.current = false;
    };
  }, [videoUri]);

  return imageUri;
}
