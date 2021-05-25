import React, {
  useState,
  useMemo,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from 'react';

import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';

import { Text } from '@ui-kitten/components';

// import { LinearGradient } from 'expo-linear-gradient';

import InteractIcon from 'src/components/InteractIcon';

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

const ChallengeVideo = forwardRef((props, ref) => {
  // prettier-ignore
  const {
      data, height, videoRef, challenge, navigation
    } = props;

  const { item } = data;

  console.log('from challenge video full screen -> ', data);

  const [isLiked, setLiked] = useState(data.userEntryData.isLike);
  const [totalLikes, setTotalLikes] = useState(data.totalLikes);

  const [shouldPlay, setShouldPlay] = useState(true);

  const likeData = {
    entryId: data._id,
    isLike: isLiked,
  };

  const routeUserProfile = async () => {
    const userData = await getUserData(data.userId);
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
              <View style={{ paddingLeft: 5 }}>
                <View style={{ flexDirection: 'row' }}>
                  <Text
                    status="primary"
                    category="h6"
                    style={{ marginRight: 5 }}
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
                    {data.userEntryData.categoryName}
                  </Text>
                </View>
              </View>
            </View>
            <View>
              <InteractIcon
                size="large"
                style={{ marginBottom: 15 }}
                /* prettier-ignore */
                Accessory={(evaProps) => (isVoted ? (
                      <IconCCoin style={{ height: 36, width: 36 }} />
                    ) : (
                      <IconCVote {...evaProps} active />
                    ))}
                textContent={data.likes}
                onPress={toggleVote}
              />
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
              />

              <TouchableOpacity
                style={{ alignItems: 'center' }}
                onPress={routeUserProfile}
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

export default ChallengeVideo;
