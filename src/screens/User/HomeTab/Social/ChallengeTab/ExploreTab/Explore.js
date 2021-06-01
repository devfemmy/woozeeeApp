import React from 'react';
import { Text, List } from '@ui-kitten/components';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';

import { Layout } from '@ui-kitten/components';
import { LinearGradient } from 'expo-linear-gradient';

import Moment from 'react-moment';

// style={{ display: 'flex', flexDirection: 'row' }}

function Explore({ data }) {
  console.log('from explore -> ', data);
  return (
    data.subs &&
    data.subs.map((sub) => {
      return (
        <View style={{ flex: 1 }}>
          <Text
            category="c2"
            style={{ marginBottom: 5, marginLeft: 10 }}
          >{`${sub.categoryName} ${sub.totalEntries} Clip(s)`}</Text>
          <ScrollView
            style={{ flex: 1, paddingVertical: 10 }}
            alwaysBounceVertical
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            {sub.entries.map((entry) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.75}
                  style={{
                    height: 180,
                    width: 120,
                    paddingHorizontal: 3,
                    position: 'relative',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                  }}
                  // onPress={routeChallengeWooz}
                >
                  <LinearGradient
                    colors={['#043F7C', '#FF5757']}
                    style={{
                      height: 36,
                      width: 36,
                      borderRadius: 18,
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'absolute',
                      left: 10,
                      top: 5,
                    }}
                  >
                    <Image
                      source={{ uri: entry.mediaURL }}
                      defaultSource={require('../../../../../../assets/images/banner/placeholder-image.png')}
                      style={{
                        height: 32,
                        width: 32,
                        borderRadius: 16,
                        borderColor: 'white',
                      }}
                      resizeMode="cover"
                    />
                  </LinearGradient>

                  <View
                    style={{
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                      position: 'absolute',
                      bottom: 5,
                      borderBottomLeftRadius: 5,
                      borderBottomRightRadius: 5,
                      padding: 5,
                      width: '100%',
                    }}
                  >
                    <Text
                      category="c2"
                      style={{ color: 'white', marginBottom: 5 }}
                      numberOfLines={1}
                    >
                      {entry.userDisplayName}
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
                        {entry.createdAt}
                      </Moment>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      );
    })
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default Explore;

{
  /* <View style={{ flex: 1 }}>
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
              woozData.pages
                ? { uri: item.mediaURL }
                : require('assets/images/banner/placeholder-image.png')
            }
          />
        </View>
        <ChallengeVideo
          ref={videoViewRef}
          data={item}
          height={VIEW_HEIGHT}
          videoRef={videoRef}
          navigation={navigation}
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
        source={{ uri: page.pageData.data[index].mediaURL }}
        isLooping
        shouldPlay={isFocused}
        onPlaybackStatusUpdate={(playbackStatus) =>
          onPlaybackStatusUpdate(
            playbackStatus,
            page.pageData.data[index].userEntryData.entryId,
          )
        }
        onReadyForDisplay={() =>
          Animated.timing(opacity, {
            toValue: 1,
            useNativeDriver: true,
            duration: 500,
          }).start()
        }
      />
    </Animated.View>
  </ScrollView>
</View>; */
}
