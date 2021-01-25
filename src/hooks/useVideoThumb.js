import { useState, useEffect } from 'react';

import * as VideoThumbnails from 'expo-video-thumbnails';

export default function useVideoThumb(videoUri) {
  const [imageUri, setImageUri] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { uri } = await VideoThumbnails.getThumbnailAsync(videoUri, {
          time: 1000,
        });

        setImageUri(uri);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [videoUri]);

  return imageUri;
}
