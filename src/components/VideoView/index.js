import React, { useState, useMemo } from 'react';

import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  useWindowDimensions,
} from 'react-native';

import { Text } from '@ui-kitten/components';

import { useIsFocused } from '@react-navigation/native';

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
  const { data, activeIndex, viewHeight } = props;

  const { width, height } = useWindowDimensions();

  const isFocused = useIsFocused();

  const { item, index } = data;

  const INDEX_PRELOAD = [1, 2];

  const IS_PORTRAIT = height > width;

  const IS_ACTIVE = activeIndex === index;

  const IS_PREV = INDEX_PRELOAD.includes(activeIndex - index);

  const IS_NEXT = INDEX_PRELOAD.includes(index - activeIndex);

  const IS_PRELOADED = IS_PREV || IS_NEXT;

  const [shouldPlay, setShouldPlay] = useState(true);

  const [isLiked, setLiked] = useState(false);

  const togglePause = () => setShouldPlay((prevState) => !prevState);

  const toggleLike = () => setLiked((prevState) => !prevState);

  return useMemo(
    () => (
      <View
        style={{
          flex: 1,
          height: viewHeight,
        }}
      >
        {isFocused ? (
          <CustomVideoPlayer
            videoUri={item.video}
            thumbUri="thumb image uri"
            shouldPlay={shouldPlay}
            shouldDisplay={IS_ACTIVE}
            isPreloaded={IS_PRELOADED}
            togglePause={togglePause}
          />
        ) : null}
        <View style={styles.uiContainer}>
          <View
            style={{
              width: '100%',
              paddingBottom: 5,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                width: '100%',
              }}
            >
              <View
                style={{
                  paddingHorizontal: 10,
                  maxWidth: width / 3,
                }}
              >
                <View style={{ flexDirection: 'row' }}>
                  <Text
                    status="primary"
                    category="h6"
                    style={{ marginRight: 5 }}
                  >
                    {item.ownerFirstName}
                  </Text>
                  <Text status="danger" category="h6">
                    {item.ownerLastName}
                  </Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text
                    status="control"
                    category="s2"
                    style={{
                      backgroundColor: 'rgba(0, 0, 0, 0.0125)',
                      paddingHorizontal: 5,
                    }}
                  >
                    {item.category}
                  </Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <InteractIcon
                    Accessory={(evaProps) => (
                      <IconPlayPause
                        // eslint-disable-next-line react/jsx-props-no-spreading
                        {...evaProps}
                        isPlaying={shouldPlay && IS_ACTIVE}
                      />
                    )}
                    onPress={togglePause}
                  />
                </View>
              </View>
              <View style={{ maxWidth: width / 3 }}>
                <ScrollView
                  horizontal={!IS_PORTRAIT}
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{
                    alignItems: 'center',
                  }}
                >
                  <InteractIcon
                    Accessory={(evaProps) => (
                      // eslint-disable-next-line react/jsx-props-no-spreading
                      <IconHeart {...evaProps} isLiked={isLiked} />
                    )}
                    textContent={item.likes}
                    onPress={toggleLike}
                  />
                  <InteractIcon
                    Accessory={IconMsgSquare}
                    textContent={item.comments}
                  />
                  <InteractIcon
                    Accessory={(evaProps) => (
                      // eslint-disable-next-line react/jsx-props-no-spreading
                      <IconEye {...evaProps} isOpen />
                    )}
                    textContent={item.views}
                  />
                  <InteractIcon
                    Accessory={IconClipboard}
                    textContent={item.votes}
                  />

                  <InteractIcon
                    Accessory={IconShare}
                    textContent={item.shares}
                  />

                  <View style={{ alignItems: 'center', padding: 10 }}>
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
          </View>
        </View>
      </View>
    ),
    [
      IS_ACTIVE,
      IS_PORTRAIT,
      IS_PRELOADED,
      isFocused,
      width,
      viewHeight,
      isLiked,
      shouldPlay,
      item.video,
      item.ownerFirstName,
      item.ownerLastName,
      item.category,
      item.likes,
      item.comments,
      item.views,
      item.votes,
      item.shares,
    ],
  );
}
