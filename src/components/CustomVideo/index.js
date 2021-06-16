import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';

import { Video } from 'expo-av';

function CustomVideo({ isMuted, ...props }) {
  const [muteState, setMuteState] = useState(isMuted);

  useEffect(() => {
    setMuteState(isMuted);
  }, [isMuted]);

  return (
    <TouchableWithoutFeedback onPress={() => console.log('double clicked')}>
      <View>
        <Video {...props} isMuted={muteState} />
      </View>
    </TouchableWithoutFeedback>
  );
}

export default CustomVideo;
