import React, { useState, useMemo } from 'react';

import { View, StyleSheet, Image } from 'react-native';

import { Text } from '@ui-kitten/components';

import CustomVideoPlayer from 'src/components/CustomVideoPlayer';

import InteractIcon from 'src/components/InteractIcon';

import {
  IconHeartToggle,
  IconShare,
  IconClipboard,
  IconEye,
  IconMsgSquare,
  IconPlayPause,
  IconVolume,
} from 'src/components/CustomIcons';

const styles = StyleSheet.create({
  uiContainer: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    zIndex: 9,
    paddingBottom: 25,
  },
});

export default function VideoView(props) {
  const { data, activeIndex, viewHeight } = props;

  const { item, index } = data;

  const INDEX_PRELOAD = [1];

  const IS_ACTIVE = activeIndex === index;

  const IS_PREV = INDEX_PRELOAD.includes(activeIndex - index);

  const IS_NEXT = INDEX_PRELOAD.includes(index - activeIndex);

  const IS_PRELOADED = IS_PREV || IS_NEXT;

  const [shouldPlay, setShouldPlay] = useState(true);

  const [isLiked, setLiked] = useState(false);

  const [isMuted, setMuted] = useState(false);

  const togglePause = () => setShouldPlay((prevState) => !prevState);

  const toggleLike = () => setLiked((prevState) => !prevState);

  const toggleVolume = () => setMuted((prevState) => !prevState);

  return (
    <View
      style={{
        flex: 1,
        height: viewHeight,
        paddingBottom: 36,
      }}
    >
      <CustomVideoPlayer
        videoUri={item.video}
        shouldPlay={shouldPlay}
        shouldDisplay={IS_ACTIVE}
        isPreloaded={IS_PRELOADED}
        isMuted={isMuted}
        isLooping
        resizeMode="contain"
        repeat
      />
      <View style={styles.uiContainer}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            width: '100%',
            paddingHorizontal: 10,
            paddingBottom: 56,
          }}
        >
          <View style={{ flexDirection: 'row' }}>
            <View style={{ position: 'relative' }}>
              <Image
                source={require('assets/images/user/user2.png')}
                style={{
                  height: 50,
                  width: 50,
                  borderRadius: 100,
                  borderWidth: 2,
                  borderColor: 'white',
                }}
              />
              <Image
                source={require('assets/images/icon/verified.png')}
                style={{
                  height: 15,
                  width: 15,
                  borderRadius: 100,
                  position: 'absolute',
                  right: 0,
                  bottom: 25,
                }}
              />
            </View>
            <View style={{ paddingLeft: 5 }}>
              <View style={{ flexDirection: 'row' }}>
                <Text status="primary" category="h6" style={{ marginRight: 5 }}>
                  {item.ownerFirstName}
                </Text>
                <Text status="danger" category="h6">
                  {item.ownerLastName}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: 5,
                }}
              >
                {/* <Button
                    status="danger"
                    size="tiny"
                    style={{ paddingVertical: 0, paddingHorizontal: 0 }}
                  >
                    <Text category="c2" status="control">
                      Follow
                    </Text>
                  </Button> */}
                <InteractIcon
                  status={shouldPlay ? 'danger' : 'success'}
                  Accessory={(evaProps) => (
                    <IconPlayPause
                      {...evaProps}
                      isPlaying={shouldPlay && IS_ACTIVE}
                    />
                  )}
                  height={20}
                  width={20}
                  onPress={togglePause}
                />
                <InteractIcon
                  status="primary"
                  Accessory={(evaProps) => (
                    <IconVolume {...evaProps} isOpen={!isMuted} />
                  )}
                  height={20}
                  width={20}
                  onPress={toggleVolume}
                />
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text
                  status="control"
                  category="s2"
                  style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.0125)',
                  }}
                >
                  {item.category}
                </Text>
              </View>
            </View>
          </View>
          <View>
            <InteractIcon
              style={{ marginBottom: 15 }}
              Accessory={(evaProps) => (
                <IconHeartToggle {...evaProps} isLiked={isLiked} />
              )}
              textContent={item.likes}
              onPress={toggleLike}
            />
            <InteractIcon
              style={{ marginBottom: 15 }}
              Accessory={IconMsgSquare}
              textContent={item.comments}
            />
            <InteractIcon
              style={{ marginBottom: 15 }}
              Accessory={(evaProps) => <IconEye {...evaProps} isOpen />}
              textContent={item.views}
            />
            {/* <InteractIcon
                    Accessory={IconClipboard}
                    textContent={item.votes}
                  /> */}
            <InteractIcon
              style={{ marginBottom: 15 }}
              Accessory={IconShare}
              textContent={item.shares}
            />

            <View style={{ alignItems: 'center' }}>
              <Image
                source={require('assets/images/drawable/icon.png')}
                style={{
                  height: 40,
                  width: 40,
                  borderRadius: 100,
                  borderWidth: 2,
                  borderColor: 'white',
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
