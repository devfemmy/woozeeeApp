import { useState, useEffect } from 'react';

import { createThumbnail } from 'react-native-create-thumbnail';

export default function useVideoThumb(videoUri) {
  const [imageUri, setImageUri] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const thumbUri = await createThumbnail({
          url: videoUri,
          timeStamp: 0,
        });

        setImageUri(thumbUri.path);
      } catch (e) {
        const msg = e;
      }
    })();
  }, [videoUri]);

  return imageUri;
}
