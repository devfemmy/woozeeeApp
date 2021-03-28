import React, {
  useState,
  useContext,
  useCallback,
  useRef,
  forwardRef,
  useImperativeHandle,
} from 'react';

import { View, Image, TouchableOpacity } from 'react-native';

import Moment from 'react-moment';

import RBSheet from 'react-native-raw-bottom-sheet';

import { LinearGradient } from 'expo-linear-gradient';

import { Video } from 'expo-av';

// prettier-ignore
import {
  Text, Button, Divider, Layout,
} from '@ui-kitten/components';

import { useFocusEffect } from '@react-navigation/native';

import { AppSettingsContext } from 'src/contexts';

import InteractIcon from 'src/components/InteractIcon';

import {
  IconCHeart,
  IconCChat,
  IconCShare,
  IconMoreHorizontal,
  IconForwardIos,
} from 'src/components/CustomIcons';

const VideoView = forwardRef((props, ref) => {
  // prettier-ignore
  const {
    data, viewHeight, navigation, t,
  } = props;

  const { item } = data;

  const videoRef = useRef(null);

  const sheetRef = useRef(null);

  const isMounted = useRef(false);

  const [isLiked, setLiked] = useState(false);

  const [hideText, setHideText] = useState(true);

  const { appState } = useContext(AppSettingsContext);

  const BG_THEME = appState.darkMode ? '#070A0F' : '#F7F9FC';

  const toggleLike = () => setLiked((prevState) => !prevState);

  const updateHiddenText = () => setHideText((prevState) => !prevState);

  const routeComments = () => navigation.navigate('Comments');

  const handleOpenSheet = () => sheetRef.current.open();

  const routeUserProfile = () => navigation.navigate('UserProfile');

  useImperativeHandle(ref, () => ({
    async play() {
      try {
        const status = await videoRef.current.getStatusAsync();

        if (status.isPlaying) return;

        await videoRef.current.playAsync();
      } catch (e) {
        const msg = e;
      }
    },
    async pause() {
      try {
        if (videoRef.current) {
          await videoRef.current.pauseAsync();
        }
      } catch (e) {
        const msg = e;
      }
    },
  }));

  useFocusEffect(
    useCallback(() => {
      const unloadVideoRef = videoRef.current;

      isMounted.current = true;

      if (isMounted.current && videoRef.current) {
        (async () => {
          try {
            const status = await videoRef.current.getStatusAsync();

            if (!status.isLoaded) {
              await videoRef.current.loadAsync({
                uri: item.video,
              });
            }
          } catch (e) {
            const msg = e;
          }
        })();
      }
      return () => {
        isMounted.current = false;

        if (unloadVideoRef) {
          (async () => {
            try {
              const status = await unloadVideoRef.getStatusAsync();

              if (status.isLoaded) {
                await unloadVideoRef.unloadAsync();
              }
            } catch (e) {
              const msg = e;
            }
          })();
        }
      };
    }, [item.video]),
  );

  return (
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
            <TouchableOpacity
              activeOpacity={0.75}
              style={{ flexDirection: 'row', alignItems: 'center' }}
              onPress={routeUserProfile}
            >
              <LinearGradient
                colors={['#043F7C', '#FF5757']}
                style={{
                  height: 40,
                  width: 40,
                  borderRadius: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Image
                  source={require('assets/images/user/user2.png')}
                  defaultSource={require('assets/images/user/user2.png')}
                  style={{
                    height: 36,
                    width: 36,
                    borderRadius: 18,
                    borderColor: 'white',
                  }}
                  resizeMode="cover"
                />
              </LinearGradient>
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  paddingRight: 5,
                  paddingLeft: 5,
                  maxWidth: 190,
                }}
              >
                <Text status="primary" category="s2" style={{ marginRight: 5 }}>
                  {item.ownerFirstName}
                </Text>
                <Text status="danger" category="s2">
                  {item.ownerLastName}
                </Text>
              </View>
              <Image
                source={require('assets/images/icon/verified-1.png')}
                defaultSource={require('assets/images/icon/verified-1.png')}
                style={{
                  height: 16,
                  width: 16,
                  borderRadius: 8,
                }}
                resizeMode="cover"
              />
            </TouchableOpacity>
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
          </View>
          <View>
            <InteractIcon
              style={{ marginHorizontal: 5 }}
              Accessory={IconMoreHorizontal}
              status="basic"
              height={28}
              width={28}
              onPress={handleOpenSheet}
            />
          </View>
        </View>
        <View
          style={{
            flex: 1,
            marginVertical: 10,
            position: 'relative',
          }}
        >
          <Video
            ref={videoRef}
            isLooping
            shouldPlay={false}
            resizeMode="cover"
            usePoster
            posterSource={
              item.poster
                ? { uri: item.poster }
                : require('assets/images/banner/placeholder-image.png')
            }
            posterStyle={{ height: '100%', width: '100%', resizeMode: 'cover' }}
            style={{ flex: 1 }}
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
                <IconCHeart {...evaProps} active={isLiked} />
              )}
              textContent={item.likes}
              direction="row"
              status={isLiked ? 'danger' : 'basic'}
              height={24}
              width={24}
              onPress={toggleLike}
            />
            <InteractIcon
              style={{ marginHorizontal: 5 }}
              Accessory={IconCChat}
              textContent={item.comments}
              direction="row"
              status="basic"
              height={24}
              width={24}
            />
            <InteractIcon
              style={{ marginHorizontal: 5 }}
              Accessory={(evaProps) => <IconCShare {...evaProps} />}
              direction="row"
              status="basic"
              height={24}
              width={24}
            />
          </View>
          <View style={{ paddingRight: 10 }}>
            <Moment
              fromNow
              element={(momentProps) => (
                <Text category="c1" {...momentProps} style={{ fontSize: 10 }} />
              )}
            >
              {item.dateAdded}
            </Moment>
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
              The love of woozeee is the beginning of wisdom, if you believe say
              I.
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
      <RBSheet
        ref={sheetRef}
        height={280}
        closeOnDragDown
        animationType="fade"
        customStyles={{
          container: {
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: BG_THEME,
          },
        }}
      >
        <Layout
          level="5"
          style={{
            flex: 1,
            width: '100%',
            alignItems: 'flex-start',
            justifyContent: 'flex-end',
            paddingBottom: 30,
          }}
        >
          <Button
            appearance="ghost"
            status="basic"
            style={{
              width: '100%',
              justifyContent: 'flex-start',
            }}
          >
            <Text style={{ fontSize: 18 }} status="basic">
              Report...
            </Text>
          </Button>
          <Divider style={{ marginVertical: 2, width: '100%' }} />
          <Button
            appearance="ghost"
            status="basic"
            style={{
              width: '100%',
              justifyContent: 'flex-start',
            }}
          >
            <Text style={{ fontSize: 18 }} status="basic">
              Turn on post notifications
            </Text>
          </Button>
          <Divider style={{ marginVertical: 2, width: '100%' }} />
          <Button
            appearance="ghost"
            status="basic"
            style={{
              width: '100%',
              justifyContent: 'flex-start',
            }}
          >
            <Text style={{ fontSize: 18 }} status="basic">
              Copy link
            </Text>
          </Button>
          <Divider style={{ marginVertical: 2, width: '100%' }} />
          <Button
            appearance="ghost"
            status="basic"
            style={{
              width: '100%',
              justifyContent: 'flex-start',
            }}
          >
            <Text style={{ fontSize: 18 }} status="basic">
              Share
            </Text>
          </Button>
        </Layout>
      </RBSheet>
    </>
  );
});

export default VideoView;
