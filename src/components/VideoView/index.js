import React, { useState, useMemo, useCallback } from 'react';

import { View, Image } from 'react-native';

import Moment from 'react-moment';

import { LinearGradient } from 'expo-linear-gradient';

import { Text, Button } from '@ui-kitten/components';

import CustomVideoPlayer from 'src/components/CustomVideoPlayer';

import InteractIcon from 'src/components/InteractIcon';

import {
  IconHeartToggle,
  IconEye,
  IconMsgSquareOutline,
  IconMoreHorizontal,
  IconForwardIos,
} from 'src/components/CustomIcons';

export default function VideoView(props) {
  // prettier-ignore
  const {
    data, activeIndex, viewHeight, navigation, t,
  } = props;

  const { item, index } = data;

  const INDEX_PRELOAD = [1];

  const IS_ACTIVE = activeIndex === index;

  const IS_PREV = INDEX_PRELOAD.includes(activeIndex - index);

  const IS_NEXT = INDEX_PRELOAD.includes(index - activeIndex);

  const IS_PRELOADED = IS_PREV || IS_NEXT;

  const [isLiked, setLiked] = useState(false);

  const [hideText, setHideText] = useState(true);

  const toggleLike = () => setLiked((prevState) => !prevState);

  const updateHiddenText = () => setHideText((prevState) => !prevState);

  const routeComments = useCallback(() => navigation.navigate('Comments'), [
    navigation,
  ]);

  return useMemo(
    () => (
      <>
        <View
          style={{
            flex: 1,
            height: viewHeight,
            paddingVertical: 20,
            borderBottomWidth: 1,
            borderColor: 'rgba(143, 155, 179, 0.08)',
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 10,
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
                  source={require('assets/images/user/user2.png')}
                  style={{
                    height: 40,
                    width: 40,
                    borderRadius: 20,
                    borderColor: 'white',
                  }}
                />
              </LinearGradient>
              <View
                style={{
                  flexDirection: 'row',
                  paddingRight: 5,
                  paddingLeft: 10,
                }}
              >
                <Text category="label" style={{ marginRight: 5 }}>
                  {item.ownerFirstName}
                </Text>
                <Text category="label">{item.ownerLastName}</Text>
              </View>
              <Image
                source={require('assets/images/icon/verified-1.png')}
                style={{
                  height: 16,
                  width: 16,
                  borderRadius: 13,
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
              flex: 1,
              marginVertical: 10,
            }}
          >
            <CustomVideoPlayer
              videoUri={item.video}
              shouldPlay
              shouldDisplay={IS_ACTIVE}
              isPreloaded={IS_PRELOADED}
              isLooping
              resizeMode="cover"
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <InteractIcon
                style={{ marginHorizontal: 5 }}
                Accessory={(evaProps) => (
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
                Accessory={IconMsgSquareOutline}
                textContent={item.comments}
                direction="row"
                status="basic"
                height={28}
                width={28}
              />
              <InteractIcon
                style={{ marginHorizontal: 5 }}
                Accessory={(evaProps) => <IconEye {...evaProps} />}
                textContent={item.views}
                direction="row"
                status="basic"
                height={28}
                width={28}
              />
            </View>
            <View style={{}}>
              <InteractIcon
                style={{ marginHorizontal: 5 }}
                Accessory={IconMoreHorizontal}
                status="basic"
                height={28}
                width={28}
              />
            </View>
          </View>
          <View style={{ marginTop: 10, paddingHorizontal: 15 }}>
            <View
              style={{
                marginBottom: 10,
                flexDirection: 'row',
                alignItems: 'flex-start',
              }}
            >
              <Text
                category="p2"
                style={{ flex: 1, lineHeight: 24 }}
                numberOfLines={hideText ? 1 : 0}
              >
                The love of woozeee is the beginning of wisdom, if you believe
                say I.
              </Text>
              <Button
                size="tiny"
                appearance="ghost"
                style={{ width: 60 }}
                onPress={updateHiddenText}
              >
                <Text appearance="hint" category="c2">
                  {hideText ? 'more' : 'less'}
                </Text>
              </Button>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  flex: 1,
                }}
              >
                <Text category="s2" status="primary">
                  Mathias Wisdom
                </Text>
                <Text category="s2" style={{ marginHorizontal: 2 }}>
                  :
                </Text>
                <Text category="p2">That&apos;s my boy</Text>
              </View>
              <View style={{ width: 125 }}>
                <Button
                  size="tiny"
                  appearance="ghost"
                  accessoryRight={IconForwardIos}
                  onPress={routeComments}
                >
                  <Text status="primary" category="s2">
                    {t('comments')}
                  </Text>
                </Button>
              </View>
            </View>
          </View>
        </View>
      </>
    ),
    [
      IS_ACTIVE,
      IS_PRELOADED,
      hideText,
      isLiked,
      viewHeight,
      item,
      routeComments,
    ],
  );
}
