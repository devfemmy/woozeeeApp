import React, { useState, useMemo } from 'react';

import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  useWindowDimensions,
} from 'react-native';

import { Text } from '@ui-kitten/components';

import CustomVideoPlayer from '~src/components/CustomVideoPlayer';

import InteractIcon from './InteractIcon';

import {
  IconHeart,
  IconShare,
  IconClipboard,
  IconEye,
  IconMsgSquare,
  IconPlayPause,
} from '~src/components/CustomIcons';

const styles = StyleSheet.create({
  uiContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    minHeight: '100%',
    zIndex: 9,
    paddingVertical: 5,
  },
  interactIcons: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.0125)',
    marginBottom: 5,
  },
});

export default function VideoView(props) {
  const { data } = props;

  const { width, height } = useWindowDimensions();

  const isPortrait = height > width;

  const [shouldPlay, setShouldPlay] = useState(true);

  const [isLiked, setLiked] = useState(false);

  const [playProgress, setPlayProgress] = useState({
    width: '0%',
  });

  const togglePause = () => setShouldPlay((prevState) => !prevState);

  const toggleLike = () => setLiked((prevState) => !prevState);

  return useMemo(
    () => (
      <View style={{ flex: 1, height: isPortrait ? height - 25 : height - 50 }}>
        <CustomVideoPlayer
          videoUri={data.video}
          thumbUri="thumb image"
          isMuted
          shouldPlay={shouldPlay}
          resizeMode={isPortrait ? 'cover' : 'contain'}
          setPlayProgress={setPlayProgress}
        />
        <View style={styles.uiContainer}>
          <View
            style={{
              width: '100%',
              paddingBottom: 25,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                width: '100%',
                marginBottom: 10,
              }}
            >
              <View style={{ paddingHorizontal: 10, maxWidth: width / 3 }}>
                <View style={{ flexDirection: 'row' }}>
                  <Text
                    status="primary"
                    category="h6"
                    style={{ marginRight: 5 }}
                  >
                    {data.ownerFirstName}
                  </Text>
                  <Text status="danger" category="h6">
                    {data.ownerLastName}
                  </Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text
                    status={isPortrait ? 'control' : 'basic'}
                    category="s2"
                    style={{
                      backgroundColor: 'rgba(0, 0, 0, 0.0125)',
                      paddingHorizontal: 5,
                    }}
                  >
                    {data.category}
                  </Text>
                </View>
              </View>
              <View style={{ maxWidth: width / 3 }}>
                <ScrollView
                  horizontal={!isPortrait}
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{
                    alignItems: 'center',
                  }}
                >
                  <InteractIcon
                    accessory={(evaProps) => (
                      // eslint-disable-next-line react/jsx-props-no-spreading
                      <IconHeart {...evaProps} isLiked={isLiked} />
                    )}
                    textContent={data.likes}
                    onPress={toggleLike}
                  />
                  <InteractIcon
                    accessory={IconMsgSquare}
                    textContent={data.comments}
                  />
                  <InteractIcon
                    accessory={(evaProps) => (
                      // eslint-disable-next-line react/jsx-props-no-spreading
                      <IconEye {...evaProps} isOpen />
                    )}
                    textContent={data.views}
                  />
                  <InteractIcon
                    accessory={IconClipboard}
                    textContent={data.votes}
                  />

                  <InteractIcon
                    accessory={IconShare}
                    textContent={data.shares}
                  />

                  <InteractIcon
                    accessory={(evaProps) => (
                      // eslint-disable-next-line react/jsx-props-no-spreading
                      <IconPlayPause {...evaProps} isPlaying={shouldPlay} />
                    )}
                    textContent={shouldPlay ? 'Pause' : 'Play'}
                    onPress={togglePause}
                  />

                  <View style={{ alignItems: 'center', marginBottom: 0 }}>
                    <Image
                      source={require('~assets/images/drawable/icon.png')}
                      style={{
                        height: 40,
                        width: 40,
                        borderRadius: 100,
                        borderWidth: 3,
                        borderColor: 'white',
                      }}
                    />
                  </View>
                </ScrollView>
              </View>
            </View>
            <View style={{ paddingHorizontal: 10 }}>
              <View
                style={{
                  height: 2,
                  width: '100%',
                  backgroundColor: 'white',
                }}
              >
                <View
                  style={{
                    height: 2,
                    width: playProgress.width,
                    backgroundColor: '#ff5757',
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    ),
    [
      width,
      height,
      isLiked,
      isPortrait,
      shouldPlay,
      playProgress.width,
      data.video,
      data.ownerFirstName,
      data.ownerLastName,
      data.category,
      data.likes,
      data.comments,
      data.views,
      data.votes,
      data.shares,
    ],
  );
}
