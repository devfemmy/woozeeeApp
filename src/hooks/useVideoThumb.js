import { useState, useMemo } from 'react';

import * as VideoThumbnails from 'expo-video-thumbnails';

export default function useVideoThumb(videoUri) {
  const [imageUri, setImageUri] = useState(null);

  useMemo(() => {
    (async () => {
      try {
        const { uri } = await VideoThumbnails.getThumbnailAsync(videoUri, {
          time: 1500,
        });

        setImageUri(uri);
      } catch (e) {
        const msg = e;
      }
    })();
  }, [videoUri]);

  return imageUri;
}
