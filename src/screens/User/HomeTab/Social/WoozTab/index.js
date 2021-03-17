// prettier-ignore
import React, {
  useState, useRef, useContext, useCallback,
} from 'react';

import {
  View,
  Animated,
  ScrollView,
  useWindowDimensions,
  Image,
  StyleSheet,
} from 'react-native';

import { useInfiniteQuery } from 'react-query';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useFocusEffect } from '@react-navigation/native';

import Constants from 'expo-constants';

import { Video } from 'expo-av';

import { Layout } from '@ui-kitten/components';

import { LocaleContext } from 'src/contexts';

import useModifiedAndroidBackAction from 'src/hooks/useModifiedAndroidBackAction';

import VideoFullscreen from 'src/components/VideoFullscreen';

import FetchFailed from 'src/components/DataFetch/FetchFailed';

import Placeholders from 'src/components/Placeholders';

import InteractIcon from 'src/components/InteractIcon';

import { IconCMovie, IconCMedal } from 'src/components/CustomIcons';

import Api from 'src/api';

import { socialUrl } from 'src/api/dummy';

export default function Wooz({ navigation }) {
  useModifiedAndroidBackAction(navigation, 'SocialRoute');

  const { width, height } = useWindowDimensions();

  const { bottom, top } = useSafeAreaInsets();

  // check for some odd devices like mine
  const spacing = top % 1 === 0 ? bottom + top : 0;

  // if (Constants.platform.ios) {
  //   spacing = bottom + top;
  // }

  const VIEW_HEIGHT = height - (57 + spacing);

  const t = useContext(LocaleContext);

  const routeMovies = () => navigation.navigate('Movies');

  const WoozPostsArea = () => {
    const [index, setIndex] = useState(0);

    const videoRef = useRef(null);

    const videoFullRef = useRef(null);

    const isMounted = useRef(false);

    const opacity = useRef(new Animated.Value(0.5)).current;

    const videoLength = useRef(0);

    const onMomentumScrollEnd = ({ nativeEvent }) => {
      const newIndex = Math.ceil(nativeEvent.contentOffset.y / VIEW_HEIGHT);

      if (
        // prettier-ignore
        newIndex !== index
        && newIndex < videoLength.current
        && newIndex >= 0
      ) {
        opacity.setValue(0);
        setIndex(newIndex);
        videoFullRef.current.resetPlayState(true);
      }
    };

    useFocusEffect(
      useCallback(() => {
        isMounted.current = true;

        if (isMounted.current && videoRef) {
          (async () => {
            try {
              const status = await videoRef.current.getStatusAsync();

              if (status.isLoaded) {
                await videoRef.current.playAsync();
                videoFullRef.current.resetPlayState(true);
              }
            } catch (e) {
              const msg = e;
            }
          })();
        }

        return () => {
          isMounted.current = false;

          if (videoRef) {
            (async () => {
              try {
                const status = await videoRef.current.getStatusAsync();

                if (status.isLoaded) {
                  await videoRef.current.stopAsync();
                  videoFullRef.current.resetPlayState(false);
                }
              } catch (e) {
                const msg = e;
              }
            })();
          }
        };
      }, [videoRef]),
    );

    const {
      status,
      data,
      error,
      isFetching,
      isFetchingNextPage,
      isFetchingPreviousPage,
      fetchNextPage,
      fetchPreviousPage,
      refetch,
      hasNextPage,
      hasPreviousPage,
    } = useInfiniteQuery(
      ['inFiniteWoozVideos', 1],
      async ({ pageParam = 1 }) => {
        const promise = await Api.getVideos(socialUrl, 1, pageParam);
        promise.cancel = () => Api.cancelRequest('Request aborted');
        return promise;
      },
      {
        getPreviousPageParam: (firstPage) => firstPage.previousID ?? false,
        getNextPageParam: (lastPage) => lastPage.nextID ?? false,
        keepPreviousData: true,
        cacheTime: 1000 * 60 * 1,
      },
    );

    if (status === 'loading') {
      return (
        <Placeholders
          mediaLeft={false}
          count={1}
          numColumns={1}
          maxHeight={height * 0.75}
          maxWidth={width}
        />
      );
    }
    if (status === 'error') {
      return (
        <FetchFailed
          onPress={refetch}
          info={t('networkError')}
          retry={t('retry')}
        />
      );
    }
    if (
      // prettier-ignore
      status !== 'loading'
      && status !== 'error'
      && data.pages[0].pageData.data.length > 0
    ) {
      videoLength.current = data.pages[0].pageData.data.length;
      return data.pages.map((page) => (
        <React.Fragment key={page.nextID}>
          <View style={{ flex: 1 }}>
            <ScrollView
              style={{
                flex: 1,
                backgroundColor: 'transparent',
              }}
              pagingEnabled
              disableIntervalMomentum
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              onMomentumScrollEnd={onMomentumScrollEnd}
            >
              {page.pageData.data.map((item, i) => (
                <React.Fragment key={i.toString()}>
                  <View style={{ position: 'relative' }}>
                    <Image
                      resizeMode="contain"
                      style={{
                        height: VIEW_HEIGHT,
                        width: '100%',
                        overflow: 'hidden',
                        position: 'absolute',
                      }}
                      source={
                        item.poster
                          ? { uri: item.poster }
                          : require('assets/images/banner/placeholder-image.png')
                      }
                    />
                  </View>
                  <VideoFullscreen
                    ref={videoFullRef}
                    data={{ item, i }}
                    height={VIEW_HEIGHT}
                    videoRef={videoRef}
                  />
                </React.Fragment>
              ))}
              <Animated.View
                style={[
                  StyleSheet.absoluteFillObject,
                  { height: VIEW_HEIGHT, top: index * VIEW_HEIGHT, opacity },
                ]}
              >
                <Video
                  ref={videoRef}
                  resizeMode="contain"
                  style={[StyleSheet.absoluteFillObject, { flex: 1 }]}
                  source={{ uri: page.pageData.data[index].video }}
                  isLooping
                  shouldPlay
                  // prettier-ignore
                  onReadyForDisplay={() => Animated.timing(opacity, {
                    toValue: 1,
                    useNativeDriver: true,
                    duration: 500,
                  }).start()}
                />
              </Animated.View>
            </ScrollView>
          </View>
        </React.Fragment>
      ));
    }
    return (
      <FetchFailed
        onPress={refetch}
        info={t('noVideos')}
        retry={t('refresh')}
      />
    );
  };

  return (
    <Layout level="6" style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          backgroundColor: '#04070C',
        }}
      >
        <View
          style={{
            paddingHorizontal: 15,
            paddingVertical: 25,
            zIndex: 19,
            position: 'absolute',
            top: 0,
            right: 0,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <InteractIcon
            Accessory={IconCMovie}
            status="control"
            height={28}
            width={28}
            onPress={routeMovies}
          />
          <InteractIcon
            Accessory={IconCMedal}
            status="control"
            height={28}
            width={28}
          />
        </View>
        <WoozPostsArea />
      </View>
    </Layout>
  );
}
