import React, {
  Component,
  useState,
  useMemo,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from 'react';

import { View, StyleSheet, Image, TouchableOpacity, Share } from 'react-native';

import { Button, Text } from '@ui-kitten/components';

import {
  IconCHeartToggle,
  IconCShare,
  IconEye,
  IconCChat,
  IconPlayPause,
  IconCVote,
  IconCCoin,
} from 'src/components/CustomIcons';

import {
  sendComment,
  handleLike,
  handleFollow,
  getUserData,
  getUserEntries,
} from '../../services/Requests/index';

const styles = StyleSheet.create({
  uiContainer: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    zIndex: 99,
    paddingBottom: 25,
  },
});

const InteractIcon = (props) => {
  const {
    Accessory,
    textContent,
    direction,
    onPress,
    status,
    height,
    width,
    align,
    style,
  } = props;

  return useMemo(
    () => (
      <View
        style={[
          style,
          {
            flexDirection: direction ?? 'column',
            alignItems: align ?? 'center',
            backgroundColor: 'rgba(0, 0, 0, .6)',
            alignSelf: 'flex-start',
            padding: 4,
            borderRadius: 10,
            marginRight: 5,
          },
        ]}
      >
        <Button
          appearance="ghost"
          status={status ?? 'control'}
          size="tiny"
          style={{
            paddingVertical: 0,
            paddingHorizontal: 0,
          }}
          accessoryLeft={(evaProps) => (
            <Accessory
              {...evaProps}
              style={[
                evaProps.style,
                { height: height ?? 32, width: width ?? 32 },
              ]}
            />
          )}
          onPress={onPress}
        />
        {textContent ? (
          <Text
            status={status ?? 'control'}
            category="c2"
            style={{ textAlign: 'center', marginRight: 5 }}
          >
            {textContent}
          </Text>
        ) : null}
      </View>
    ),
    [textContent, onPress, height, width, status, style, direction],
  );
};

const VideoView = forwardRef((props, ref) => {
  // prettier-ignore
  const {
    data, height, videoRef, challenge, navigation
  } = props;

  const { item } = data;

  const [isLiked, setLiked] = useState(data.userEntryData.isLike);
  const [totalLikes, setTotalLikes] = useState(data.totalLikes);

  const [shouldPlay, setShouldPlay] = useState(true);

  const likeData = {
    entryId: data._id,
    isLike: isLiked,
  };

  const routeUserProfile = async (userId) => {
    const userData = await getUserData(userId);
    const { data } = userData;
    await navigation.navigate('UserProfile', data);
  };

  const toggleLike = async () => {
    setLiked(!isLiked);
    const newLikesCount = isLiked ? totalLikes - 1 : totalLikes + 1;
    setTotalLikes(newLikesCount);

    // We want to update the total like count that is returned from the server
    // So we have fresh like count after interaction with the like icon (:
    handleLike(likeData).then((resData) => {
      // The meta contains new count for the entry
      // resData.meta.totalLikes.totalLikes
      // resData.meta.totalLikes.totalVotes
      // resData.meta.totalLikes.totalViews
      // resData.meta.totalLikes.totalComments
      setTotalLikes(resData.meta.totalLikes);
    });
  };

  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: data.mediaURL,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          alert(result.activityType);
        } else {
          // shared
          alert('Shared');
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
        // alert('Action dismissed');
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // const [isLiked, setLiked] = useState(false);

  const [isVoted, setVoted] = useState(false);

  const togglePause = useCallback(() => {
    (async () => {
      try {
        if (videoRef) {
          const status = await videoRef.current.getStatusAsync();

          if (!status.isLoaded) return;

          if (status.isPlaying) {
            await videoRef.current.pauseAsync();
            setShouldPlay(false);
          } else {
            await videoRef.current.playAsync();
            setShouldPlay(true);
          }
        }
      } catch (e) {
        const msg = e;
      }
    })();
  }, [videoRef]);

  // const toggleLike = useCallback(() => setLiked((prevState) => !prevState), []);

  const toggleVote = useCallback(() => setVoted((prevState) => !prevState), []);

  useImperativeHandle(ref, () => ({
    resetPlayState(playState) {
      setShouldPlay(playState);
    },
  }));

  return useMemo(
    () => (
      <View
        style={{
          flex: 1,
          height,
          zIndex: 95,
        }}
      >
        <View style={styles.uiContainer}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              width: '100%',
              paddingHorizontal: 10,
              paddingBottom: 20,
            }}
          >
            <View style={{ flexDirection: 'row' }}>
              {/* <View style={{ position: 'relative' }}>
                <LinearGradient
                  colors={['#043F7C', '#FF5757']}
                  style={{
                    height: 50,
                    width: 50,
                    borderRadius: 25,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Image
                    source={require('assets/images/user/user2.png')}
                    defaultSource={require('assets/images/user/user2.png')}
                    style={{
                      height: 46,
                      width: 46,
                      borderRadius: 23,
                    }}
                    resizeMode="cover"
                  />
                </LinearGradient>
                <Image
                  source={require('assets/images/icon/verified.png')}
                  defaultSource={require('assets/images/icon/verified.png')}
                  style={{
                    height: 16,
                    width: 16,
                    borderRadius: 13,
                    position: 'absolute',
                    right: 0,
                    bottom: 20,
                  }}
                  resizeMode="cover"
                />
              </View> */}
              <View
                style={{
                  paddingLeft: 5,
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    backgroundColor: 'rgba(0, 0, 0, .6)',
                    paddingVertical: 5,
                    paddingHorizontal: 8,
                    borderRadius: 10,
                  }}
                >
                  <Text
                    status="primary"
                    category="h6"
                    style={{ marginBottom: 5 }}
                  >
                    {data.userFirstName}
                  </Text>
                  <Text status="danger" category="h6">
                    {data.userLastName}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: 5,
                  }}
                >
                  <InteractIcon
                    status={!shouldPlay ? 'danger' : 'success'}
                    Accessory={(evaProps) => (
                      <IconPlayPause {...evaProps} isPlaying={!shouldPlay} />
                    )}
                    height={20}
                    width={20}
                    onPress={togglePause}
                  />
                  <InteractIcon
                    Accessory={(evaProps) => <IconEye {...evaProps} />}
                    textContent={data.totalViews}
                    height={20}
                    width={20}
                    direction="row"
                    style={{ marginRight: 7 }}
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(0, 0, 0, .6)',
                    alignSelf: 'flex-start',
                    padding: 8,
                    borderRadius: 10,
                  }}
                >
                  <Text
                    status="control"
                    category="s2"
                    style={{
                      backgroundColor: 'rgba(0, 0, 0, 0.0125)',
                      marginBottom: 2,
                    }}
                  >
                    {data.userEntryData.categoryName}
                  </Text>
                </View>
              </View>
            </View>
            <View>
              <InteractIcon
                style={{ marginBottom: 15 }}
                Accessory={IconCHeartToggle}
                status={isLiked ? 'danger' : 'control'}
                textContent={data.likes}
                onPress={toggleLike}
              />
              <InteractIcon
                style={{ marginBottom: 10 }}
                Accessory={(evaProps) => <IconCChat {...evaProps} active />}
                textContent={data.totalComments}
              />
              <InteractIcon
                style={{ marginBottom: 15 }}
                Accessory={(evaProps) => <IconCShare {...evaProps} active />}
                onPress={handleShare}
              />

              <TouchableOpacity
                style={{ alignItems: 'center', marginBottom: 5 }}
                onPress={() => routeUserProfile(data.userId)}
              >
                <Image
                  source={{ uri: data.userImageURL }}
                  defaultSource={require('assets/images/banner/profile.jpg')}
                  style={{
                    height: 40,
                    width: 40,
                    borderRadius: 20,
                    borderWidth: 2,
                    borderColor: 'white',
                  }}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    ),
    [
      height,
      item,
      challenge,
      shouldPlay,
      togglePause,
      isLiked,
      toggleLike,
      isVoted,
      toggleVote,
    ],
  );
});

export default VideoView;
