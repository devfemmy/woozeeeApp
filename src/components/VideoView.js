import React, { useState, useMemo, useCallback } from 'react';

import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  useWindowDimensions,
} from 'react-native';

import { Button, Text } from '@ui-kitten/components';

import useMounted from '~src/hooks/useMounted';

import CustomVideo from '~src/components/CustomVideo';

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
export default function VideoView() {
  const isMounted = useMounted();

  const { width, height } = useWindowDimensions();

  const isPortrait = height > width;

  const [shouldPlay, setShouldPlay] = useState(false);

  const [isLiked, setLiked] = useState(false);

  const [playProgress, setPlayProgress] = useState({
    millis: 100,
    width: '0%',
  });

  const [playPosition, setPlayPosition] = useState(100);

  const togglePause = useCallback(() => {
    setPlayPosition(playProgress.millis);
    setShouldPlay((prevState) => !prevState);
  }, [playProgress.millis]);

  const toggleLike = () => setLiked((prevState) => !prevState);

  const InteractIcon = (props) => {
    // eslint-disable-next-line react/prop-types
    const { accessory, textContent, onPress } = props;

    return useMemo(
      () => (
        <View style={styles.interactIcons}>
          <Button
            appearance="ghost"
            status={isPortrait ? 'control' : 'basic'}
            size="large"
            accessoryLeft={accessory}
            onPress={onPress}
          />
          <Text status={isPortrait ? 'control' : 'basic'} category="label">
            {textContent}
          </Text>
        </View>
      ),
      [accessory, textContent, onPress],
    );
  };

  return useMemo(
    () => (
      <View style={[StyleSheet.absoluteFillObject, { flex: 1, height }]}>
        {isMounted ? (
          <CustomVideo
            videoUri="https://woozeee-socials-artifacts.s3.eu-central-1.amazonaws.com/app-assets/intro.mp4"
            thumbUri={require('~assets/images/onboarding-video-thumb.jpg')}
            isMuted
            shouldPlay={shouldPlay}
            resizeMode={isPortrait ? 'cover' : 'contain'}
            currentProgress={playPosition}
            setPlayProgress={setPlayProgress}
          />
        ) : null}
        <View style={styles.uiContainer}>
          <View
            style={{
              width: '100%',
              paddingBottom: 55,
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
              <View style={{ paddingHorizontal: 10 }}>
                <View style={{ flexDirection: 'row' }}>
                  <Text
                    status="primary"
                    category="h6"
                    style={{ marginRight: 5 }}
                  >
                    Michelle
                  </Text>
                  <Text status="danger" category="h6">
                    Alabi
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
                    Animals
                  </Text>
                </View>
              </View>
              <View style={{ paddingTop: isPortrait ? 0 : 90 }}>
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                >
                  <InteractIcon
                    accessory={(evaProps) => (
                      // eslint-disable-next-line react/jsx-props-no-spreading
                      <IconHeart {...evaProps} isLiked={isLiked} />
                    )}
                    textContent="2.2k"
                    onPress={toggleLike}
                  />
                  <InteractIcon accessory={IconMsgSquare} textContent="7.2k" />
                  <InteractIcon
                    accessory={(evaProps) => (
                      // eslint-disable-next-line react/jsx-props-no-spreading
                      <IconEye {...evaProps} isOpen />
                    )}
                    textContent="21.2k"
                  />
                  <InteractIcon accessory={IconClipboard} textContent="22.2k" />

                  <InteractIcon accessory={IconShare} textContent="12k" />

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
      height,
      isLiked,
      isMounted,
      isPortrait,
      playPosition,
      shouldPlay,
      togglePause,
      playProgress.width,
    ],
  );
}
