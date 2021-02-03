import React, { useState, useMemo } from 'react';

import { View, Image } from 'react-native';

import Moment from 'react-moment';

import { LinearGradient } from 'expo-linear-gradient';

import { Text, Button } from '@ui-kitten/components';

import { useIsFocused } from '@react-navigation/native';

import CustomVideoPlayer from './CustomVideoPlayer';

import InteractIcon from '~src/components/InteractIcon';

import {
  IconHeartToggle,
  IconEye,
  IconMsgSquareOutline,
} from '~src/components/CustomIcons';

export default function VideoView(props) {
  const { data, activeIndex, viewHeight } = props;

  const isFocused = useIsFocused();

  const { item, index } = data;

  const INDEX_PRELOAD = [1, 2];

  const IS_ACTIVE = activeIndex === index;

  const IS_PREV = INDEX_PRELOAD.includes(activeIndex - index);

  const IS_NEXT = INDEX_PRELOAD.includes(index - activeIndex);

  const IS_PRELOADED = IS_PREV || IS_NEXT;

  const [shouldPlay, setShouldPlay] = useState(true);

  const [isLiked, setLiked] = useState(false);

  const toggleLike = () => setLiked((prevState) => !prevState);

  return useMemo(
    () => (
      <View
        style={{
          flex: 1,
          height: viewHeight,
        }}
      >
        <View
          style={{
            paddingHorizontal: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <LinearGradient
              colors={['#043F7C', '#FF5757']}
              style={{
                height: 44,
                width: 44,
                borderRadius: 22,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Image
                source={require('~assets/images/user/user2.png')}
                style={{
                  height: 40,
                  width: 40,
                  borderRadius: 100,
                  borderColor: 'white',
                }}
              />
            </LinearGradient>
            <View
              style={{ flexDirection: 'row', paddingRight: 5, paddingLeft: 10 }}
            >
              <Text category="label" style={{ marginRight: 5 }}>
                {item.ownerFirstName}
              </Text>
              <Text category="label">{item.ownerLastName}</Text>
            </View>
            <Image
              source={require('~assets/images/icon/verified-1.png')}
              style={{
                height: 15,
                width: 15,
                borderRadius: 100,
              }}
            />
            <Text appearance="hint" style={{ marginLeft: 5 }}>
              |
            </Text>
            <Button
              appearance="ghost"
              size="tiny"
              style={{ paddingVertical: 0, paddingHorizontal: 0 }}
            >
              <Text category="label" status="info">
                Follow
              </Text>
            </Button>
            <Text category="c1" style={{ fontSize: 10 }}>
              {item.category}
            </Text>
          </View>
          <View>
            <Moment
              fromNow
              element={(momentProps) => (
                <Text
                  category="c1"
                  /* eslint-disable-next-line react/jsx-props-no-spreading */
                  {...momentProps}
                  style={{ fontSize: 10 }}
                />
              )}
            >
              {item.dateAdded}
            </Moment>
          </View>
        </View>
        <View
          style={{
            position: 'relative',
            height: viewHeight - 120,
            marginVertical: 5,
          }}
        >
          {isFocused ? (
            <CustomVideoPlayer
              videoUri={item.video}
              thumbUri="thumb image uri"
              shouldPlay={shouldPlay}
              shouldDisplay={IS_ACTIVE}
              isPreloaded={IS_PRELOADED}
              isLooping
            />
          ) : null}
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <InteractIcon
            style={{ marginHorizontal: 5 }}
            Accessory={(evaProps) => (
              // eslint-disable-next-line react/jsx-props-no-spreading
              <IconHeartToggle {...evaProps} isLiked={isLiked} />
            )}
            textContent={item.likes}
            direction="row"
            status="basic"
            height={28}
            width={28}
            onPress={toggleLike}
          />
          <InteractIcon
            style={{ marginHorizontal: 5 }}
            Accessory={(evaProps) => (
              // eslint-disable-next-line react/jsx-props-no-spreading
              <IconMsgSquareOutline {...evaProps} />
            )}
            textContent={item.comments}
            direction="row"
            status="basic"
            height={28}
            width={28}
          />
          <InteractIcon
            style={{ marginHorizontal: 5 }}
            Accessory={(evaProps) => (
              // eslint-disable-next-line react/jsx-props-no-spreading
              <IconEye {...evaProps} isOpen />
            )}
            textContent={item.views}
            direction="row"
            status="basic"
            height={28}
            width={28}
          />
        </View>
      </View>
    ),
    [IS_ACTIVE, IS_PRELOADED, isFocused, viewHeight, isLiked, shouldPlay, item],
  );
}
