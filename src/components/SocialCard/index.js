import React, { useMemo, useCallback, useState } from 'react';

import {
  View,
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';

import Video from 'react-native-video';

import Moment from 'react-moment';

import { useNavigation } from '@react-navigation/native';

import { LinearGradient } from 'expo-linear-gradient';

import { Text } from '@ui-kitten/components';

import FastImage from 'react-native-fast-image';

export default function VideoCard(props) {
  // prettier-ignore
  const {
    data, extraWidth, numColumns,
  } = props;

  const navigation = useNavigation();

  const { width, height } = useWindowDimensions();

  const IS_PORTRAIT = height > width;

  const COLUMN_COUNT = numColumns ?? (IS_PORTRAIT ? 3 : 5);

  const routeChallengeWooz = useCallback(
    () => navigation.navigate('ExploreWooz', data.item),
    [navigation],
  );

  return useMemo(
    () => (
      <TouchableOpacity
        activeOpacity={0.75}
        style={{
          height: 180,
          width: IS_PORTRAIT
            ? width / (COLUMN_COUNT + extraWidth)
            : width / (COLUMN_COUNT + extraWidth),
          paddingHorizontal: 3,
          position: 'relative',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}
        onPress={routeChallengeWooz}
      >
        <FastImage
          style={{
            height: '100%',
            width: '100%',
            borderRadius: 15,
          }}
          source={{
            uri: data.item.medialThumbnail,
            priority: FastImage.priority.cover,
          }}
        />
        {data.item && (
          <LinearGradient
            colors={['#043F7C', '#FF5757']}
            style={{
              height: 35,
              width: 35,
              borderRadius: 17.5,
              alignItems: 'center',
              justifyContent: 'center',
              right: 33,
              bottom: 175,
              zIndex: 1000,
            }}
          >
            <FastImage
              source={{
                uri: data.item.medialThumbnail,
                priority: FastImage.priority.cover,
              }}
              style={{
                height: 30,
                width: 30,
                borderRadius: 30 / 2,
                borderColor: 'white',
              }}
            />
          </LinearGradient>
        )}
        {data.item ? (
          <View
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              position: 'absolute',
              bottom: 0,
              borderBottomLeftRadius: 15,
              borderBottomRightRadius: 15,
              padding: 5,
              width: '100%',
            }}
          >
            <Text
              category="c2"
              style={{ color: 'white', marginBottom: 5 }}
              numberOfLines={1}
            >
              {data.item.userDisplayName}
            </Text>
            <View>
              <Moment
                fromNow
                element={(momentProps) => (
                  <Text
                    category="c1"
                    {...momentProps}
                    style={{ fontSize: 10, color: 'white' }}
                  />
                )}
              >
                {data.item.createdAt}
              </Moment>
            </View>
          </View>
        ) : null}
      </TouchableOpacity>
    ),
    [COLUMN_COUNT, IS_PORTRAIT, extraWidth, width, data, routeChallengeWooz],
  );
}

export function UserProfilePostCard(props) {
  const { data, extraWidth, numColumns, allPosts } = props;
  // console.log('from allPosts user UserProfilePostCard-> ', data);

  const navigation = useNavigation();

  const { width, height } = useWindowDimensions();

  const IS_PORTRAIT = height > width;

  const COLUMN_COUNT = IS_PORTRAIT ? 3 : 5;

  // const COLUMN_COUNT = numColumns ?? (IS_PORTRAIT ? 3 : 5);

  const routeChallengeWooz = () => {
    navigation.navigate('DeepLinkPost', { _id: data.item._id }), [navigation];
  };

  return useMemo(
    () => (
      <TouchableOpacity
        activeOpacity={0.75}
        style={{
          height: 185,
          width: IS_PORTRAIT
            ? width / (COLUMN_COUNT + extraWidth)
            : width / (COLUMN_COUNT + extraWidth),
          paddingHorizontal: 3,
          paddingBottom: 5,

          position: 'relative',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}
        onPress={routeChallengeWooz}
      >
        {data.item.type === 'video' ? (
          <Video
            source={{ uri: data.item.mediaURL }}
            paused={true}
            style={{
              height: '100%',
              width: '100%',
              borderRadius: 15,

              borderColor: 'rgba(0, 0, 0, 0.2)',
              borderWidth: 0.2,
            }}
            resizeMode="cover"
          />
        ) : (
          <Image
            source={{ uri: data.item.mediaURL }}
            defaultSource={require('assets/images/banner/placeholder-image.png')}
            style={{
              height: '100%',
              width: '100%',
              borderRadius: 15,

              borderColor: 'rgba(0, 0, 0, 0.2)',
              borderWidth: 0.2,
            }}
            resizeMode="cover"
          />
        )}
      </TouchableOpacity>
    ),
    [COLUMN_COUNT, IS_PORTRAIT, extraWidth, width, data, routeChallengeWooz],
  );
}

export function UserPostLikedCard(props) {
  const { data, extraWidth, numColumns, allLikedPosts } = props;

  const navigation = useNavigation();

  const { width, height } = useWindowDimensions();

  const IS_PORTRAIT = height > width;

  const COLUMN_COUNT = IS_PORTRAIT ? 3 : 5;

  const routeLikedDataWooz = () => {
    navigation.navigate('DeepLinkPost', { _id: data.item.entryId }),
      [navigation];
  };
  // const routeLikedDataWooz = () => {
  //   console.log(data);

  // };

  return useMemo(
    () => (
      <TouchableOpacity
        activeOpacity={0.75}
        style={{
          height: 185,
          width: IS_PORTRAIT
            ? width / (COLUMN_COUNT + extraWidth)
            : width / (COLUMN_COUNT + extraWidth),
          paddingHorizontal: 3,
          paddingVertical: 5,
          position: 'relative',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}
        onPress={routeLikedDataWooz}
      >
        {data.item.type === 'video' ? (
          <Image
            source={{ uri: data.item.mediaURL }}
            defaultSource={require('assets/images/banner/placeholder-image.png')}
            style={{
              height: '100%',
              width: '100%',
              borderRadius: 15,

              borderColor: 'rgba(0, 0, 0, 0.2)',
              borderWidth: 0.2,
            }}
            resizeMode="cover"
          />
        ) : (
          <Video
            poster={data.item.entryMediaURL}
            source={{ uri: data.item.entryMediaURL }}
            paused={true}
            style={{
              height: '100%',
              width: '100%',
              borderRadius: 15,
              borderColor: 'rgba(0, 0, 0, 0.2)',
              borderWidth: 0.2,
            }}
            resizeMode="cover"
          />
        )}
      </TouchableOpacity>
    ),
    [COLUMN_COUNT, IS_PORTRAIT, extraWidth, width, data, routeLikedDataWooz],
  );
}

export function ChallengeVideoCard(props) {
  // prettier-ignore
  const {
    data, extraWidth, numColumns,
  } = props;

  const challenge = data.item;

  // console.log('Challenge data from challenge video card => ', challenge);
  const navigation = useNavigation();

  const { width, height } = useWindowDimensions();

  const IS_PORTRAIT = height > width;

  const COLUMN_COUNT = numColumns ?? (IS_PORTRAIT ? 3 : 5);

  const routeChallengeWooz = useCallback(() => {
    // const res = await getWoozData(challenge._id);
    navigation.navigate('ChallengeWooz', challenge), [navigation];
  });

  const routeChallengePage = () => navigation.navigate('ChallengePage');

  return useMemo(
    () => (
      <TouchableOpacity
        activeOpacity={0.75}
        style={{
          height: 185,
          width: IS_PORTRAIT
            ? width / (COLUMN_COUNT + extraWidth)
            : width / (COLUMN_COUNT + extraWidth),
          paddingHorizontal: 3,
          position: 'relative',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}
        // onPress={routeChallengePage}
      >
        <FastImage
          source={{
            uri: challenge.imageURL,
            priority: FastImage.priority.cover,
          }}
          style={{
            height: '100%',
            width: '100%',
            borderRadius: 15,
            borderColor: 'white',
          }}
        />
        {challenge && (
          <LinearGradient
            colors={['#043F7C', '#FF5757']}
            style={{
              height: 35,
              width: 35,
              borderRadius: 17.5,
              alignItems: 'center',
              justifyContent: 'center',
              right: 33,
              bottom: 180,
              zIndex: 1000,
            }}
          >
            <FastImage
              source={{
                uri: challenge.sponsorImageURL,
                priority: FastImage.priority.cover,
              }}
              style={{
                height: 30,
                width: 30,
                borderRadius: 30 / 2,
                borderColor: 'white',
              }}
            />
          </LinearGradient>
        )}
        {challenge && (
          <View
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              position: 'absolute',
              bottom: 0,
              borderBottomLeftRadius: 15,
              borderBottomRightRadius: 15,
              padding: 5,
              width: '100%',
            }}
          >
            <Text
              category="c2"
              style={{ color: 'white', marginBottom: 5 }}
              numberOfLines={1}
            >
              {challenge.hashtagName}
            </Text>
            <View>
              <Moment
                fromNow
                element={(momentProps) => (
                  <Text
                    category="c1"
                    {...momentProps}
                    style={{ fontSize: 10, color: 'white' }}
                  />
                )}
              >
                {challenge.createdAt}
              </Moment>
            </View>
          </View>
        )}
      </TouchableOpacity>
    ),
    [COLUMN_COUNT, IS_PORTRAIT, extraWidth, width, data, routeChallengeWooz],
  );
}
